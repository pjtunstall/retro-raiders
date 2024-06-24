"use strict";

const fps = 60;
const frameDuration = 1000 / fps;

const containerWidth = 1600;
const containerHeight = 770;

const playerWidth = 36;
const playerHeight = 24;
const playerTop = containerHeight - playerHeight;
let playerStep = 512;

const playerBulletHeight = 8;
const playerBulletWidth = 3;
let playerBulletSpeed = 1024;

const alienGridHeight = 5;
const alienGridWidth = 11;
const alienGridPixelHeight = 300;
const alienGridPixelWidth = 660;
const alienWidth = alienGridPixelWidth / alienGridWidth;
const alienHeight = alienGridPixelHeight / alienGridHeight;
const scale = 0.5;
const scaledHeight = scale * alienHeight;
const scaledWidth = scale * alienWidth;
const gap = 0;
const alienTopInGrid = Array(alienGridHeight);
const alienLeftInGrid = Array(alienGridHeight);
for (let i = 0; i < alienGridHeight; i++) {
  alienTopInGrid[i] = Array(alienGridWidth);
  alienLeftInGrid[i] = Array(alienGridWidth);
  for (let j = 0; j < alienGridWidth; j++) {
    alienTopInGrid[i][j] = i * alienHeight + (alienHeight - scaledHeight) / 2;
    alienLeftInGrid[i][j] = j * alienWidth + (alienWidth - scaledWidth) / 2;
  }
}
const alienAnimationIncrement = 0.03;
let endBounce = false;
let endFlit = false;
const maxAlienSpeed = 512;

const maxAlienBullets = 66;
const alienBulletHeight = 30;
const alienBulletWidth = 10;
let fades = Array.from({ length: maxAlienBullets * 2 }, () => ({
  duration: 2000,
  stage: 1,
}));

const ufoHeight = 40;
const ufoWidth = 40;

const barrierTop = containerHeight - 185;
// blockLeft[i] = blocks[i].offsetLeft + parent.offsetLeft;
// blockTop[i] = blocks[i].offsetTop + parent.offsetTop;
const blockTop = [
  585, 585, 585, 585, 633, 633, 633, 633, 681, 681, 681, 681, 585, 585, 585,
  585, 633, 633, 633, 633, 681, 681, 681, 681, 585, 585, 585, 585, 633, 633,
  633, 633, 681, 681, 681, 681, 585, 585, 585, 585, 633, 633, 633, 633, 681,
  681, 681, 681,
];
const blockLeft = [
  224, 272, 320, 368, 224, 272, 320, 368, 224, 272, 320, 368, 544, 592, 640,
  688, 544, 592, 640, 688, 544, 592, 640, 688, 864, 912, 960, 1008, 864, 912,
  960, 1008, 864, 912, 960, 1008, 1184, 1232, 1280, 1328, 1184, 1232, 1280,
  1328, 1184, 1232, 1280, 1328,
];

let backgroundColor = [0, 0, 0];

self.onmessage = function (event) {
  if (event.data.resetInProgress) {
    return;
  }
  if (event.data.fadeOption) {
    let brightest = 1;
    let fadesCount = fades.length;
    for (let i = 0; i < fades.length; i++) {
      if (fades[i].stage < 1) {
        fades[i].stage +=
          (frameDuration * event.data.ticks) / fades[i].duration;
        if (fades[i].stage < brightest) {
          brightest = fades[i].stage;
        }
      } else {
        fades[i].stage = 1;
        fadesCount--;
      }
    }
    if (fadesCount === 0) {
      event.data.quake = false;
    }
    event.data.underlayOpacity = 1 - brightest;
  }

  if (event.data.ufo.getPlayer) {
    return;
  }

  event.data.barriers.blocksToChange = [];
  event.data.player.bullet.removeMeMessageFromWorker = false;
  event.data.ufo.kill = false;
  event.data.aliens.toRemove = null;

  // Move player.
  event.data.player.left +=
    (event.data.player.direction *
      playerStep *
      frameDuration *
      event.data.ticks) /
    1000;
  event.data.player.left = Math.max(
    0,
    Math.min(containerWidth - playerWidth, event.data.player.left)
  );

  // Move player bullet.
  if (event.data.player.bullet.isOnScreen) {
    const boost = event.data.powerup ? 2 : 1;
    event.data.player.bullet.top -=
      (boost * playerBulletSpeed * frameDuration * event.data.ticks) / 1000;
  } else {
    event.data.player.bullet.top = playerTop - playerBulletHeight;
  }

  // Move aliens and check if they've reached the sides or bottom.
  if (event.data.aliens.remaining > 0) {
    event.data.aliens.left +=
      (event.data.aliens.direction *
        event.data.aliens.step *
        frameDuration *
        event.data.ticks) /
      1000;
    const howLowCanYouGo =
      event.data.aliens.top + event.data.aliens.groundSensor;
    if (
      !event.data.endBounce &&
      event.data.level % 10 > 4 &&
      event.data.level % 10 < 8
    ) {
      const bob =
        0.001 *
        (((event.data.level - 1) % 10) - 3) *
        (Math.floor(Date.now() % 1000) - 500 + event.data.level);
      event.data.aliens.top +=
        (bob * event.data.aliens.step * frameDuration * event.data.ticks) /
        1000;
      if (event.data.aliens.top < 0) {
        event.data.aliens.top = 0;
      }
      // Don't let the aliens bounce too low.
      if (howLowCanYouGo > containerHeight - 60) {
        event.data.aliens.top =
          howLowCanYouGo - event.data.aliens.groundSensor - 60;
        if (
          event.data.level < 7 ||
          Date.now() - event.data.levelStartTime > 60000
        ) {
          event.data.endBounce = true;
        }
      }
    }
    if (
      !event.data.endFlit &&
      (event.data.level % 10 > 7 || event.data.level % 10 === 0)
    ) {
      event.data.aliens.top +=
        (event.data.level *
          (Math.random() - 0.496) *
          event.data.aliens.step *
          frameDuration *
          event.data.ticks) /
        1000;
      if (event.data.aliens.top < 0) {
        event.data.aliens.top = 0;
      }
      // Till 2 minutes of level have passed, don't let the aliens reach the ground
      // on a random dip on levels where they flit about at random.
      if (howLowCanYouGo > containerHeight - 60) {
        event.data.aliens.top =
          howLowCanYouGo - event.data.aliens.groundSensor - 60;
        if (Date.now() - event.data.levelStartTime > 120000) {
          event.data.endFlit = true;
        }
      }
    }
    if (event.data.aliens.left + event.data.aliens.insetLeft < 0) {
      event.data.aliens.left = -event.data.aliens.insetLeft;
      event.data.aliens.direction = 1;
      if (howLowCanYouGo < containerHeight) {
        event.data.aliens.top += 20;
        if (event.data.aliens.step < maxAlienSpeed) {
          // event.data.aliens.step = event.data.aliens.top + 100;
        }
      } else {
        event.data.player.dead = true;
      }
    }
    if (
      event.data.aliens.left +
        alienGridPixelWidth +
        (alienGridWidth - 1) * gap -
        event.data.aliens.insetRight >
      containerWidth
    ) {
      event.data.aliens.left =
        containerWidth -
        alienGridPixelWidth -
        (alienGridWidth - 1) * gap +
        event.data.aliens.insetRight;
      event.data.aliens.direction = -1;
      if (howLowCanYouGo < containerHeight) {
        event.data.aliens.top += 20;
        if (event.data.aliens.step < maxAlienSpeed) {
          // event.data.aliens.step = event.data.aliens.top + 100;
        }
      } else {
        event.data.player.dead = true;
      }
    }
  }

  if (
    event.data.player.bullet.isOnScreen &&
    !event.data.player.bullet.removeMeMessageToWorker &&
    !event.data.aliens.beingRemoved
  ) {
    alienIsHit: for (let row = 0; row < alienGridHeight; row++) {
      for (let col = 0; col < alienGridWidth; col++) {
        if (event.data.aliens.alive[row][col]) {
          if (
            event.data.player.bullet.top <=
              event.data.aliens.top + alienTopInGrid[row][col] + scaledHeight &&
            event.data.player.bullet.top + playerBulletHeight >=
              event.data.aliens.top + alienTopInGrid[row][col] &&
            event.data.player.bullet.left >=
              event.data.aliens.left + alienLeftInGrid[row][col] + gap * col &&
            event.data.player.bullet.left <=
              event.data.aliens.left +
                alienLeftInGrid[row][col] +
                scaledWidth +
                gap * col
          ) {
            event.data.player.bullet.removeMeMessageFromWorker = true;
            event.data.aliens.alive[row][col] = false;
            if (event.data.level % 10 < 6 || event.data.level > 7) {
              event.data.aliens.step += 10;
            } else {
              event.data.aliens.step += 7;
            }
            event.data.aliens.remaining--;
            let isLastOne = false;
            if (event.data.aliens.remaining < 1) {
              isLastOne = true;
            }
            if (row === event.data.aliens.lowestInColumn[col]) {
              for (let i = row; i >= 0; i--) {
                if (event.data.aliens.alive[i][col]) {
                  break;
                }
                event.data.aliens.lowestInColumn[col]--;
              }
            }
            if (event.data.aliens.animationDuration > 0.3) {
              event.data.aliens.animationDuration -= alienAnimationIncrement;
              event.data.aliens.danceFaster = true;
            }
            if (
              col === event.data.aliens.leftCol &&
              event.data.aliens.alive.every((row) => !row[col])
            ) {
              event.data.aliens.leftCol++;
              while (
                event.data.aliens.leftCol < event.data.aliens.rightCol &&
                event.data.aliens.alive.every(
                  (row) => !row[event.data.aliens.leftCol]
                )
              ) {
                event.data.aliens.leftCol++;
              }
              event.data.aliens.insetLeft =
                (alienWidth + gap) * event.data.aliens.leftCol;
            }
            if (
              col === event.data.aliens.rightCol &&
              event.data.aliens.alive.every((row) => !row[col])
            ) {
              event.data.aliens.rightCol--;
              while (
                event.data.aliens.rightCol > event.data.aliens.leftCol &&
                event.data.aliens.alive.every(
                  (row) => !row[event.data.aliens.rightCol]
                )
              ) {
                event.data.aliens.rightCol--;
              }
              event.data.aliens.insetRight =
                (alienWidth + gap) *
                (alienGridWidth - 1 - event.data.aliens.rightCol);
            }
            if (
              row === event.data.aliens.bottomRow &&
              event.data.aliens.alive[row].every((colValue) => !colValue)
            ) {
              event.data.aliens.bottomRow--;
              event.data.aliens.groundSensor -= alienHeight;
              while (
                event.data.aliens.bottomRow > 0 &&
                event.data.aliens.alive[event.data.aliens.bottomRow].every(
                  (colValue) => !colValue
                )
              ) {
                event.data.aliens.bottomRow--;
                event.data.aliens.groundSensor -= alienHeight;
              }
            }
            event.data.aliens.toRemove = {
              row: row,
              col: col,
              isLastOne: isLastOne,
            };
            break alienIsHit;
          }
        }
      }
    }
  }

  // Collisions between player bullet and UFO.
  if (event.data.ufo.active) {
    if (event.data.player.bullet.isOnScreen) {
      if (
        event.data.player.bullet.top <= event.data.ufo.top + ufoHeight &&
        event.data.player.bullet.left + playerBulletWidth >=
          event.data.ufo.left &&
        event.data.player.bullet.left <= event.data.ufo.left + ufoWidth
      ) {
        // Not necessary to remove player bullet explicitly, because it reaches top of screen
        // fast enough to be removed anyway immediately after hitting the ufo.
        event.data.ufo.kill = true;
      }
    }
  }

  // Collisions between player bullet and barriers or top of container.
  if (
    event.data.player.bullet.isOnScreen &&
    !event.data.player.bullet.removeMeMessageToWorker
  ) {
    if (event.data.player.bullet.top < 0) {
      event.data.player.bullet.removeMeMessageFromWorker = true;
    }
    for (let i = 0; i < 48; i++) {
      if (
        event.data.player.bullet.top <= blockTop[i] + 48 &&
        event.data.player.bullet.top + playerBulletHeight >= blockTop[i] &&
        event.data.player.bullet.left + playerBulletWidth >= blockLeft[i] &&
        event.data.player.bullet.left <= blockLeft[i] + 48 &&
        event.data.barriers.blockVis[i] === true
      ) {
        event.data.player.bullet.removeMeMessageFromWorker = true;
        const barrierNumber = Math.floor(i / 12);
        const h = i % 12;
        const rowNumber = Math.floor(h / 4);
        const colNumber = h % 4;
        event.data.barriers.damage[barrierNumber][rowNumber][colNumber]++;
        let removeMe = false;
        if (
          event.data.barriers.damage[barrierNumber][rowNumber][colNumber] > 3
        ) {
          removeMe = true;
        }
        event.data.barriers.blocksToChange.push({
          rowNumber: rowNumber,
          colNumber: colNumber,
          barrierNumber: barrierNumber,
          removeMe: removeMe,
          destroyer: "player",
        });
        break;
      }
    }
  }

  // Alien bullet movement and collisions with player, barriers, or ground.
  for (const bullet of event.data.aliens.bullets) {
    if (event.data.ufo.getPlayer) {
      break;
    }
    if (bullet.removeMe) {
      continue;
    }

    bullet.top += (bullet.speed * frameDuration * event.data.ticks) / 1000;

    if (
      bullet.type === "fireball" &&
      bullet.top + 64 >= playerTop &&
      bullet.left + 16 >= event.data.player.left &&
      bullet.left <= event.data.player.left + playerWidth
    ) {
      event.data.player.hitByFireball = true;
      bullet.removeMe = true;
      break;
    }
    if (
      bullet.top + alienBulletHeight >= playerTop &&
      bullet.left + alienBulletWidth >= event.data.player.left &&
      bullet.left <= event.data.player.left + playerWidth
    ) {
      if (!(event.data.powerup && event.data.ufoColor === "blue")) {
        // i.e. if player is not invincible due to shield powerup
        event.data.player.hitByBullet = true;
      }
      bullet.removeMe = true;
      continue;
    }

    if (bullet.top + alienBulletHeight > barrierTop) {
      for (let i = 0; i < 48; i++) {
        if (
          bullet.top + alienBulletHeight >= blockTop[i] &&
          bullet.left + alienBulletWidth >= blockLeft[i] &&
          bullet.left <= blockLeft[i] + 48 &&
          event.data.barriers.blockVis[i] === true
        ) {
          const barrierNumber = Math.floor(i / 12);
          const h = i % 12;
          const rowNumber = Math.floor(h / 4);
          const colNumber = h % 4;
          event.data.barriers.damage[barrierNumber][rowNumber][colNumber]++;
          let removeMe = false;
          if (
            event.data.barriers.damage[barrierNumber][rowNumber][colNumber] > 3
          ) {
            removeMe = true;
          }
          event.data.barriers.blocksToChange.push({
            rowNumber: rowNumber,
            colNumber: colNumber,
            barrierNumber: barrierNumber,
            removeMe: removeMe,
            destroyer: bullet.type,
          });
          if (bullet.type !== "fireball") {
            bullet.removeMe = true;
            break;
          }
        }
      }
    }

    if (bullet.top + alienBulletHeight > containerHeight) {
      bullet.removeMe = true;
      bullet.groundHit = true;
      if (event.data.fadeOption) {
        let duration;
        let stage;
        if (bullet.type === "fireball") {
          duration = 2000 + 3000 * bullet.r;
          stage = 0;
        } else {
          duration = 2024 * bullet.r;
          stage = bullet.r;
        }
        let i = 0;
        while (fades[i].stage < 1) {
          i++;
        }
        if (i <= fades.length) {
          fades[i].stage = stage;
          fades[i].duration = duration;
          event.data.quake = true;
        }
      }
    }
  }

  self.postMessage(event.data);
};

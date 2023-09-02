"use strict";

const containerWidth = 1600;
const containerHeight = 770;

const playerWidth = 33;
const playerHeight = 33;
const playerTop = containerHeight - playerHeight;
let playerStep = 0;

const playerBulletHeight = 12;
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
  const data = event.data;
  if (data.resetInProgress) {
    return;
  }
  self.postMessage(update(data));
};

function update(data) {
  data.barriers.blocksToChange = [];
  data.player.bullet.removeMeMessageFromWorker = false;
  data.ufo.kill = false;
  data.aliens.toRemove = null;

  if (data.fadeOption) {
    let brightest = 1;
    let fadesCount = fades.length;
    for (let i = 0; i < fades.length; i++) {
      if (fades[i].stage < 1) {
        fades[i].stage += data.frameDuration / fades[i].duration;
        if (fades[i].stage < brightest) {
          brightest = fades[i].stage;
        }
      } else {
        fades[i].stage = 1;
        fadesCount--;
      }
    }
    if (fadesCount === 0) {
      data.quake = false;
    }
    for (let i = 0; i < 3; i++) {
      data.backgroundColor[i] = 255 * (1 - brightest);
    }
  }

  // Apply player acceleration.
  if (data.player.direction !== 0 && playerStep < 512) {
    playerStep += 16;
  }
  if (data.player.direction === 0) {
    playerStep /= 2;
  }

  // Move player.
  data.player.left +=
    (data.player.direction * playerStep * data.frameDuration) / 1000;
  data.player.left = Math.max(
    0,
    Math.min(containerWidth - playerWidth, data.player.left)
  );

  // Move player bullet.
  if (data.player.bullet.isOnScreen) {
    const boost = Date.now() - data.player.bullet.boostStart < 10000 ? 2 : 1;
    data.player.bullet.top -=
      (boost * playerBulletSpeed * data.frameDuration) / 1000;
  } else {
    data.player.bullet.top = playerTop - playerBulletHeight;
  }

  // Move aliens and check if they've reached the sides or bottom.
  if (data.aliens.remaining > 0) {
    data.aliens.left +=
      (data.aliens.direction * data.aliens.step * data.frameDuration) / 1000;
    const howLowCanYouGo = data.aliens.top + data.aliens.groundSensor;
    if (!data.endBounce && data.level % 10 > 4 && data.level % 10 < 8) {
      const bob =
        0.001 *
        (((data.level - 1) % 10) - 3) *
        (Math.floor(Date.now() % 1000) - 500 + data.level);
      data.aliens.top += (bob * data.aliens.step * data.frameDuration) / 1000;
      if (data.aliens.top < 0) {
        data.aliens.top = 0;
      }
      // Don't let the aliens bounce too low.
      if (howLowCanYouGo > containerHeight - 60) {
        data.aliens.top = howLowCanYouGo - data.aliens.groundSensor - 60;
        if (data.level < 7 || Date.now() - data.levelStartTime > 60000) {
          data.endBounce = true;
        }
      }
    }
    if (!data.endFlit && (data.level % 10 > 7 || data.level % 10 === 0)) {
      data.aliens.top +=
        (data.level *
          (Math.random() - 0.496) *
          data.aliens.step *
          data.frameDuration) /
        1000;
      if (data.aliens.top < 0) {
        data.aliens.top = 0;
      }
      // Till 2 minutes of level have passed, don't let the aliens reach the ground
      // on a random dip on levels where they flit about at random.
      if (howLowCanYouGo > containerHeight - 60) {
        data.aliens.top = howLowCanYouGo - data.aliens.groundSensor - 60;
        if (Date.now() - data.levelStartTime > 120000) {
          data.endFlit = true;
        }
      }
    }
    if (data.aliens.left + data.aliens.insetLeft < 0) {
      data.aliens.left = -data.aliens.insetLeft;
      data.aliens.direction = 1;
      if (howLowCanYouGo < containerHeight) {
        data.aliens.top += 20;
        if (data.aliens.step < maxAlienSpeed) {
          // data.aliens.step = data.aliens.top + 100;
        }
      } else {
        data.player.dead = true;
      }
    }
    if (
      data.aliens.left +
        alienGridPixelWidth +
        (alienGridWidth - 1) * gap -
        data.aliens.insetRight >
      containerWidth
    ) {
      data.aliens.left =
        containerWidth -
        alienGridPixelWidth -
        (alienGridWidth - 1) * gap +
        data.aliens.insetRight;
      data.aliens.direction = -1;
      if (howLowCanYouGo < containerHeight) {
        data.aliens.top += 20;
        if (data.aliens.step < maxAlienSpeed) {
          // data.aliens.step = data.aliens.top + 100;
        }
      } else {
        data.player.dead = true;
      }
    }
  }

  if (
    data.player.bullet.isOnScreen &&
    !data.player.bullet.removeMeMessageToWorker
  ) {
    alienIsHit: for (let row = 0; row < alienGridHeight; row++) {
      for (let col = 0; col < alienGridWidth; col++) {
        if (data.aliens.alive[row][col]) {
          if (
            data.player.bullet.top <=
              data.aliens.top + alienTopInGrid[row][col] + scaledHeight &&
            data.player.bullet.top + playerBulletHeight >=
              data.aliens.top + alienTopInGrid[row][col] &&
            data.player.bullet.left >=
              data.aliens.left + alienLeftInGrid[row][col] + gap * col &&
            data.player.bullet.left <=
              data.aliens.left +
                alienLeftInGrid[row][col] +
                scaledWidth +
                gap * col
          ) {
            for (const alienToRemove of data.aliens.beingRemoved) {
              if (alienToRemove.row === row && alienToRemove.col === col) {
                continue alienIsHit;
              }
            }
            data.player.bullet.removeMeMessageFromWorker = true;
            data.aliens.alive[row][col] = false;
            if (data.level % 10 < 6 || data.level > 7) {
              data.aliens.step += 10;
            } else {
              data.aliens.step += 7;
            }
            data.aliens.remaining--;
            let isLastOne = false;
            if (data.aliens.remaining < 1) {
              isLastOne = true;
            }
            if (row === data.aliens.lowestInColumn[col]) {
              for (let i = row; i >= 0; i--) {
                if (data.aliens.alive[i][col]) {
                  break;
                }
                data.aliens.lowestInColumn[col]--;
              }
            }
            if (data.aliens.animationDuration > 0.3) {
              data.aliens.animationDuration -= alienAnimationIncrement;
              data.aliens.danceFaster = true;
            }
            if (
              col === data.aliens.leftCol &&
              data.aliens.alive.every((row) => !row[col])
            ) {
              data.aliens.leftCol++;
              while (
                data.aliens.leftCol < data.aliens.rightCol &&
                data.aliens.alive.every((row) => !row[data.aliens.leftCol])
              ) {
                data.aliens.leftCol++;
              }
              data.aliens.insetLeft = (alienWidth + gap) * data.aliens.leftCol;
            }
            if (
              col === data.aliens.rightCol &&
              data.aliens.alive.every((row) => !row[col])
            ) {
              data.aliens.rightCol--;
              while (
                data.aliens.rightCol > data.aliens.leftCol &&
                data.aliens.alive.every((row) => !row[data.aliens.rightCol])
              ) {
                data.aliens.rightCol--;
              }
              data.aliens.insetRight =
                (alienWidth + gap) *
                (alienGridWidth - 1 - data.aliens.rightCol);
            }
            if (
              row === data.aliens.bottomRow &&
              data.aliens.alive[row].every((colValue) => !colValue)
            ) {
              data.aliens.bottomRow--;
              data.aliens.groundSensor -= alienHeight;
              while (
                data.aliens.bottomRow > 0 &&
                data.aliens.alive[data.aliens.bottomRow].every(
                  (colValue) => !colValue
                )
              ) {
                data.aliens.bottomRow--;
                data.aliens.groundSensor -= alienHeight;
              }
            }
            data.aliens.toRemove = {
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
  if (data.ufo.active) {
    if (data.player.bullet.isOnScreen) {
      if (
        data.player.bullet.top <= data.ufo.top + ufoHeight &&
        data.player.bullet.left + playerBulletWidth >= data.ufo.left &&
        data.player.bullet.left <= data.ufo.left + ufoWidth
      ) {
        // Not necessary to remove player bullet explicitly, because it reaches top of screen
        // fast enough to be removed anyway immediately after hitting the ufo.
        data.ufo.kill = true;
      }
    }
  }

  // Collisions between player bullet and barriers or top of container.
  if (
    data.player.bullet.isOnScreen &&
    !data.player.bullet.removeMeMessageToWorker
  ) {
    if (data.player.bullet.top < 0) {
      data.player.bullet.removeMeMessageFromWorker = true;
    }
    for (let i = 0; i < 48; i++) {
      if (
        data.player.bullet.top <= blockTop[i] + 48 &&
        data.player.bullet.top + playerBulletHeight >= blockTop[i] &&
        data.player.bullet.left + playerBulletWidth >= blockLeft[i] &&
        data.player.bullet.left <= blockLeft[i] + 48 &&
        data.barriers.blockVis[i] === true
      ) {
        data.player.bullet.removeMeMessageFromWorker = true;
        const barrierNumber = Math.floor(i / 12);
        const h = i % 12;
        const rowNumber = Math.floor(h / 4);
        const colNumber = h % 4;
        data.barriers.damage[barrierNumber][rowNumber][colNumber]++;
        let removeMe = false;
        if (data.barriers.damage[barrierNumber][rowNumber][colNumber] > 3) {
          removeMe = true;
        }
        data.barriers.blocksToChange.push({
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
  for (const bullet of data.aliens.bullets) {
    if (data.ufo.getPlayer) {
      break;
    }
    if (bullet.removeMe) {
      continue;
    }

    bullet.top += (bullet.speed * data.frameDuration) / 1000;

    if (
      bullet.type === "fireball" &&
      bullet.top + 64 >= playerTop &&
      bullet.left + 16 >= data.player.left &&
      bullet.left <= data.player.left + playerWidth
    ) {
      data.player.hitByFireball = true;
      bullet.removeMe = true;
      break;
    }
    if (
      bullet.top + alienBulletHeight >= playerTop &&
      bullet.left + alienBulletWidth >= data.player.left &&
      bullet.left <= data.player.left + playerWidth
    ) {
      // Cheat mode:
      // Comment out this line to be invulnerable to alien bullets for testing.
      data.player.hitByBullet = true;
      bullet.removeMe = true;
      continue;
    }

    if (bullet.top + alienBulletHeight > barrierTop) {
      for (let i = 0; i < 48; i++) {
        if (
          bullet.top + alienBulletHeight >= blockTop[i] &&
          bullet.left + alienBulletWidth >= blockLeft[i] &&
          bullet.left <= blockLeft[i] + 48 &&
          data.barriers.blockVis[i] === true
        ) {
          const barrierNumber = Math.floor(i / 12);
          const h = i % 12;
          const rowNumber = Math.floor(h / 4);
          const colNumber = h % 4;
          data.barriers.damage[barrierNumber][rowNumber][colNumber]++;
          let removeMe = false;
          if (data.barriers.damage[barrierNumber][rowNumber][colNumber] > 3) {
            removeMe = true;
          }
          data.barriers.blocksToChange.push({
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
      if (data.fadeOption) {
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
          data.quake = true;
        }
      }
    }
  }

  return data;
}

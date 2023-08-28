'use strict';

const playerWidth = 33;
const playerBulletHeight = 12;
const playerBulletWidth = 3;
const containerWidth = 1600;
const containerHeight = 770;
const alienGridWidth = 11;
const alienGridPixelWidth = 600;
const gap = 0;
const maxAlienSpeed = 512;
const alienBulletHeight = 30;
const alienBulletWidth = 10;
const barrierTop = containerHeight - 185;

self.onmessage = function(event) {
  const data = event.data;
  if (data.resetInProgress) {
    return;
  }
  self.postMessage(update(data));
}

function update(data) {
  data.barriers.blocksToChange = [];
  data.player.bullet.removeMeMessage = false;

  data.player.left += data.player.direction * data.player.step * data.frameDuration / 1000;
  data.player.left = Math.max(0, Math.min(containerWidth - playerWidth, data.player.left));
//   if (data.player.bullet.isOnScreen) {
//     data.player.bullet.top -= data.player.bullet.speedY * data.frameDuration / 1000;
//   }

  // Move aliens and check if they've reached the sides or bottom.
  if (data.aliens.remaining > 0) {
    data.aliens.left += data.aliens.direction * data.aliens.step * data.frameDuration / 1000;
  const howLowCanYouGo = data.aliens.top + data.aliens.groundSensor;
  if (!data.endBounce &&
    (data.level % 10 > 4 && data.level % 10 < 8)) {
    const bob = 0.001 * ((data.level - 1) % 10 - 3) * (Math.floor(Date.now() % 1000) - 500 + data.level);
    data.aliens.top += bob * data.aliens.step * data.frameDuration / 1000;
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
    data.aliens.top += data.level * (Math.random() - 0.496) * data.aliens.step * data.frameDuration / 1000;
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
    data.aliens.left = 0 - data.aliens.insetLeft;
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
  if (data.aliens.left + alienGridPixelWidth + (alienGridWidth - 1) * gap - data.aliens.insetRight > containerWidth) {
    data.aliens.left = containerWidth - alienGridPixelWidth - (alienGridWidth - 1) * gap + data.aliens.insetRight;
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

  // Collisions between player bullet and barriers.
  if (data.player.bullet.isOnScreen && !data.player.bullet.removeMe) {
    if (data.player.bullet.top < 0) {
      data.player.bullet.removeMeMessage = true;
    }
    for (let i = 0; i < 48; i++) {
      if (
        data.player.bullet.top <= data.barriers.blockTop[i] + 48 &&
        data.player.bullet.top + playerBulletHeight >= data.barriers.blockTop[i] &&
        data.player.bullet.left + playerBulletWidth >= data.barriers.blockLeft[i] &&
        data.player.bullet.left <= data.barriers.blockLeft[i] + 48 &&
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
        data.barriers.blocksToChange.push(
          {
            rowNumber: rowNumber,
            colNumber: colNumber,
            barrierNumber: barrierNumber,
            removeMe: removeMe,
            destroyer: "player"
          }
        );
        break;
      }
    }
  }

  // // Check for collisions between aliens bullets and barriers
  // for (const bullet of data.alienBulletsArray) {
  //   if (bullet.top + alienBulletHeight > barrierTop) {
  //     for (let i = 0; i < 48; i++) {
  //       if (
  //         bullet.top + alienBulletHeight >= blockTop[i] &&
  //         bullet.left +alienBulletWidth >= blockLeft[i] &&
  //         bullet.left <= blockLeft[i] + 48 &&
  //         data.barriers.blockVis[i] === true
  //       ) {
  //         const barrierNumber = Math.floor(i / 12);
  //         const h = i % 12;
  //         const rowNumber = Math.floor(h / 4);
  //         const colNumber = h % 4;
  //         data.barriers.damage[barrierNumber][rowNumber][colNumber]++;
  //       let removeMe = false;
  //       if (data.barriers.damage[barrierNumber][rowNumber][colNumber] > 3) {
  //         removeMe = true;
  //       }
  //         data.barriers.blocksToChange.push({
  //           rowNumber: rowNumber,
  //           colNumber: colNumber,
  //           barrierNumber: barrierNumber,
  //           removeMe: removeMe,
  //           destroyer: bullet.type
  //         });
  //         if (bullet.type !== "fireball") {
  //           bullet.removeMe = true;
  //           break;
  //         }
  //       }
  //     }
  //   }
  // }

  return data;
}

'use strict';

const playerWidth = 33;
const containerWidth = 1600;
const containerHeight = 770;
const alienGridWidth = 11;
const alienGridPixelWidth = 600;
const gap = 0;
const maxAlienSpeed = 512;

self.onmessage = function(event) {
  const data = event.data;
  if (data.resetInProgress) {
    return;
  }
  const result = update(data);
  self.postMessage(result);
}

function update(data) {
  data.player.left += data.player.direction * data.player.step * data.frameDuration / 1000;
  data.player.left = Math.max(0, Math.min(containerWidth - playerWidth, data.player.left));
//   if (data.player.bullet.isOnScreen) {
//     data.player.bullet.top -= data.player.bullet.speedY * data.frameDuration / 1000;
//   }

  // Move aliens and check if they've reached the sides or bottom.
  if (data.aliens.remaining > 0) {
    data.aliens.left += data.aliens.direction * data.aliens.step * data.frameDuration / 1000;
  const howLowCanYouGo = data.aliens.top + data.aliens.groundSensor;
  if ((data.level - 1) % 10 > 3 && ((data.level - 1) % 10 < 7) || ((data.level - 1) % 10 > 9)) {
    const bob = 0.001 * (data.level - 4) * (Math.floor(Date.now() % 1000) - 500 + data.level);
    data.aliens.top += bob * data.aliens.step * data.frameDuration / 1000;
    if (data.aliens.top < 0) {
      data.aliens.top = 0;
    }
    // This line says don't let the aliens reach the ground on the levels
    // where they bob till 3 minutes have passed.
    if (howLowCanYouGo > containerHeight - 60) {
      if (Date.now() - data.levelStartTime < 180000) {
        data.aliens.top = howLowCanYouGo - data.aliens.groundSensor - 60;
      } else {
        data.player.dead = true;
      }
    }
  }
  if ((data.level - 1) % 10 > 6) {
    data.aliens.top += data.level * (Math.random() - 0.496) * data.aliens.step * data.frameDuration / 1000;
    if (data.aliens.top < 0) {
      data.aliens.top = 0;
    }
    // This line says don't let the aliens reach the ground on the levels
    // where they jerk about at random till 3 minutes have passed.
    // (On the 10th level bob and kerk about at random.)
    if (howLowCanYouGo > containerHeight - 60) {
      if (Date.now() - data.levelStartTime < 180000) {
        data.aliens.top = howLowCanYouGo - data.aliens.groundSensor - 60;
      } else {
        data.player.dead = true;
      }
    }
  }
  if (data.aliens.left + data.aliens.insetLeft < 0) {
    data.aliens.left = 0 - data.aliens.insetLeft;
    data.aliens.direction = 1;
    if (howLowCanYouGo < containerHeight) {
      data.aliens.top += 20;
      if (data.aliens.step < maxAlienSpeed) {
        data.aliens.step = data.aliens.top + 100;
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
        data.aliens.step = data.aliens.top + 100;
      }
    } else {
        data.player.dead = true;
    }
  }
  }
  return data;
}

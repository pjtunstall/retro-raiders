# RETRO RAIDERS

1. [Caution](#1-caution)
2. [Instructions](#2-instructions)
3. [Play online](#3-play-online)
4. [Play offline](#4-play-offline)
5. [Context](#5-context)
6. [Lessons](#6-lessons)
7. [Mysteries](#7-mysteries)

## 1. Caution

If you're sensitive to flashing lights, press `F` while the game is paused to toggle off the flash effect. (The game starts in paused mode.)

## 2. Instructions

Use left and right arrow keys to move, and space to fire. You can only have one bullet on screen at a time, as in the original Space Invaders. Hold down space to keep firing.

## 3. Play online

[Retro Raiders](https://retro-raiders.netlify.app/)

Desktop only for now.

We haven't hosted the scoreboard yet, so don't take it personally when you get to the end and it says you haven't made it onto the high scores. At some point we will. Till then, just refresh the page to play again.

Works best on Chrome or Brave. Maximize the window to full-screen mode and make sure the toobar is hidden. Adjust zoom if needed.

## 4. Play offline

Open a terminal and, from the folder called `server`, execute `go run .` to launch the game server on port 8080 and the scoreboard server on port 10000. Enter `localhost:8080` in the address bar of Chrome, for example, maximize the window and enter full-screen mode (CMD+SHIFT+F). Adjust zoom if needed.

Alternatively, to make an executable file, uncomment the indicated lines in `main.go` (at the start of the `main` function) in the `server` folder, then build a Go executable according to your operating system, e.g.

`go build -o main_linux`
`GOOS=windows GOARCH=amd64 go build -o main.exe`
`GOOS=darwin GOARCH=amd64 go build -o main_mac`

Comment them back to ensure that `go run .` still works. Now you can double click on the executable file instead of typing `go run .` in a terminal.

## 5. Context

This was our first JavaScript project for 01Founders, a branch of the 01Edu education system, and our first attempt at making a browser game. I saw the project as an exploration of new ideas, focusing on speed of development and cool effects, rather than writing pretty code.

Hence, the JavaScript lives mostly in one big file, albeit divided fairly neatly into functions. I made heavy use of global variables. There's a lot I'd do differently if I was starting again from scratch.

I wrote the core game and, at some point, handed it over to my teammate Bilal who refactored it into a modular, object-oriented style, and connected it to the scoreboard that another teammate, Shane, had written in Go. Our fourth teammate, Daisy, designed the sprites.

But while Bilal was working on that, I couldn't resist the urge to continue developing my version. I introduced a spritesheet to animate the aliens more efficiently, and eventually a web worker to take care of movement and collision detection. I also fixed various bugs. So it was this less elegantly structured rendition that came to be presented as the "finished" version.

Bilal also helped with game state transitions and wrote the (SPOILER ALERT) UFO abduction cut scene, as well as attaching the story elements that I wrote. Thanks to my brother, Richard, who cultivated the AI art from Stable Diffusion.

## 6. Lessons

Some of these lessons were learnt at the start or in research as we went along. Others were learnt the hard way by getting them wrong. Some we had a chance into implement, while others will have to wait till the next game--unless, one day, time will permit more tinkering here.

Some points might not apply to all browser games. Rather they represent my current understanding of best practice for how to make a browser game using raw JS, according to the constraints of our project. There may well be other ways, just as valid.

- For performance, minimize interaction with the DOM. Reading from and writing to HTML elements tends to be costly compared to accessing JS variables, so update positions etc. using JS variables and only write to the DOM when necessary.

- Reduce layout and painting by using `transform` and `opacity` in CSS. To quote the [01edu public repo](https://github.com/01-edu/public/blob/master/subjects/good-practices/README.md):

  ```// bad
  // this will trigger the layout to recalculate everything and repaint it again
  box.style.left = `${x * 100}px`

  // good
  // this way its possible to lose the layout
  box.style.transform = `translateX(${x * 100}px)`
  ```

  They also say, "It is possible to remove painting by adding a layer."

  ```/_ this will take care of the painting by creating a layer and transform it_/
  #box {
  width: 100px;
  height: 100px;
  ....
  will-change: transform;
  }
  ```

  "By creating a new layer you can remove painting, but 'there is always a tradeoff'. If we add to much layers \[sic\] it will increase the composition and update tree. In conclusion you must promote a new layer only if you know you are going to use it."

My feeling is that `transform` probably did help our game, but `will-change` made no clear difference. I've also been told that the decision to create a layer is, utimately, up to the browser, so this is more of a suggestion than a command. Different browsers may decide differently.

- Rather than animating a sprite by alternating between separate images, use a single image (called a sprite sheet, tile set, [tile atlas](https://developer.mozilla.org/en-US/docs/Games/Techniques/Tilemaps), or [texture atlas](https://en.wikipedia.org/wiki/Texture_atlas)) and change the appearance of your sprite by adjusting its CSS `background-position` property so as to display a different portion of this image. This saves time as the browser doesn't have to keep loading new images. You can also pick out portions of a sprite sheet in different arrangements to create different shapes, such as landscapes, or, in our case, the various barrier designs and rearrangements of alien types on each level.

- Batch updates to the DOM. Before specifying changes you want to make to the DOM, turn off updates with `document.documentElement.style.display = "none";`. Then specify what you want to change. Switch rendering back on with `document.documentElement.style.display = "";`. Finally, trigger a repaint with `gameContainer.offsetHeight;` to update the DOM with all pending changes.

- The browser caches style values from the previous frame (iteration of the event loop). If you need to read style values relating to layout, do so in a batch before making any style changes that might affect the layout. If you read such a value after a layout-related change, it forces the browser to recalculate the page layout. Be especially careful not to do force lots of layout changes in quick succession. This is called [layout thrashing](https://web.dev/avoid-large-complex-layouts-and-layout-thrashing/).

- Your game loop function--let's call it `gameLoop`--will be a callback passed to `requestAnimationFrame` to launch the game. Somewhere inside `gameLoop`, call `requestAnimationFrame(gameLoop)` to keep it going recursively. (I gather it's best for timing to place this call at the start of the game loop function.) This doesn't overwhelm the call stack, because `requestAnimationFrame` clears it after each iteration. The `requestAnimationFrame` API helps coordinate your game loop with the browser's own event loop for smoother animation.

- `gameLoop` can call an `update` function to update the game state (all the purely JS stuff), then a `render` function to apply changes to the DOM.

- `gameLoop` takes one argument, `timestamp`, which will be passed to it by `requestAnimationFrame`. Before calling `update`, `gameLoop` should calculate the actual amount of time that has passed between the current timestamp and the previous one. Ideally this should not be more than one sixtieth of a second, about 16.7ms. If it takes longer, this is called a "frame drop" and can lead to glitchy-looking animation. (In spite of the name, it's my understanding that the browser doesn't just "drop" execution of the frame and move onto the next one; rather, your game loop function finishes executing, and the browser does everything it needs to do--it just takes longer.) You can use the `timestamp` parameter to make sure that the game doesn't run faster for players whose hardware allows them to have a refresh rate faster than one sixtieth of a second. You can also add some logic to adjust the speed of your game in case `gameLoop` took took too long to execute.

- Adjust the speed of updates, not of renders. (See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) etc. for details on ways to implement this.)

- To let players enjoy the advantage of better hardware for smoother animation, use interpolation to fill in intermediate stages when translating a sprite. You can either do this by hand using JavaScript. In `gameLoop`, calculate the actual time elapsed between frames as a proportion of 16.7 milliseconds:

```let alpha = (timestamp - lastTime) / frameDuration;
lastTime = timestamp;
```

Then (if the result is less than 1), in your `render` function, only position sprites this fraction of the way from their previous position to the position you want to update them to:

```let interpolatedPlayerLeft = previousPlayerLeft + alpha * (playerLeft - previousPlayerLeft);
player.style.transform = `translateX(${interpolatedPlayerLeft}px)`;
```

Or you can let the CSS transition property do this for you: `transition: transform 0.0167s linear;`, assuming you're using CSS `transform` to move them.

- Let's say a frame took twice the amount of time it should have taken. There are several ways to compensate for this. TIME WARPING: double the size of the steps by which positions are incremented. TIME COMPRESSION: perform two updates this frame to make up for the delay. You can imagine the sort of pros and cons each has. To jump or to lag, that's the question. Under conditions of extremely bad performance, time warping could lead to objects skipping through each other without colliding while time compression might execerbate the problem if all those extra updates take too long. This is known as the spiral of death. Nevertheless, either technique can keep your game running at normal speed if there is a moderate drop in performance (and consequent loss of animation quality). To test this, you can play on low battery (not good for your battery life!) or add time-consuming loops (preferable). Another technique (the one we're currently using) is called DELTA TIME. This updates positions on every frame by an amount proportional to the actual time elapsed since the previous frame. We're also restricting updates to frames that take more than 0.9 times an ideal frame of one sixtieth of a second. This is to save making a browser that's running at 120Hz do twice the work of updating as one that's running at 60Hz.

- Reuse variables if possible, especially HTML elements, rather than creating, attaching, and removing them from the DOM. For example, we switched from creating a new UFO each time one is due, to resuing a single UFO and positioning it off-screen when not visible. When aliens are destroyed, their opacity is set to 0, and back to 1 when they're restored. Not yet implemented: a pool for alien bullets. Reusing JS variables means less work for the garbage collector, which can take a significant toll on performance. But also be careful to minimize the amount of active variables, as the garbage collector needs to periodically check through them to see if any can be disposed of yet. Garbage collection happens outside of your control, at the browser's discretion. This makes for unpredictable delays that can lead to frame drops.

- Log details about frame drops so that you can compare performance before and after implementing ideas that you hope will improve it.

- Learn about the browser's event loop. This is especially important if you're using async functions or web workers. Async functions such as `setTimeout` pass their callback function to Web APIs which can work in the background, concurrently with your JS code, listening for events, such as the end of the timeout interval. When the event occurs, your callback function is placed on the task queue. Callbacks of promises are placed on what's called the microtask queue, which has higher priority. When the call stack is empty, the event loop processes all microtasks in order, then the task at the front of the task queue, and so on. Likewise, the message handler you create to handle messages from a web worker is placed on the task queueu when it receives a message, and executed when its turn comes.

- Separating the update and render functions makes it easier, if you decide it's worth it, to place your update logic in one or more web workers. A web worker actually allows you to have a concurrent thread of JavaScript code. You can place time-consuming calculations in the web worker so that it doesn't block the main thread.

One big thing to know about web workers is that they don't have access to the DOM; they can't read or write properties of HTML objects, hence all rendering has to be done separarely.

Another important fact is that each web worker has its own namespace; communication between it and the main thread happens via methods called `onmessage` and `postMessage`. Any variables have to be passed to the worker in a message. This has a performance overhead too, so test performance before and after implementing, and estimate whether it's worth trying. `onmessage` takes a callback, which will be placed onto the task queue when a message is received, and executed when the call stack and microtask queue are empty. (This is where understanding the event loop comes in. Rewriting our code to use a web worker led to lots of surprising synchronization issues due to my ignorance of the event loop.)

- Have an all-purpose `init` (initializer) function. In my ramshackle way, I set up the game on first loading the page using many global variables, then later made an `init` function that refreshes the game state completely on starting a new game or partly on starting a new level, although the initial set-up on first opening loading the page is still performed by my original code. This led to unnecessary repetition and special cases. My teammate Bilal did actually introduce such a function in his refactorization, but, as described [above](#5-context), we reverted to my less elegant code because it had advanced in other ways.

- Re. global variables v. local. Best practice is usually to keep things modular and make most variables local. But, throwing good practice to the winds, and in the spirit of the CodeAesthetic video [Premature Optimization](https://www.youtube.com/watch?v=tKbV6BpH-C8), about how development speed should not necessarily be sacrificed to early optimization, I leapt into making a prototype game with a bunch of global variables. As the project expanded, I didn't go back and refactor this aspect. I found it convenient, and the project was not so huge as to make this confusing. In his version, Bilal thoroughly refactored my early efforts, encapsulating most of these variables into objects, and partitioning the code into modules. Objects are passed by reference in JS, so I think this still has some of the advantages of global variables and saves copying values when they're passed to a function, but also gives structure, readability, and keeps the global namespace tidy. That said, GitHub Copilot opines that encapsulating variables into functions, modules, or objects is "unlikely to have a significant impact on performance."

- Re. another kind of encapsulation, [closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures#performance_considerations), "each function instance manages its own scope and closure. Therefore, it is unwise to unnecessarily create functions within other functions if closures are not needed for a particular task, as it will negatively affect script performance both in terms of processing speed and memory consumption."

- A gotcha that somehow managed to catch us out repeatedly: For score-handling, don't use the Go Live server from VS Code. Since it's designed to help you as a developer, it kindly refreshes the page every time you modify your code. For us, that included adding a new entry to the high score table! Alternatively, you can append \*\*/scores.json (or whatever your scores file is called) to liveServer.settings.ignoreFiles in the VS Code settings.json. Then you can use Live Server and it won't cause the page to refresh whenever a new score is added.

- Make the game easily scalable, given that we don't have control over browser zoom settings. Browsers differ in how they scale. When we made our game container too big for 100% zoom, Chrome automatically switched to 80%, and that looks good. Firefox sticks at 100%. Manually changing the zoom to 80% spoils the appearance in Firefox, presumably due to rounding errors with how portions of the spritesheet are selected for blocks that make up the barriers. (Apparently Firefox does the calculation differently to Chrome.) In both cases, the aliens appeared fine, but, uniquely in Safari, they were messed up (completely wrong portions of the spritesheet were selected) till the window was resized and the page refreshed.

(Note: this was a rather old version of Safari. Looking back now, February 2024, the current Safari seems to find the right zoom and display the aliens correctly at that zoom, and the barriers with just the same slight offset anomaly as Firefox. Adjusting the zoom manually, however, still throws the aliens off, garbling them by selecting the wrong portions of the spritesheet, and these mutations can remain even after resetting to the correct zoom.)

Perhaps SVG would be the solution. Much of the complication comes from the choice (in one of our versions) to implement spritesheets of PNG images for different-maps and use CSS animation. At least with my current scattered understanding, CSS animation seems quirky, unpredictable, and sensitive to all sorts of changes and possible interference from other CSS. Maybe modularizing the CSS would help. I'd love to hear that there's a better practice purely using SVG and JS. Maybe the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) is the answer.

## 7. Mysteries

Three mysteries. This concerns CSS.

i. Each alien image is 60px x 60px. For some reason, we needed to specify double the number of pixels the keyhole (my term for the "window" we're looking through at the image to select which part to display) needs to be shifted horizontally. The y-coordinate works as expected; we need to specify the right number of pixels we want shift it vertically, not double. (According to [Mozilla](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale), when only one number is passed to scale, the element is scaled equally in height and width. Indeed, that's what we see in our game.)

```

.aliens-grid {
display: grid;
position: absolute;
left: 0;
right: 0;
grid-template-columns: repeat(11, 1fr);
grid-template-rows: repeat(5, 1fr);
gap: 0px;
width: 660px;
height: 300px;
z-index: 1;
}

.aliens-grid > div {
width: 60px;
height: 60px;
background-image: url('aliens.png');
transform: scale(0.5);
}

@keyframes squidAnimation {
0% {
background-position: 0 0;
}
50% {
background-position: -120px 0;
}
}

@keyframes crabAnimation {
0% {
background-position: 0 -60px;
}
50% {
background-position: -120px -60px;
}
100% {
background-position: 0 -60px;
}
}

@keyframes blobAnimation {
0% {
background-position: 0 -120px;
}
50% {
background-position: -60px -120px;
}
}

```

ii. The second mystery is that the animation for the third type of alien, the "blobs" apparently needs to follow a different logic from the animation for the others:

```

.squid {
animation: squidAnimation 1s infinite steps(2);
}

.crab {
animation: crabAnimation 1s infinite steps(2);
}

.blob {
animation: blobAnimation 0.5s infinite steps(1);
}

.squid-black {
animation: squidBlackAnimation 1s infinite steps(2);
}

.crab-black {
animation: crabBlackAnimation 1s infinite steps(2);
}

.blob-black {
animation: blobBlackAnimation 0.5s infinite steps(1);
}

```

Each alien is 60px x 60 px. Why do squid and crab require 1s and steps(2) while the blobs need 0.5s and steps(1) to move in sync?

Specifying width and height here is superfluous, more of an annotation than anything:

```

.aliens-grid > div {
width: 60px;
height: 60px;
background-image: url('aliens.png');
transform: scale(0.5);
}

```

The width and height of each cell in the grid is determined by the size of the whole grid and the number of cells in it.

Our fellow student, Peter, asked: "Do all the aliens appear at the same sort of time in the game loop? Do some appear when the game is sped up?"

My reply: "There's no difference in when the aliens appear. All types are present at the beginning and as the game speeds up."

iii. Why do the crabs need two have a 100% value specified while the other types only need 0% and 50%. Initial attempts followed the more natural procedure of making all three animations consistent. Since there are two frames, it seemed natural to only specify 0% and 50%. I saw examples online of 0%, 50%, and 100% specified, but the 100% seemed superfluous. I was able to delete it on other animations, and on most of these, but the crabs were different. On ChatGPT's suggestion, I included a 100% which apparently serves the purpose of PREVENTING a third, un-asked-for frame from being displayed.

I find it curious that the blobs were the anomaly in terms of time value and steps, but the crabs are the anomaly in terms of number of frames that need to be specified.

These values work, but we need to understand why if we're going to learn anything from it. I'd be grateful to hear from anyone who understands CSS animation or who can point me towards a resources that can explain these seeming contradictions.

The most common thing that would go wrong when we had more logical-seeming, consistent values would be that the wrong parts of the spritesheet would be chosen, so that we'd see part of one alien image together with part of another in a single frame, instead of the animation alternating between the two frames of each alien. This, and the anomaly whereby the "blobs" were animated at a different speed from all the rest of them till we had this adjustment.

```

```

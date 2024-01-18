# RETRO RAIDERS

1. [Caution](#4-caution)
2. [Instructions](#2-instructions)
3. [Play online](#1-play-online)
4. [Play offline](#3-play-offline)
5. [Context](#5-context)
6. [Lessons](#-lessons)

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

```
// bad
// this will trigger the layout to recalculate everything and repaint it again
box.style.left = `${x * 100}px`

// good
// this way its possible to lose the layout
box.style.transform = `translateX(${x * 100}px)`
```

They also say, "It is possible to remove painting by adding a layer."

```
/* this will take care of the painting by creating a layer and transform it*/
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

- Your game loop function--let's call it `gameLoop`--will be a callback passed to `requestAnimationFrame` to launch the game. Somewhere inside `gameLoop`, call `requestAnimationFrame(gameLoop)` to keep it going recursively. (I gather it's best for timing to place this call at the start of the game loop function.) This doesn't overwhelm the call stack, because `requestAnimationFrame` clears it after each iteration.

- `gameLoop` can call an `update` function to update the game state (all the purely JS stuff), then a `render` function to apply changes to the DOM.

- `gameLoop` takes one argument, `timestamp`. Before calling `update`, `gameLoop` should calculate the actual amount of time that has passed between the current timestamp and the previous one. Ideally this should not be more than one sixtieth of a second. If it takes longer, this is called a "frame drop" and can lead to glitchy-looking animation. (In spite of the name, it's my understanding that the browser doesn't just "drop" execution of the frame and move onto the next one; rather, your game loop function finishes executing, and the browser does everything it needs to do--it just takes longer.) `requestAnimationFrame` makes sure that `gameLoop` is coordinated with the browser's own event loop if your code takes less than 1/60s. By checking how long it actually took, you can add some logic to adjust the speed of your game in case `gameLoop` took took too long to execute.

- Adjust the speed of updates, not of renders. (See Google, MDN, the AIs etc. for details on ways to implement this.) The idea is to make sure the game logic runs at the same speed for everyone, even if their hardware is struggling to keep up. Let's say a frame took twice the amount of time it should have taken. There are several ways to compensate for this. Time warping: double the size of the steps by which positions are incremented. Time compression: perform two updates this frame to make up for the delay. You can imagine the sort of pros and cons each has. Under conditions of extremely bad performance, time warping could lead to objects skipping through each other without colliding while time compression might execerbate the problem if all those extra updates take too long. Nevertheless, they can keep your game running at normal speed if there is a moderate drop in performance (and consequent loss of animation quality). To test this, you can add time-consuming loops (preferable) or play on low battery (not good for your battery life!).

- Reuse variables if possible, especially HTML elements, rather than creating, attaching, and removing them from the DOM. Reusing JS variables means less work for the garbage collector, which can take a significant toll on performance. But also be careful to minimize the amount of active variables, as the garbage collector needs to periodically check through them to see if any can be disposed of yet. Garbage collection happens outside of your control, at the browser's discretion. This makes for unpredictable delays that can lead to frame drops.

- Log details about frame drops so that you can compare performance before and after implementing ideas that you hope will improve it.

- Learn about the browser's event loop. This is especially important if you're using async functions or web workers. Async functions such as `setTimeout` pass their callback function to Web APIs which can work in the background, concurrently with your JS code, listening for events, such as the end of the timeout interval. When the event occurs, your callback function is placed on the task queue. Callbacks of promises are placed on what's called the microtask queue, which has higher priority. When the call stack is empty, the event loop processes all microtasks in order, then the task at the front of the task queue, and so on. Likewise, the message handler you create to handle messages from a web worker is placed on the task queueu when it receives a message, and executed when its turn comes.

- Separating the update and render functions makes it easier, if you decide it's worth it, to place your update logic in one or more web workers. A web worker actually allows you to have a concurrent thread of JavaScript code. You can place time-consuming calculations in the web worker so that it doesn't block the main thread. One big thing to know about web workers is that they don't have access to the DOM; they can't read or write properties of HTML objects, hence all rendering has to be done separarely. Another important fact is that each web worker has its own namespace; communication between it and the main thread happens via methods called `onmessage` and `postMessage`. Any variables have to be passed to the worker in a message. This has a performance overhead too, so test performance before and after implementing, and estimate whether it's worth trying. `onmessage` takes a callback, which will be placed onto the task queue when a message is received, and executed when the call stack and microtask queue are empty. (This is where understanding the event loop comes in. Rewriting our code to use a web worker led to lots of surprising synchronization issues due to my ignorance of the event loop.)

- Have an all-purpose `init` (initializer) function. In my ramshackle way, I set up the game on first loading the page using many global variables, then later made an `init` function that refreshes the game state completely on starting a new game or partly on starting a new level, although the initial set-up on first opening loading the page is still performed by my original code. This led to unnecessary repetition and special cases. My teammate Bilal did actually introduce such a function in his refactorization, but, as described [above](#5-context), we reverted to my less elegant code because it had advanced in other ways.

- Re. global variables v. local. Best practice is usually to keep things modular and make most variables local. But, throwing good practice to the winds, and in the spirit of that video that Harry posted recently about how development speed should not necessarily be sacrificed to early optimization, I leapt into making a prototype game with a bunch of global variables. As the project expanded, I didn't go back and refactor this aspect. I found it convenient, and the project was not so huge as to make this confusing, I think. In his version, Bilal thoroughly refactored my early efforts, encapsulating most of these variables into objects, and partitioning the code into modules. Objects are passed by reference in JS, so I think this still has some of the advantages of global variables and saves copying values when they're passed to a function, but also gives structure, readability, and keeps the global namespace tidy.

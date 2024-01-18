# RETRO RAIDERS

1. [Caution](#4-caution)
2. [Instructions](#2-instructions)
3. [Play online](#1-play-online)
4. [Play offline](#3-play-offline)
5. [Context](#5-context)

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

Comment them back, to ensure that `go run .` still works. Now you can double click on the executable file instead of typing `go run .` in a terminal.

## 5. Context

This was our first JavaScript project for 01Founders, a branch of the 01Edu education system, and our first attempt at making a browser game. I saw the project as an exploration of new ideas, focusing on speed of development and cool effects, rather than writing pretty code.

Hence, the JavaScript lives mostly in one big file, albeit divided fairly neatly into functions. I made heavy use of global variables, just to get things done quickly.

That's my excuse, anyway. :\)

I wrote the core game and, at some point, handed it over to my teammate Bilal who refactored it into a modular, object-oriented style, and connected it to the scoreboard that another teammate, Shane, had written in Go, as required by the project spec. Our fourth teammate, Daisy, designed the sprites.

But while Bilal was working on that, I couldn't resist the urge to continue developing my version. I introduced a spritesheet to animate the aliens more efficiently, and eventually a web worker to take care of movement and collision detection. I also fixed various bugs. So it was this less elegantly structured rendition that came to be presented as the "finished" version.

Bilal also helped with game state transitions and wrote the (SPOILER ALERT) UFO abduction cut scene, as well as attaching the story elements that I wrote. Thanks to my brother, Richard, who summoned up the AI art from Stable Diffusion.

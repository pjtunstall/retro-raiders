# RETRO RAIDERS

1. [SET UP](#1-set-up)
2. [CAUTION](#2-caution)
3. [INSTRUCTIONS](#-instructions)
4. [EXECUTABLE](#-executable)
5. [BACKGROUND](#-background)

## 1. SET UP

Open a terminal and, from the folder called `server`, execute `go run .` to launch the game server on port 8080 and the scoreboard server on port 10000. Enter `localhost:8080` in the address bar of Chrome.

## 2. CAUTION

If you're sensitive to flashing lights, press `F` while the game is paused to toggle off the flash effect. (The game starts in paused mode.)

## 3. INSTRUCTIONS

Use left and right arow keys to move, and space to fire. You can only have one bullet on screen at a time, as in the original Space Invaders. Hold down space to keep firing.

## 4. EXECUTABLE

To make an executable file, uncomment the indicated lines in `main.go` (at the start of the `main` function) in the `server` folder, then build a Go executable according to the operating system, e.g.

`go build -o main_linux`
`GOOS=windows GOARCH=amd64 go build -o main.exe`
`GOOS=darwin GOARCH=amd64 go build -o main_mac`

Comment them back, to ensure that `go run .` still works. Now you can double click on the executable file instead of typing `go run .` in a terminal.

## 5. BACKGROUND

This was our first JavaScript project for 01Founders, a branch of the 01Edu education system, and our first attempt at making a browser game.

If we were starting from scratch, knowing what we know now, we'd do many things differently. Given more time, we'd have a more thorough refactoring stage.

Variables would be intialized at the start of the game by the same function that resets them for a new game.

We'd scale everything so that it would work well at 100% zoom in all the main browsers and on all normal screen sizes. As it is, we need to recommend Chrome because Chrome automatically adjusts to the right zoom, 80% for my screen, and selects sprites from the spritesheet with none of the artifacts that Firefox produces at 80%, perhaps due to rounding errors in calculating pixels.

We'd write more object-oriented code, which would make it easier to pass data to the web worker.

As it is, we prioritized learning new things and making something fun, rather than wrangling all of our false starts into neater code.
# Treasure Vault Mini Game

## Description

The **Treasure Vault Mini Game** is a fun and interactive mini-game where the player must unlock a vault by entering a secret combination of rotations. The game begins with the vault door closed, and a random secret combination is logged in the browser console. The player has to follow the instructions to rotate the handle in either a clockwise or counterclockwise direction, based on the generated combination.

If the player enters the combination correctly, the vault opens, revealing treasure inside. If the player makes an error, the vault handle spins wildly, and the game resets with a new secret combination.

---

## Game Mechanics

- **Secret Combination**: 
  - At the start of the game, a random combination of 3 pairs of numbers and directions is generated and logged in the console.
  - Each pair consists of a number between 1 and 9 and a direction: **clockwise** or **counterclockwise**.
  - Example: `2 clockwise, 7 counterclockwise, 5 clockwise`.
  - Each number represents a displacement of the handle by 60°. For example, `1` means 60°, `6` means a full rotation (360°).

- **Player Interaction**:
  - The player can rotate the vault handle by clicking on the left or right side of the screen.
  - Clicking on the **right** rotates the handle **clockwise**.
  - Clicking on the **left** rotates the handle **counterclockwise**.
  - Each interaction causes the handle to rotate by 60° with an animation.

- **Winning the Game**:
  - If the player enters the correct combination in the right order, the vault door opens and reveals treasure with a glittering shine effect.
  
- **Losing the Game**:
  - If the player enters an incorrect combination, the vault handle spins crazily in multiple rotations, and the game resets with a new combination.

---

## Features

- Random secret combination generation for each new game.
- Interactive vault handle that responds to player clicks and rotates with smooth animation.
- Glitter animation over the treasure when the vault is successfully unlocked.
- Resetting mechanism on incorrect attempts with a wild handle spin effect.

---

## Installation

Follow these steps to install and run the game locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/georgiyanakiev/Treasure-Vault-Mini-Game
   cd treasure-vault-mini-game

Usage
Open the game in your browser after running the development server.
Check the browser console (Ctrl + Shift + I or Cmd + Option + I for Mac) to see the randomly generated secret combination.
Use your mouse to click on the left or right side of the screen to rotate the vault handle either clockwise or counterclockwise.
Enter the combination correctly to open the vault and reveal the treasure!

Technologies Used
PIXI.js: A fast 2D rendering library for web-based interactive content.
TypeScript: A strongly typed programming language for easier and safer development.
HTML5/CSS3: Used for structuring and styling the game interface.
Future Improvements
Implement more complex treasure combinations for harder difficulty levels.
Add sound effects for handle rotation and vault opening.
Introduce multiple vault levels with varying treasure rewards.
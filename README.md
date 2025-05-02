# Reflektor

**Reflektor** is a browser-based pixel-style puzzle game inspired by mirror mechanics. Built using HTML, CSS, and JavaScript, players control a character navigating a main grid while a mirrored NPC follows on an inverted grid. The objective is to reach the goal without hitting obstacles on either side.

Game is accessible via [Github Page](https://vinnyvaleria.github.io/reflektor/game.html).

## 🎯 Project Objective

As an avid gamer myself, **Reflektor** was built as a creative puzzle game to explore mirrored grid logic and interactive game design using only HTML, CSS, and JavaScript. The aim was to create a simple, fun, and visually engaging experience that challenges players to think about spatial patterns and movement.

> To find out more about the planning process and coding approach, please scroll to the bottom 😊

## 🎮 Gameplay

-   Control your **player (P)** using arrow keys or on-screen buttons.
-   The mirrored **NPC** moves in the opposite horizontal direction.
-   Avoid obstacles like walls, trees, and grass.
-   Reach the **goal (X)** in the main grid to win.
-   Use **helpers** (hammer, axe, sickle) to remove specific obstacles.

## 🧱 Grid Mechanics

-   Grids are 5x5 for easy mode (more difficulties will be added).
-   Obstacles are randomly generated and styled with pixel art.
-   The NPC grid is a mirrored version of the player’s grid.

## 🛠 Features

-   🔀 Randomized maps
-   🪓 Tool-based obstacle removal
-   🦮 Mirrored puzzle logic
-   🎨 Pixel art UI
-   🧹 Dynamic keyboard + mouse controls
-   ↻ Full game reset and win modal

## 🧪 Technologies Used

-   HTML5
-   CSS3
-   JavaScript

## 🥪 How to Play Locally

1. Clone or download the repository.
2. Open `index.html` in a browser (preferably using a live server for modals to work).
3. Click on `Start Game` button.
4. Play using your keyboard (only applicable for user movement and helper selection) or the on-screen arrows.

## 🚀 Future Enhancements

-   Auto-generation of maps with code-build over fixed maps
-   More grid sizes (Intermediate, Advanced and Expert)
-   Scoring and leaderboard system stored on client-side/online
-   Sound effects and animations for movements, win and lose
-   Timer and turn-based challenges
-   Dark and light mode selection

## 🙌 References and Credits

Designed and developed by **Vinny Valeria**

-   Fonts : [Google Fonts Pixelify Sans and Jersey](https://fonts.google.com/share?selection.family=Jersey+15|Pixelify+Sans:wght@400..700)
-   Game Background : [Pixel Art Backgrounds by Fez Escalante](https://www.behance.net/gallery/65290819/Pixel-Art-Backgrounds-Tutorial-Skip)
-   Helpers : [Hammer](https://www.123rf.com/free-vector_189701039_pixel-art-hammer-weapon.html), [Axe](https://www.vecteezy.com/vector-art/20577093-red-axe-in-pixel-art-style), [Sickle](https://www.freepik.com/premium-vector/pixel-art-illustration-sickle-pixelated-sickle-farm-sickle-equipment-pixelated-game_226589414.htm)

## 📚 License

This project is for personal and educational use. All assets and source code are owned by the developer unless otherwise stated.

## 📝 Planning Process

-   Brainstormed multiple game ideas and selected the most viable concept that could be completed within the project timeline.
-   Defined the user story and core game features to guide development.
-   Visualized the game layout through a wireframe using [Figma](https://www.figma.com/proto/qpGbyDPbEGoV2TerV8xQ9z/Reflektor-Wireframe?node-id=0-1&t=EPDrIuBjXgTwC5Xa-1).
-   Broke down each game feature into modular functions for a structured coding approach.
-   Built the game incrementally while continuously testing and fixing bugs throughout development.
-   Spent most of Sundays to catch up if build is behind timeline due to work commitments on weekdays.

> The planning process emphasized clarity and modularity to ensure the game was functional, visually cohesive, and delivered within the project timeline.

## 🧠 My Coding Approach

-   Created a 5×5 (easy mode) grid using DOM and CSS Grid
-   Built a mirrored version of the map dynamically
-   Randomized map and obstacle placement
-   Developed keyboard and UI-based movement logic
-   Implemented helper tools that can remove obstacles
-   Designed modular functions for updating UI and tracking state
-   Integrated modal popups and game reset logic
-   Used event delegation and state-based UI updates
-   Bug fixes based on the manual record stored in `bugs.md`

## 📚 What I Learnt

-   The importance of planning the game state early to prevent logic conflicts later.
-   How to manage event listeners properly to avoid duplication and unintended behaviors.
-   Writing modular and readable code made debugging and future updates significantly easier.
-   A scalable code structure (e.g., difficulty levels) lays the foundation for future enhancements.
-   Time management is crucial, especially when balancing a full-time job with project deadlines.
-   In hindsight, allocating more focused time on resolving key bugs early would have improved progress and stability.

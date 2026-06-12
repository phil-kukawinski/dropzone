# Dropzone

A Plinko-style physics game. Drop balls through pegs, land in scoring slots, hit targets to advance rounds.

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Build

```bash
npm run build
```

Output goes to `dist/` — ready to deploy anywhere static files are served.

## How to play

- Click (or tap) anywhere along the top to drop a ball
- Aim for the high-value center slots
- Hit pegs to build your streak multiplier (up to x10)
- Land in amber bonus slots to earn extra balls
- Each round has a score target — miss it and the run ends
- Obstacles appear and evolve each round

## Project structure

```
dropzone/
├── index.html       # Shell + HUD markup
├── src/
│   ├── main.js      # All game logic, physics, rendering
│   └── style.css    # Layout and theming (light + dark mode)
├── vite.config.js
└── package.json
```

## Extending

All game constants are at the top of `src/main.js` — `GRAVITY`, `BOUNCE`, `BASE_SCORES`, etc. The round target curve is in `roundTargetFor(r)`. Obstacle types live in `buildObstacles()`.

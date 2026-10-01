# 🌍 Wanderlust — 3D Interactive Travel Diary

A personal travel diary home page featuring a spinning 3D Earth powered by [Globe.gl](https://github.com/vasturiano/globe.gl) and ThreeJS CSS2DRenderer HTML Elements Layer.

---

## ✨ Features

- **🗺️ Country Map Layer (國家色塊地圖)**:
  - 3D country polygons rendered directly on Earth with distinctive color blocks.
  - **Three Color Modes** switchable in the bottom HUD:
    1. **Vibrant Blocks (多彩色塊)**: 16-color categorical palette distinguishing neighboring countries with translucent depth.
    2. **Visited Focus (足跡高亮)**: Visited countries glow radiantly in emerald/gold, while unvisited countries rest in subtle dark slate.
    3. **Continents (大洲分區)**: Coordinated color-coding by world continents.
  - **3D Hover Elevation**: Moving the cursor over a country smoothly lifts its 3D polygon plate (`altitude: 0.024`) and displays a rich glassmorphism tooltip (flag, country name, population, and visited travel stories).
  - **Interactive Country Click**: Clicking a visited country flies the camera to its city pins; clicking an unvisited country opens the journey logger for that country!

- **📍 Precision Ground-Anchored City Pins (地表精準定位標籤)**:
  - **Eliminated floating parallax**: Markers now use `.htmlAltitude(0.008)` to hug the Earth's crust and polygon surface tightly.
  - **Surface Anchor Point (0, 0)**: Centered directly on coordinates with a solid glowing ground dot and radar ripple wave.
  - **Sleek City Pill Badge & Pointer**: A compact Apple/Google Earth style pill badge rooted only 4px above the ground dot via a downward pointer tip, ensuring zero wobbling or detached sensation when tilting the globe!

- **🪟 Hover to Float Up ("Small Page" / 浮起小頁面)**:
  - When you hover over any city badge or ground dot, a styled travel preview card **floats up** smoothly with spring physics!
  - Features scenic travel photo, country badge, travel date, ratings, and quotes.
  - Earth auto-rotation automatically pauses when hovering to make reading effortless.
  - Quick actions: **Read Story 📖** and **Focus Camera 🎯**.

- **🌐 3D Spinning Earth**:
  - Interactive WebGL globe with realistic textures, starry cosmic backdrop, and atmospheric glow.
  - Smooth auto-spin with play/pause toggle and reset camera view.
  - Switchable Earth textures: *Night City Lights*, *Blue Marble*, and *Dark Minimal*.

- **✈️ Flight Route Arcs**:
  - Golden/cyan animated curving flight trajectories connecting visited destinations across continents.

- **📖 Full Travel Diary Reader Modal**:
  - Click any pin or card to open the rich travel journal reader.
  - Displays diary reflections, fast facts, photo snapshots gallery, and insider tips.
  - Includes **Previous / Next Destination** buttons for a guided world tour.

- **🗺️ Slide-out Destination Index & Search**:
  - Real-time search across cities, countries, and categories.
  - Filter places by continent (Asia, Europe, Americas, Africa, Oceania).

- **✦ Add Your Own Journeys**:
  - Interactive form to log new trips with coordinates, custom stories, and photos.
  - Includes quick city presets (Tokyo, Rome, London, Taipei, etc.).
  - Persists directly to `localStorage`!

---

## 🚀 Quick Start

### Option 1: Python Server (Recommended)
Open Terminal in the project folder and run:
```bash
cd /Users/robinkuo/Desktop/Projects/travel-diary
python3 serve.py --open
```
Or:
```bash
python3 -m http.server 8080
```
Then visit: [http://localhost:8080](http://localhost:8080)

### Option 2: Direct Open in Browser
Double-click `index.html` or run:
```bash
open index.html
```

---

## 📁 File Structure

```text
travel-diary/
├── index.html                        # Main web page structure & UI HUD
├── styles.css                        # Cosmic theme, precision markers & country tooltips
├── app.js                            # Globe.gl controller, country polygons & hover physics
├── destinations.js                   # Curated travel diary dataset (Kyoto, Paris, Iceland, etc.)
├── countries-data.js                 # Embedded GeoJSON for 100% offline & file:// compatibility
├── ne_110m_admin_0_countries.geojson # Natural Earth country boundaries dataset
├── globe.gl.min.js                   # Local standalone bundle of Globe.gl (v2.46.2)
├── serve.py                          # Lightweight Python dev server with CORS support
└── README.md                         # Documentation
```

# Snapmatic VI

An in-game phone for Leonida. Shoot a photo, edit it, stamp it, and post it to the Vice Feed — where the neighborhood reacts, and the more you deface, the more heat you draw.

Built for Unlayer's **Build with React Image Editor** challenge.

> Original work. Not affiliated with or endorsed by Rockstar Games. No Rockstar assets, characters, or trademarks are used — all visuals, copy, and UI are original.

**🔗 Live demo: [snapmatic-vi.vercel.app](https://snapmatic-vi.vercel.app/)**

## What it is

Snapmatic VI wraps [`@unlayer/react-image-editor`](https://github.com/unlayer/react-image-editor) inside a fully custom, self-contained phone interface — boot animation, lock screen, home grid, camera roll, and a social feed — all built from scratch around the editor rather than the editor being the whole app.

**The loop:**
1. Boot the phone, unlock it, open **Camera**.
2. Pick a seed photo or upload your own from the **Camera Roll**.
3. Edit it in the full React Image Editor — filters, crop, draw, text, shapes, frames.
4. Optionally open **Stamps** — a custom compositor built on top of the editor with 8 original Vice-themed stickers (palm, wanted star, flame, shades, cash, cassette tape, bolt, heart) that you can drag, resize, and delete before flattening onto the photo.
5. Save, then tap the 📡 icon on any camera roll photo to **post it to the Vice Feed**.
6. NPC accounts react to what you posted — a clean edit gets "this the vibe fr," a heavily defaced one gets flagged by `@LPD_official`.
7. Every post feeds a **wanted-level** meter (the ★ row in the phone's status bar) — the heavier your recent edits, the more stars light up. Post something clean and the stars gradually cool back down.

## Screenshots

<img width="438" height="808" alt="image" src="https://github.com/user-attachments/assets/c2ad2eac-1145-40e8-bb92-bd8b744de01d" />

<img width="428" height="810" alt="image" src="https://github.com/user-attachments/assets/5fe66734-4af4-4e5f-a85a-c15eb6dd836c" />

<img width="427" height="804" alt="image" src="https://github.com/user-attachments/assets/1ec3b2c8-ba9a-442f-ac67-7a299272e1f0" />

<img width="443" height="807" alt="image" src="https://github.com/user-attachments/assets/d27b5068-2ca4-4382-90e0-03e45f56081d" />

## Tech

- React 18 + TypeScript + Vite
- [`@unlayer/react-image-editor`](https://www.npmjs.com/package/@unlayer/react-image-editor) — the core photo editor (filters, crop, draw, text, shapes, stickers, frames)
- No backend — everything runs client-side; photos and posts live in memory for the session
- Custom canvas compositor for the Stamps feature (Unlayer's own sticker panel isn't customizable, so the Stamps tray is a second, original layer built independently)
- A lightweight heuristic (`src/lib/heatScore.ts`) scores how much of a photo changed between original and edited versions, combined with stamp count, to drive the wanted-level mechanic

## How the editor is used

The React Image Editor isn't a bolted-on feature — it's the app's core interaction. It's mounted inside `src/components/PhotoEditor.tsx`, themed dark to match the phone's chrome, docked left, with the Resize tool hidden to keep the toolset focused. Because the embedded editor renders at a fixed internal width regardless of its container, the editing screen uses a horizontal scroll pattern (`Tools ⚙ / Draw ✎`) so the full toolset and canvas both stay reachable inside the phone frame without ever clipping — see `src/App.tsx` for the scroll-sync logic.

## Local setup

Try it live at [snapmatic-vi.vercel.app](https://snapmatic-vi.vercel.app/) — no setup required.

To run locally instead:

```bash
npm install
npm run dev
```

Open the printed local URL (default `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Known constraints

- The embedded editor's canvas size and internal layout are fixed by the third-party bundle and aren't responsive to container width — worked around with scroll navigation rather than resizing.
- Unlayer's own Sticker tool ships flat, non-recolorable glyphs with no customization API, which is why Stamps exists as a separate, custom-built overlay.
- The wanted-level heuristic is a proxy (pixel-change + stamp count), not a real measure of "what tool was used" — Unlayer's wrapper doesn't expose which tool is active or what edit was made.

## License

MIT

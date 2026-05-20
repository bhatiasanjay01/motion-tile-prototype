# Motion tile-discovery prototype (web)

Static deploy of the polished Cursor canvas for GitHub Pages.

**Repo:** https://github.com/bhatiasanjay01/motion-tile-prototype  
**Live site (after deploy):** https://bhatiasanjay01.github.io/motion-tile-prototype/

## Run locally

```bash
cd motion-prototype-web
npm install
npm run dev
```

Open http://localhost:5173 — use the tab pills to switch screens.

## Build

```bash
npm run build
npm run preview   # optional: test production build locally
```

## Deploy to GitHub Pages

### 1. Create a GitHub repo

Example: `motion-tile-prototype` under your account.

### 2. Set the base path

For **project pages** (`https://<user>.github.io/<repo>/`):

```bash
export VITE_BASE_PATH=/motion-tile-prototype/
npm run build
```

For a **user/org site** (`https://<user>.github.io/`):

```bash
export VITE_BASE_PATH=/
npm run build
```

### 3. Push and publish

```bash
cd motion-prototype-web
git init
git add .
git commit -m "Add Motion prototype for GitHub Pages"
git branch -M main
git remote add origin git@github.com:<YOUR_USER>/<YOUR_REPO>.git
git push -u origin main
```

Deploy the `dist` folder:

```bash
npm run deploy
```

(`deploy` runs `vite build` then `gh-pages -d dist`.)

### 4. Enable Pages in GitHub

Repo → **Settings** → **Pages** → **Build and deployment** → Source: **GitHub Actions**.

(Or use `npm run deploy` for the classic **`gh-pages`** branch flow — pick one method.)

Site URL: `https://bhatiasanjay01.github.io/motion-tile-prototype/` (after Actions finishes, ~1–2 min).

## Source

`src/motion-platform-polished.canvas.tsx` — same UI as the Cursor canvas. `src/ui.tsx` replaces `cursor/canvas` for the static build.

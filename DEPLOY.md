# GitHub Pages 404 checklist

If **https://bhatiasanjay01.github.io/motion-tile-prototype/** returns 404:

## 1. Pages source (most common)

**Settings → Pages → Build and deployment**

| Field | Required value |
|-------|----------------|
| Source | **Deploy from a branch** |
| Branch | **gh-pages** |
| Folder | **/ (root)** |

Save. Do **not** use “GitHub Actions” as the source for this repo.

## 2. Confirm `gh-pages` has the site

**Code → branch `gh-pages`** — you should see:

- `index.html`
- `.nojekyll` (required; stops Jekyll from breaking the build)
- `assets/` folder

## 3. Re-run deploy

**Actions → Deploy GitHub Pages → Run workflow** (after pushing the latest workflow).

Wait 2–5 minutes, then hard refresh: **Cmd+Shift+R**.

## 4. Correct URL

Use exactly:

`https://bhatiasanjay01.github.io/motion-tile-prototype/`

(not `github.io` without the repo name)

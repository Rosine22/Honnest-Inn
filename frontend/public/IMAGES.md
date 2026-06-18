Place the real food photos you've attached into this folder so the menu shows them.

Filenames to save (use exactly these names):

- `kebab.jpg`        — beef kebab / skewers
- `chapati.jpg`      — chapati / flatbread
- `fried-chicken.jpg` — fried chicken pieces
- `chicken-stew.jpg` — chicken stew / saucy chicken
- `salmon.jpg`       — salmon skewers
- `grilled-fish.jpg` — grilled fish / local fish
- `fries.jpg`        — french fries
- `beer.jpg`         — beer / drink photo
- `juice.jpg`        — fresh juice

How to add the images:
1. Save each attached photo using the filenames above.
2. Copy them into `frontend/public/images/`.
3. Restart the dev server if it was running.

Example (from project root):
```bash
mkdir -p frontend/public/images
cp /path/to/your/photo1.jpg frontend/public/images/kebab.jpg
```

After placing images, open the frontend dev server; images load from `/images/<filename>`.
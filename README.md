# M&B Calendar

Small interactive month-view calendar built with React and Moment Timezone.

Visit https://mbcal.netlify.app/

## Features

- Month view calendar (6x7 grid) with previous/next navigation and a "Today" button
- Live clock showing local timezone (updates every second)
- Monthly portrait image with caption/artist credit (images cycle by month index)
- Responsive layout: two-column (image + calendar) on desktop, stacked vertically on mobile

## Local development

1. Install dependencies:

```bash
npm install
```

2. Start dev server (Parcel):

```bash
npm start
```

The dev server runs at `http://localhost:1234` by default.

3. Build for production:

```bash
npm run build
```

The optimized build will be output to the `dist/` directory.

## Netlify deploy

- Build command: `npm run build`
- Publish directory: `dist`

If you connect this repository to Netlify (via GitHub), Netlify will auto-deploy on every push to `main`.

## Configuration & notes

- Images: edit the `images` array in `src/App.jsx`. Each image is an object with `url` and `caption` fields. The app selects an image by using the current month index modulo the number of images, so you can add or remove images freely.
- Timezone: the app uses `moment.tz.guess()` to detect the browser timezone. To force a timezone, replace that call in `src/App.jsx` with a timezone string (for example `moment.tz('America/Los_Angeles')`).
- Layout: the CSS in `src/App.jsx` makes the header and controls span full width and shows the image + calendar in two columns on desktop; on screens under 768px it stacks vertically (header → controls → image → calendar → selected date).

## Quick tips

- To preview changes locally: run `npm start` and open `http://localhost:1234`.
- To trigger a Netlify rebuild: push commits to `main` (Netlify will pick them up automatically).

If you want, I can push these changes for you or add a small `deploy` script to automate builds.

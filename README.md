# mb-calendar

Local development & Netlify notes

- Install dependencies: `npm install`
- Start dev server (preview): `npm start` (Parcel will open the app)
- Build for production: `npm run build` (output is in `dist/`)

Netlify settings

- Build command: `npm run build`
- Publish directory: `dist`

Notes

- Replace or add images in `src/App.jsx` `images` array. The code maps the month index to an image using modulo, so any number of images will cycle across months.
- The app auto-detects your local timezone via `moment.tz.guess()` and updates the clock every second.

A fun, wholesome online calendar for the M&amp;B Discord server

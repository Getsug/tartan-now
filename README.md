# Tartan Now — JSON-powered Next.js MVP

A mobile-first CMU-Africa event discovery board. **The bundled events are fictional examples. Replace them before publishing.**

## Prerequisites
- Node.js 20.9 or newer
- npm
- Git (for GitHub deployment)

## Run locally
1. Extract the ZIP.
2. Open the `tartan-now` folder in VS Code.
3. Open Terminal > New Terminal.
4. Run `npm install`.
5. Run `npm run dev`.
6. Open http://localhost:3000.

## Add or update events
Edit `data/events.json`. Every entry in the array must have a unique `id` (use simple lowercase names and hyphens), title, description, category, optional tags (string array), location, organizer, startTime, endTime, registrationUrl, waitlistUrl, status, changeNote, and updatedAt.

Dates use ISO 8601 with the Kigali offset `+02:00` (for example `2026-11-18T14:00:00+02:00`). Use real registration URLs or `null`. Categories: Tech, Career, Social, Wellness, Arts, Clubs. Status: normal, new, changed, cancelled, full.

For a changed event, update the actual fields and set `status` to `changed`, explain the change in `changeNote`, and set `updatedAt` to the current timestamp. Cancelled events cannot be added to Google Calendar or registered for. Full events can optionally use `waitlistUrl`.

**Important:** This JSON file is bundled into the site at build time. Edits require a new deployment. Events that are removed from JSON will also disappear from Saved views. Save bookmarks are per-browser/device, not synchronized.

## Publish with GitHub + Vercel
1. Create a new empty GitHub repository.
2. In the project folder run:
   `git init`
   `git add .`
   `git commit -m "Initial Tartan Now MVP"`
   `git branch -M main`
   `git remote add origin https://github.com/YOUR-USERNAME/tartan-now.git`
   `git push -u origin main`
3. Import the GitHub repository into Vercel. Use the Next.js preset and deploy.
4. To publish event changes, edit `data/events.json`, then run:
   `git add data/events.json`
   `git commit -m "Update campus events"`
   `git push`
5. Wait for the Vercel deployment to complete.

## Responsive behavior
- Phone, tablet, and desktop: compact full-width event rows grouped by date.
- The card date tile stays top-left, while event text wraps naturally.
- Filters scroll horizontally within their own rows, without making the whole page scroll sideways.
- Event details: stacked on mobile/tablet, two columns at 1024px+.

## Notes
- The default filter is Today. If no sample events are happening today, select This month or Next week.
- "This week" is a rolling seven-day range (today through six days ahead); "Next week" is days seven through thirteen.
- "This month" includes upcoming dates in the current calendar month.
- "Saved" intentionally shows saved events regardless of date range, so past saved events remain findable.
- Google Calendar opens a prefilled event, which the user must save.
- WhatsApp sharing uses the event's URL and opens WhatsApp for the user to choose recipients.
- No database, accounts, admin dashboard, or background reminders are included.

## Optional event images (v0.2)
- Put your image in `public/events/` (e.g. `public/events/workshop.jpg`).
- In `data/events.json`, set `"image": "/events/workshop.jpg"` and optionally `"imageAlt": "Students at the workshop"`.
- If you do not want an image, set `"image": null` or omit the field. The card automatically becomes text-only, with no blank image placeholder.
- Use landscape images around 16:9. Compress images for mobile performance; only use photos you have permission to publish.
- Start and end times come from `startTime` and `endTime`, with explicit `+02:00` offsets for Kigali.
- Status colors: `new` green, `changed` amber, `cancelled` red, `full` neutral gray; `normal` has no badge.
- The interface uses a CMU-inspired red (`#c41230`) and includes Carnegie Mellon University Africa in the header. This is a brand-inspired design, not an official university website.

## Design update (v0.3)
- Background: `#faf8f6`; header and active filters: `#c41230`.
- Cards are white with light borders and subtle shadows.
- Events are grouped by Kigali calendar date, with headings and count pills.
- Each compact card shows a left date tile, title, start/end time, location, status, save, details, and WhatsApp share.
- Status colors: new green, updated amber, cancelled red, full neutral gray.
- Optional event photos remain on detail pages; the board uses compact text cards.
- The original tagline is not displayed.

## Search, filters and Apple Calendar
- Search matches title, location, category, tags, and status terms (`new`, `updated`, `cancelled`, `full`). Add optional `"tags": ["workshop", "free food"]` to any event in `data/events.json`.
- Date and category filters combine with search. Clear filters always resets to **Today**, **All interests**, empty search, and disables Saved-only mode.
- On event details, **Add to Apple Calendar (.ics)** downloads a standards-compliant calendar file. Open the downloaded file with Apple Calendar to import the event. Cancelled events have no calendar actions.
- If VS Code still shows TS2882 for `./globals.css`, run `npm install`, then Command Palette > **TypeScript: Restart TS Server**, and ensure VS Code opened the `tartan-now` folder (not a parent directory).

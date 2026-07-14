# Introduction to Hotwire Native

Slides for Mike Dalton's "Introduction to Hotwire Native — Build iOS and
Android apps with Ruby on Rails" talk (Chicago Ruby, March 2026), built with
[Slidev](https://sli.dev/). Converted from a Keynote original; this repo is
now the source of truth for the deck.

## Usage

```sh
npm install
npm run dev      # live-reload preview at localhost:3030
npm run build    # static build to dist/
npm run export   # PDF export (needs playwright-chromium)
```

Press <kbd>?</kbd> in the presentation for keyboard shortcuts.

## Structure

- `slides.md` — the entire deck (113 slides), separated by `---`
- `public/images/` — screenshots and logos, referenced as `/images/<name>`
- `public/videos/` — demo recordings (H.264 MP4), referenced as `/videos/<name>`

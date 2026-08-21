# CLAUDE.md

See [README.md](README.md) for what this deck is, commands, and repo structure.

The demo app the code samples come from is the RSS reader, at
`~/Code/rss-reader/rss-reader-rails` on Mike's machine. Pull real code from
there rather than inventing sample code.

## Conventions

- Default Slidev theme only. Use built-in layouts (`cover`, `section`,
  `statement`, `quote`, `two-cols`, `image-right`, `image`, `center`) and
  small UnoCSS utility classes — no custom theme CSS or per-slide styling
  beyond what's necessary. Flexibility for editing beats visual polish.
- Code samples are real fenced code blocks (never screenshots), with the
  file path as a small caption div underneath:
  `<div class="text-xs opacity-60 text-center">app/…/file.rb</div>`
- Dense code slides shrink via `class: text-xs` / `text-sm` in the slide
  frontmatter; prefer trimming code over shrinking further.
- Videos are embedded with the `DemoVideo` component, which autoplays muted and
  loops: `<DemoVideo src="/videos/x.mp4" />`. Pass `:autoplay="false"` for the
  older click-to-play style, `maxH="max-h-105"` to override the height.
- **Videos MUST be H.264, never HEVC/H.265.** Simulator recordings (RocketSim,
  Xcode) and Keynote exports come out HEVC, which Safari and Chrome-on-macOS
  play locally but which renders as a blank white box in the deployed deck and
  in any browser without hardware HEVC. Transcode every new video before
  committing it:
  `ffmpeg -i in.mp4 -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 23 \`
  `  -preset slow -movflags +faststart -an public/videos/x.mp4`
  Check an existing file with
  `ffprobe -v error -select_streams v:0 -show_entries stream=codec_name -of csv=p=0 f.mp4`.
  The `-an` drops the audio track (all deck videos are muted), and H.264 also
  cuts these recordings to roughly a third of their HEVC size.
- Full-bleed screenshots use `layout: image` with `backgroundSize: contain`.
- To free-position an element (badges, QR codes, callouts), prefer Slidev's
  `v-drag="[x,y,w,h]"` over `absolute`/`fixed` UnoCSS classes. `v-drag`
  coordinates are in the slide's own scaled space, so the element stays put and
  scale-to-fit and won't trip the overflow checker the way absolute positioning
  (which escapes the scaled container) does.
- Presenter notes are HTML comments (`<!-- … -->`) at the end of a slide.

## Deployment

- The deck deploys to Cloudflare Pages (build `npm run build`, output `dist`,
  Node pinned via `.node-version`). The deck uses hash routing
  (`routerMode: hash` in the `slides.md` headmatter), so every URL resolves to
  `index.html` client-side and no server rewrite is needed.
- `public/_redirects` is intentionally comment-only. `slidev build` otherwise
  auto-generates a `/*  /index.html  200` rule (it only writes one if the file
  is absent), which Cloudflare Pages rejects as an infinite loop. Keep the file
  present and don't add rewrite rules to it.
- Cloudflare installs with `npm ci`, which hard-fails if `package-lock.json`
  is out of sync with `package.json`. Whenever you change deps, run
  `npm install` and commit the regenerated `package-lock.json` in the same
  change — otherwise the build dies at install with `npm error code EUSAGE`.

## Notes

- The repeated "Implementation steps" slides are intentional — they re-anchor
  the audience between platform-specific deep dives. Don't dedupe them.
- Diagram images may be replaced with Mermaid blocks over time; leave images
  in place until Mike swaps them himself.
- Videos add ~70MB; plain git (no LFS) is a deliberate choice.

## Overflow checking

`npm run check:overflow` (needs `npm run dev` running on :3030, and a one-time
`npx playwright install chromium`) renders every slide in a real browser via
`slidev-overflow-checker` and reports content that overflows the slide. It's a
manual, opt-in check — not wired into any automation. **It massively over-reports
on this deck** — it measures element bounding boxes and ignores Slidev's
scale-to-fit, so it flags ~40+ slides (centered headings, code-block backgrounds,
images, videos) that are not actually clipped. Do NOT trust its pass/fail or
count. Only real overflow is a code line cut off on the right or a code block cut
off at the bottom; verify each flagged code/image slide by rendering
`http://localhost:3030/<n>` at 1920×1080 before touching it. Fix real clips by
shrinking with `<CodeCaption size="sm|xs">`, breaking/trimming long lines, or
splitting the slide.

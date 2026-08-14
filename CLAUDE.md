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
- Videos were remuxed from Keynote's .mov (no re-encode), embedded with
  `<video src="/videos/x.mp4" controls muted loop class="max-h-110 …" />`.
- Full-bleed screenshots use `layout: image` with `backgroundSize: contain`.
- Presenter notes are HTML comments (`<!-- … -->`) at the end of a slide.

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

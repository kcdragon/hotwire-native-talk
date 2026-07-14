# CLAUDE.md

See [README.md](README.md) for what this deck is, commands, and repo structure.

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

# Performance recommendations

Quick wins and longer-term options to improve site speed (without changing design or image quality).

## Already in place

- **Preloader** – shortened to ~2.4s so content appears sooner
- **Hero image** – `priority` + `fetchPriority="high"` for faster LCP
- **Resource hints** – preconnect for `midmac.design` so image/API connections start earlier
- **Images** – Next/Image with AVIF/WebP, gradient placeholders, sensible `sizes` and quality
- **Caching** – ISR `revalidate: 3600`, long-lived cache headers for static assets
- **Bundle** – `optimizePackageImports` for motion, lucide, Lexical; `removeConsole` in prod

## Further recommendations

### 1. Hosting and CDN

- Deploy on **Vercel** (or similar) so the app and images are at the edge; first load will feel faster.
- If images are on your own domain, put them behind a **CDN** (e.g. Cloudflare, Vercel Image Optimization) so they’re served from a nearby node.

### 2. Upgrade Next.js

- The app is on **Next.js 15.1.3**; the dashboard may show it as outdated. Upgrading to the latest 15.x (or 14.x LTS) can improve runtime and build performance. Test in a branch first.

### 3. Reduce API payload where possible

- Home page uses `depth: 2` for the page query (needed for nested blocks). If any block doesn’t need that depth, consider a slimmer query or a dedicated API for that block.
- Ensure Payload only returns the fields each page needs (no huge rich text or media unless required).

### 4. Fonts

- You have many Montserrat variants. If only a few weights are used (e.g. 400, 700), consider removing unused `@font-face` rules or loading extra weights only on specific routes.
- Preloading the single most critical font file (e.g. the one used in the hero) can improve LCP; add a `<link rel="preload" as="font" type="font/woff2" href="..." crossorigin>` for that file.

### 5. Third-party scripts

- If you add analytics, ads, or chat widgets, load them **after** the main content (e.g. `next/script` with `strategy="lazyOnload"`) so they don’t block the first paint.

### 6. Monitoring

- Use **Lighthouse** (Chrome DevTools) or **PageSpeed Insights** to measure LCP, TBT, and CLS. Fix the biggest regressions first (usually images, fonts, or large JS).

---

If you want to revisit code-splitting (e.g. lazy-loading below-the-fold blocks), we can try a more conservative approach (e.g. only for client components) to avoid the previous webpack runtime error.

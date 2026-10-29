# Security checklist

- [x] Added Content Security Policy and security headers for Cloudflare Pages/Netlify and Vercel, with a CSP meta fallback.
- [x] Self-hosted fonts; the site does not load analytics, trackers, or third-party scripts.
- [x] Hardened contact form inputs and links, with client-side honeypot and submission throttling.
- [x] Added dependency auditing and build checks on pushes and pull requests, plus weekly Dependabot updates.
- [ ] Enable HTTPS-only redirects and confirm HSTS is served by the hosting provider before enabling/preloading HSTS.
- [ ] Enable provider-side contact form rate limiting and spam protection (such as CAPTCHA/reCAPTCHA); browser-side checks can be bypassed.
- [ ] Enable GitHub branch protection and two-factor authentication for maintainers.

Framer Motion applies animation styles at runtime, so the CSP allows inline styles; scripts remain restricted to the same origin. If `VITE_FORM_ENDPOINT` is configured, add only that endpoint's exact HTTPS origin to both `connect-src` and `form-action` in `index.html`, `public/_headers`, and `vercel.json`. No endpoint is configured in this checkout.

A static frontend cannot protect secrets, enforce reliable rate limits, or prevent determined spam on its own. Hosting and form-provider controls must be configured separately.

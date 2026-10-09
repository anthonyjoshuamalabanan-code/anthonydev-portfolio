# Freelance Frontend Developer Portfolio

React + Vite + Tailwind CSS (v3) + Framer Motion + Lucide React.

## Run locally
bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run preview    # preview the production build

Requires Node 18 or newer.

## Replace your content
All content lives in `src/data/site.js`.
- `profile`: name, location, email, GitHub, LinkedIn, resume URL, availability. Put your resume at `public/resume.pdf` and set `resume: '/resume.pdf'`.
- `stats`, `skillGroups`, `services`, `processSteps`, `testimonials`: edit text or add objects.
- `projects`: copy an entry and change `id`, `title`, `category`, `description`, `tags`, `github`, `demo`. The filter buttons update automatically from the categories you use.
  For real screenshots, put images in `src/assets/` (WebP, about 1200px wide), import them, and set `image: importedImage`.
- Colors: edit the CSS variables at the top of `src/index.css` (`:root` for light, `.dark` for dark).
- SEO: edit the title, description, canonical URL, and Open Graph tags in `index.html`. Add a 1200x630 `public/og-image.png` for social previews.

## Contact form
By default the form opens the visitor's email app with the message pre-filled. To receive messages directly, create a form at Formspree (or similar), copy `.env.example` to `.env`, and set `VITE_FORM_ENDPOINT` to its URL.

## Deploy
Run `npm run build`, then publish the `dist` folder.
- **Netlify**: connect the repo, build command `npm run build`, publish directory `dist`.
- **Vercel**: import the repo; the Vite preset is detected automatically.
- **GitHub Pages**: set `base: '/your-repo-name/'` in `vite.config.js` (not needed for a user site or custom domain), build, and publish `dist` (for example with the `gh-pages` package or a GitHub Action).
Add `VITE_FORM_ENDPOINT` in your host's environment settings if you use it.

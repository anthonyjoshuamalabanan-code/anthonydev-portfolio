import { ArrowUp } from 'lucide-react';
import { navItems, profile } from '../data/site.js';
import SocialLinks from './SocialLinks.jsx';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line text-center">
      <div aria-hidden="true" className="footer-ornament mx-auto mt-8" />
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="min-w-0 md:text-left">
          <p className="font-display text-xl font-bold">{profile.name}</p>
          <p className="mt-2 max-w-xs text-muted">{profile.title}. Learning, building, and improving one project at a time.</p>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 md:grid-cols-1">
            {navItems.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`} className="text-muted transition hover:text-accent">{label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col items-center md:items-end">
          <SocialLinks />
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0 })}
            className="btn btn-ghost mt-6"
          >
            <ArrowUp size={18} aria-hidden="true" /> Back to top
          </button>
        </div>
      </div>
      <div className="border-t border-line py-6">
        <p className="container-x text-sm text-muted">&copy; {year} {profile.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}

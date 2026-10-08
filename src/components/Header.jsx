import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { navItems, profile } from '../data/site.js';
import useActiveSection from '../hooks/useActiveSection.js';

const sectionIds = navItems.map((item) => item.id);

export default function Header({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', onKey);

    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isDark = theme === 'dark';

  const linkClass = (id) =>
    `rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
      active === id
        ? 'text-accent'
        : 'text-muted hover:text-ink'
    }`;

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-lg transition-colors ${
        scrolled || open
          ? 'border-line bg-bg/80'
          : 'border-transparent bg-bg/40'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4">

        {/* Logo + Name */}
        <a
          href="#home"
          className="flex min-w-0 items-center gap-2.5 font-display text-lg font-bold"
        >
          <img
            src="/icon.png"
            alt=""
            className="h-9 w-9 shrink-0 rounded-xl object-cover"
          />

          <span className="truncate">
            {profile.name}
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav
          aria-label="Primary"
          className="hidden lg:block"
        >
          <ul className="flex items-center gap-1">
            {navItems.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={
                    active === id ? 'location' : undefined
                  }
                  className={linkClass(id)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Theme + Mobile Menu */}
        <div className="flex items-center gap-2">

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${
              isDark ? 'light' : 'dark'
            } mode`}
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-muted transition hover:border-accent hover:text-accent"
          >
            {isDark ? (
              <Sun
                size={19}
                aria-hidden="true"
              />
            ) : (
              <Moon
                size={19}
                aria-hidden="true"
              />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={
              open ? 'Close menu' : 'Open menu'
            }
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-muted transition hover:border-accent hover:text-accent lg:hidden"
          >
            {open ? (
              <X
                size={20}
                aria-hidden="true"
              />
            ) : (
              <Menu
                size={20}
                aria-hidden="true"
              />
            )}
          </button>

        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: 'auto',
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="overflow-hidden border-t border-line lg:hidden"
          >
            <nav
              aria-label="Mobile"
              className="container-x py-3"
            >
              <ul className="grid gap-1">
                {navItems.map(({ id, label }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={() => setOpen(false)}
                      aria-current={
                        active === id
                          ? 'location'
                          : undefined
                      }
                      className={`block rounded-xl px-3 py-3 text-base font-medium ${
                        active === id
                          ? 'bg-accent/10 text-accent'
                          : 'text-ink hover:bg-surface'
                      }`}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
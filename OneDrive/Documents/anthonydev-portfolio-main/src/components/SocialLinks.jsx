import { Github, Mail } from 'lucide-react';
import { FaDiscord, FaFacebook } from 'react-icons/fa';
import { profile } from '../data/site.js';

const links = [
  {
    label: 'Discord',
    href: 'https://discord.com/',
    icon: FaDiscord,
    external: true,
  },
  {
    label: 'GitHub',
    href: profile.github,
    icon: Github,
    external: true,
  },
  {
    label: 'Gmail',
    href: `mailto:${profile.email}`,
    icon: Mail,
    external: false,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/owaaintsht',
    icon: FaFacebook,
    external: true,
  },
];

export default function SocialLinks({ className = '' }) {
  return (
    <ul className={`flex items-center gap-3 ${className}`} aria-label="Social links">
      {links.map(({ label, href, icon: Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={
              external
                ? `${label} (opens in a new tab)`
                : `Send an ${label.toLowerCase()}`
            }
            {...(external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-muted transition hover:-translate-y-0.5 hover:border-accent hover:text-accent motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <Icon size={19} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
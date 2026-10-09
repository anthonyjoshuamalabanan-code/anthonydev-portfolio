import { Briefcase, CalendarCheck, MapPin } from 'lucide-react';
import { profile, stats } from '../data/site.js';
import Reveal from './Reveal.jsx';
import Section from './Section.jsx';

const facts = [
{ icon: Briefcase, label: 'Experience', value: profile.experience },
{ icon: MapPin, label: 'Location', value: profile.location },
{ icon: CalendarCheck, label: 'Availability', value: profile.availability },
];

export default function About() {
return ( <Section id="about" title="A Web developer building and learning"> <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_1fr]"> <Reveal className="min-w-0"> <div className="max-w-xl space-y-5 text-lg text-muted"> <p>
I'm a Web developer who is learning by building projects. I enjoy
turning an idea into a working page, then going back to fix the
parts that do not look or work the way I want. </p>


        <p>
          Right now, my main focus is improving my JavaScript, React,
          responsive design, and Git skills. I'm still learning, but each
          project helps me understand more than the last one.
        </p>
      </div>

      <dl className="mt-8 grid gap-5">
        {facts.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-start gap-3">
            <span className="mt-1 shrink-0 text-accent">
              <Icon size={18} aria-hidden="true" />
            </span>

            <div className="min-w-0">
              <dt className="text-sm text-muted">{label}</dt>
              <dd className="break-words font-medium">{value}</dd>
            </div>
          </div>
        ))}
      </dl>
    </Reveal>

    <Reveal delay={0.1}>
      <dl className="grid grid-cols-2 gap-x-8 gap-y-7 sm:gap-x-10">
        {stats.map(({ value, label }) => (
          <div key={label} className="pb-4">
            <dd className="font-display text-4xl font-semibold text-ink">
              {value}
            </dd>

            <dt className="mt-2 text-sm leading-relaxed text-muted">
              {label}
            </dt>
          </div>
        ))}
      </dl>
    </Reveal>
  </div>
</Section>

);
}

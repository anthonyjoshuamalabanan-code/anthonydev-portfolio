import { services } from '../data/site.js';
import Reveal from './Reveal.jsx';
import Section from './Section.jsx';

export default function Services() {
  return (
    <Section
      id="services"
      title="What I can build"
      intro="I am still building my experience, so these are the kinds of projects I am comfortable practicing and taking on."
      className="bg-surface/30"
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(({ title, description, icon: Icon }, i) => (
          <Reveal as="li" key={title} delay={(i % 3) * 0.06} className="card group min-w-0 p-7 transition-colors hover:border-accent/60">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-accent/20 to-accent2/20 text-accent">
              <Icon size={23} aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-muted">{description}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

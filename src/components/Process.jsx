import { processSteps } from '../data/site.js';
import Reveal from './Reveal.jsx';
import Section from './Section.jsx';

export default function Process() {
  return (
    <Section
      id="process"
      title="How I work on a project"
      intro="My process is simple: understand the idea, build it, test it, and learn from what I could improve."
      className="bg-surface/30"
    >
      <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
        {processSteps.map(({ title, description, icon: Icon }, i) => (
          <Reveal as="li" key={title} delay={i * 0.06} className="min-w-0 border-t-2 border-accent/40 pt-6">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-sm font-bold text-onAccent" aria-hidden="true">
                {i + 1}
              </span>
              <Icon size={20} className="text-muted" aria-hidden="true" />
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold">
              <span className="sr-only">Step {i + 1}: </span>
              {title}
            </h3>
            <p className="mt-2 text-muted">{description}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { projects } from '../data/site.js';
import Section from './Section.jsx';

const categories = ['All', ...new Set(projects.map((p) => p.category))];

function ProjectCard({ project }) {
  const { title, description, tags, demo, image, category } = project;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className="min-w-0"
    >
      <article className="card group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-accent/60 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
        <div className="aspect-[600/380] overflow-hidden">
          <img
            src={image}
            alt={`Preview of the ${title} project`}
            width="600"
            height="380"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="text-sm text-accent">{category}</p>

          <h3 className="mt-1 font-display text-xl font-semibold">
            {title}
          </h3>

          <p className="mt-2 flex-1 text-muted">
            {description}
          </p>

          <ul
            className="mt-4 flex flex-wrap gap-2"
            aria-label={`Technologies used in ${title}`}
          >
            {tags.map((tag) => (
              <li key={tag} className="chip">
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex gap-5 border-t border-line pt-4 text-sm font-semibold">
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} live demo (opens in a new tab)`}
              className="inline-flex items-center gap-1.5 text-muted transition hover:text-accent"
            >
              <ExternalLink size={17} aria-hidden="true" />
              Live demo
            </a>
          </div>
        </div>
      </article>
    </motion.li>
  );
}

export default function Projects() {
  const [active, setActive] = useState('All');

  const visible = useMemo(
    () =>
      active === 'All'
        ? projects
        : projects.filter((p) => p.category === active),
    [active],
  );

  return (
    <Section
      id="projects"
      title="My projects"
      intro="A few recent builds. Filter by type to see what is closest to what you need."
    >
      <div
        role="group"
        aria-label="Filter projects by category"
        className="mb-10 flex flex-wrap gap-2"
      >
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={active === category}
            onClick={() => setActive(category)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              active === category
                ? 'border-accent bg-accent text-onAccent'
                : 'border-line text-muted hover:border-accent hover:text-accent'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <p className="sr-only" role="status">
        Showing {visible.length}{' '}
        {visible.length === 1 ? 'project' : 'projects'}
        {active !== 'All' ? ` in ${active}` : ''}
      </p>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </ul>
    </Section>
  );
}
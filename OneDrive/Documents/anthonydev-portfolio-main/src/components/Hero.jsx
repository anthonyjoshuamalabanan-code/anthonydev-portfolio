import { motion } from 'framer-motion';
import { Gauge, Accessibility, Download } from 'lucide-react';
import { profile } from '../data/site.js';
import SocialLinks from './SocialLinks.jsx';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: 'easeOut',
    },
  },
};

const codeLines = [
  'const project = {',
  '  stack: ["HTML", "JavaScript", "Python"],',
  '  goal: "keep learning",',
  '};',
  '',
  'export default project;',
];

function CodeLine({ text }) {
  const parts = text.split(
    /("[^"]*"|\b(?:import|from|export|default|function|const|return)\b)/
  );

  return parts.map((part, i) => {
    if (part.startsWith('"')) {
      return (
        <span key={i} className="text-accent">
          {part}
        </span>
      );
    }

    if (
      /^(import|from|export|default|function|const|return)$/.test(part)
    ) {
      return (
        <span key={i} className="text-accent2">
          {part}
        </span>
      );
    }

    return <span key={i}>{part}</span>;
  });
}

function CodeVisual() {
  return (
    <div
      className="relative mx-auto w-full max-w-md"
      aria-hidden="true"
    >
      <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent/25 via-transparent to-accent2/25 blur-2xl" />

      <div className="card relative overflow-hidden bg-surface/80 backdrop-blur">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400/80" />
          <span className="h-3 w-3 rounded-full bg-amber-400/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/80" />

          <span className="ml-3 font-mono text-xs text-muted">
            Site.jsx
          </span>
        </div>

        <pre className="overflow-hidden px-4 py-5 font-mono text-[12px] leading-7 text-ink sm:text-[13px]">
          {codeLines.map((line, i) => (
            <div key={i} className="flex whitespace-pre">
              <span className="mr-4 w-4 shrink-0 select-none text-right text-muted/60">
                {i + 1}
              </span>

              <span>
                <CodeLine text={line} />
              </span>
            </div>
          ))}
        </pre>
      </div>

      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="card absolute -bottom-5 -left-2 flex items-center gap-2 bg-surface/90 px-3.5 py-2.5 text-sm font-medium backdrop-blur sm:-left-6"
      >
        <Gauge
          size={18}
          className="text-accent"
        />

        Learning by building
      </motion.div>

      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="card absolute -right-2 -top-5 flex items-center gap-2 bg-surface/90 px-3.5 py-2.5 text-sm font-medium backdrop-blur sm:-right-6"
      >
        <Accessibility
          size={18}
          className="text-accent2"
        />

        Responsive design
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="home-title"
      className="relative isolate overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl sm:left-1/4"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-40 -z-10 h-80 w-80 rounded-full bg-accent2/15 blur-3xl"
      />

      <div className="container-x grid items-center gap-16 py-16 sm:py-24 lg:grid-cols-2 lg:py-32">

        {/* LEFT SIDE */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="min-w-0"
        >
          <motion.p
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3.5 py-1.5 text-sm text-muted backdrop-blur"
          >
            <span
              className="h-2 w-2 rounded-full bg-emerald-400 motion-safe:animate-pulse"
              aria-hidden="true"
            />

            {profile.availability}
          </motion.p>

          <motion.h1
            variants={item}
            id="home-title"
            className="mt-6 text-balance text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl"
          >
            Hi, I&apos;m {profile.name}, a Frontend Web Developer
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg text-muted"
          >
            I&apos;m a beginner frontend developer from the Philippines,
            learning by building websites and small projects. I&apos;m focused
            on getting better at JavaScript, React, responsive design, and
            writing cleaner code.
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a
              href="#projects"
              className="btn btn-primary"
            >
              View My Work
            </a>

            <a
              href="#contact"
              className="btn btn-ghost"
            >
              Contact Me
            </a>

           <a
  href="/documents/resume.png"
  target="_blank"
  rel="noopener noreferrer"
  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-surface/60 px-5 py-3 text-sm font-semibold text-ink shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10 hover:text-accent hover:shadow-lg hover:shadow-accent/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
>
  <Download
    size={16}
    className="transition-transform duration-200 group-hover:-translate-y-0.5"
    aria-hidden="true"
  />
  Resume
</a>

<a
  href="/documents/cv.png"
  target="_blank"
  rel="noopener noreferrer"
  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-surface/60 px-5 py-3 text-sm font-semibold text-ink shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10 hover:text-accent hover:shadow-lg hover:shadow-accent/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
>
  <Download
    size={16}
    className="transition-transform duration-200 group-hover:-translate-y-0.5"
    aria-hidden="true"
  />
  CV
</a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-10"
          >
            <SocialLinks />
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.25,
          }}
          className="min-w-0 px-2 sm:px-6"
        >
          <CodeVisual />
        </motion.div>

      </div>
    </section>
  );
}
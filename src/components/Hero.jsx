
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
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

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="home-title"
      className="relative isolate overflow-hidden"
    >
      {/* Background effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl sm:left-1/4"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-40 -z-10 h-80 w-80 rounded-full bg-accent2/15 blur-3xl"
      />

      {/* Main hero content */}
      <div className="container-x grid grid-cols-1 items-center gap-16 py-16 sm:py-24 lg:py-32">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="min-w-0"
        >
          {/* Availability badge */}
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

          {/* Introduction */}
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

          {/* Buttons */}
          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a href="#projects" className="btn btn-primary">
              View My Work
            </a>

            <a href="#contact" className="btn btn-ghost">
              Contact Me
            </a>

            {/* Resume */}
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

            {/* CV */}
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

          {/* Social links */}
          <motion.div variants={item} className="mt-10">
            <SocialLinks />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
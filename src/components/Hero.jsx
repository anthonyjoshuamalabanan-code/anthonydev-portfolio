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
return ( <section
   id="home"
   aria-labelledby="home-title"
   className="relative overflow-hidden"
 > <div className="container-x grid grid-cols-1 items-center gap-12 py-12 sm:py-16 lg:py-20">
<motion.div
variants={container}
initial="hidden"
animate="show"
className="min-w-0"
>
<motion.p
variants={item}
className="inline-flex items-center gap-2 border-b border-line pb-2 text-sm text-muted"
> <span
           className="h-2 w-2 rounded-full bg-accent"
           aria-hidden="true"
         />
{profile.availability}
</motion.p>

```
      <motion.h1
        variants={item}
        id="home-title"
        className="mt-6 text-balance text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl"
      >
        Hi, I&apos;m {profile.name}, a Frontend Web Developer
      </motion.h1>

      <motion.p
        variants={item}
        className="mt-5 max-w-xl text-lg text-muted"
      >
        I&apos;m a beginner frontend developer from the Philippines,
        learning by building websites and small projects. I&apos;m focused
        on getting better at JavaScript, React, responsive design, and
        writing cleaner code.
      </motion.p>

      <motion.div
        variants={item}
        className="mt-7 flex flex-wrap gap-3"
      >
        <a href="#projects" className="btn btn-primary">
          View My Work
        </a>

        <a href="#contact" className="btn btn-ghost">
          Contact Me
        </a>

        <a
          href="/documents/resume.png"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
        >
          <Download size={16} aria-hidden="true" />
          Resume
        </a>

        <a
          href="/documents/cv.png"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
        >
          <Download size={16} aria-hidden="true" />
          CV
        </a>
      </motion.div>

      <motion.div variants={item} className="mt-8">
        <SocialLinks />
      </motion.div>
    </motion.div>
  </div>
</section>

);
}

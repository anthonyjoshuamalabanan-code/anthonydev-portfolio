import { MotionConfig } from 'framer-motion';
import Scenery from './components/Scenery.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Services from './components/Services.jsx';
import Projects from './components/Projects.jsx';
import Process from './components/Process.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Scenery />
      <div className="app-content">
        <a
          href="#main"
          className="skip-link sr-only z-[60] bg-accent px-4 py-2 font-semibold text-onAccent focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Services />
          <Process />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}

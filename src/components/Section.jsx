import Reveal from './Reveal.jsx';

export default function Section({ id, title, intro, className = '', children }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`py-20 sm:py-28 ${className}`}>
      <div className="container-x">
        <Reveal className="mb-12 max-w-2xl">
          <h2 id={`${id}-title`} className="text-3xl font-bold sm:text-4xl">
            {title}
          </h2>
          {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}

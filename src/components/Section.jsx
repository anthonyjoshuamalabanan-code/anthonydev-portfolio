import Reveal from './Reveal.jsx';
import DecoDivider from './DecoDivider.jsx';

export default function Section({ id, title, intro, className = '', children }) {
return (
<section
id={id}
aria-labelledby={`${id}-title`}
className={`scenery-section py-12 sm:py-16 ${className}`}
  >
<div className="container-x">
  <Reveal className="mb-8 max-w-2xl">
    <h2
      id={`${id}-title`}
      className="text-balance text-2xl font-bold uppercase tracking-[0.16em] sm:text-3xl"
    >
      {title}
    </h2>
    <DecoDivider />
    {intro && (
      <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
        {intro}
      </p>
    )}
  </Reveal>
  {children}
</div>
  </section>
);
}

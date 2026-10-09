import Reveal from './Reveal.jsx';

export default function Section({ id, title, intro, className = '', children }) {
return (
<section
id={id}
aria-labelledby={`${id}-title`}
className={`py-12 sm:py-16 ${className}`}
> <div className="container-x"> <Reveal className="mb-8 max-w-2xl">
<h2 id={`${id}-title`} className="text-3xl font-bold sm:text-4xl">
{title} </h2>

```
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

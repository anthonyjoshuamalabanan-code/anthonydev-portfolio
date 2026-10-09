import { skillGroups } from '../data/site.js';
import Reveal from './Reveal.jsx';
import Section from './Section.jsx';

export default function Skills() {
const visibleGroups = skillGroups.filter(
(group) => group.title.toLowerCase() !== 'craft'
);

return ( <Section
   id="skills"
   title="What I am learning"
   intro="These are the tools and skills I am currently practicing through projects. Some are stronger than others, and I am still learning."
 > <div className="grid gap-6 md:grid-cols-3">
{visibleGroups.map((group, i) => (
<Reveal
key={group.title}
delay={i * 0.08}
className="card min-w-0 p-6"
> <h3 className="font-display text-xl font-semibold">
{group.title} </h3>

```
        <ul className="mt-5 grid gap-2">
          {group.items.map(({ name, note, icon: Icon }) => (
            <li
              key={name}
              className="group flex items-center gap-4 rounded-xl border border-transparent p-2.5 transition-colors hover:border-line hover:bg-bg/60"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-onAccent">
                <Icon size={21} aria-hidden="true" />
              </span>

              <div className="min-w-0">
                <p className="font-medium">{name}</p>
                <p className="text-sm text-muted">{note}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    ))}
  </div>
</Section>

);
}

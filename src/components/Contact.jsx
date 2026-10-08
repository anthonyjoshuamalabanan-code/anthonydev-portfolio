import { useRef, useState } from 'react';
import { CalendarCheck, CheckCircle2, MapPin, Send, Mail, TriangleAlert } from 'lucide-react';
import { profile } from '../data/site.js';
import Reveal from './Reveal.jsx';
import Section from './Section.jsx';
import SocialLinks from './SocialLinks.jsx';

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;

const fields = [
  { name: 'name', label: 'Name', type: 'text', autoComplete: 'name', placeholder: 'Jane Cooper' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', placeholder: 'jane@company.com' },
  { name: 'subject', label: 'Subject', type: 'text', autoComplete: 'off', placeholder: 'What are you working on?' },
  { name: 'message', label: 'Message', type: 'textarea', autoComplete: 'off', placeholder: 'Tell me what you want to build or what you need help with.' },
];

const validators = {
  name: (v) => (!v.trim() ? 'Enter your name.' : v.trim().length < 2 ? 'Your name needs at least 2 characters.' : ''),
  email: (v) =>
    !v.trim()
      ? 'Enter your email address.'
      : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
        ? 'Enter a valid email address, like name@example.com.'
        : '',
  subject: (v) => (!v.trim() ? 'Add a subject so I know what this is about.' : v.trim().length < 3 ? 'The subject needs at least 3 characters.' : ''),
  message: (v) =>
    !v.trim()
      ? 'Tell me a little about your project.'
      : v.trim().length < 20
        ? `Add a few more details (${v.trim().length} of 20 characters minimum).`
        : '',
};

const empty = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const refs = useRef({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: validators[name](value) }));
    if (status !== 'idle' && status !== 'sending') setStatus('idle');
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((er) => ({ ...er, [name]: validators[name](value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    fields.forEach(({ name }) => { next[name] = validators[name](values[name]); });
    setErrors(next);
    const firstInvalid = fields.find(({ name }) => next[name]);
    if (firstInvalid) {
      refs.current[firstInvalid.name]?.focus();
      return;
    }

    setStatus('sending');
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(values),
        });
        if (!res.ok) throw new Error('Request failed');
      } else {
        const body = `${values.message}\n\nFrom: ${values.name} (${values.email})`;
        window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`;
      }
      setStatus('success');
      setValues(empty);
      setErrors({});
    } catch {
      setStatus('error');
    }
  };

  const details = [
    { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: MapPin, label: 'Location', value: profile.location },
    { icon: CalendarCheck, label: 'Availability', value: profile.availability },
  ];

  return (
    <Section id="contact" title="Have a project in mind? Let's talk." intro="Tell me what you are building and when you need it. I reply within one working day.">
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.3fr]">
        <Reveal className="min-w-0 space-y-8">
          <div className="card bg-gradient-to-br from-accent/15 to-accent2/15 p-7">
            <h3 className="font-display text-2xl font-semibold">Let&apos;s build something</h3>
            <p className="mt-2 text-muted">If you have a project idea, a website to practice, or a question about what I can build, send me a message.</p>
            <a href={`mailto:${profile.email}`} className="btn btn-primary mt-6">
              <Mail size={18} aria-hidden="true" /> Email me directly
            </a>
          </div>

          <ul className="space-y-5">
            {details.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                  <Icon size={19} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm text-muted">{label}</p>
                  {href ? <a href={href} className="break-words font-medium hover:text-accent">{value}</a> : <p className="break-words font-medium">{value}</p>}
                </div>
              </li>
            ))}
          </ul>
          <SocialLinks />
        </Reveal>

        <Reveal delay={0.1} className="min-w-0">
          <form onSubmit={handleSubmit} noValidate className="card space-y-5 p-6 sm:p-8">
            {fields.map(({ name, label, type, autoComplete, placeholder }) => {
              const error = errors[name];
              const common = {
                id: `contact-${name}`,
                name,
                value: values[name],
                onChange: handleChange,
                onBlur: handleBlur,
                placeholder,
                autoComplete,
                required: true,
                'aria-invalid': error ? 'true' : 'false',
                'aria-describedby': error ? `contact-${name}-error` : undefined,
                ref: (el) => { refs.current[name] = el; },
                className: 'input',
              };
              return (
                <div key={name}>
                  <label htmlFor={`contact-${name}`} className="mb-1.5 block text-sm font-medium">{label}</label>
                  {type === 'textarea' ? <textarea rows={5} {...common} /> : <input type={type} {...common} />}
                  {error && <p id={`contact-${name}-error`} className="error-text">{error}</p>}
                </div>
              );
            })}

            <button type="submit" disabled={status === 'sending'} className="btn btn-primary w-full disabled:opacity-60 sm:w-auto">
              <Send size={18} aria-hidden="true" /> {status === 'sending' ? 'Sending...' : 'Send message'}
            </button>

            <div role="status" aria-live="polite">
              {status === 'success' && (
                <p className="flex items-start gap-2 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0" aria-hidden="true" />
                  {ENDPOINT ? 'Message sent. I will reply within one working day.' : 'Your email app should now open with the message ready to send.'}
                </p>
              )}
              {status === 'error' && (
                <p className="flex items-start gap-2 text-red-600 dark:text-red-400">
                  <TriangleAlert size={20} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <span>The message could not be sent. Check your connection and try again, or email <a className="underline" href={`mailto:${profile.email}`}>{profile.email}</a>.</span>
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

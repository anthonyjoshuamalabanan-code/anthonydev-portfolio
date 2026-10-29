import { useRef, useState } from 'react';
import { CalendarCheck, CheckCircle2, MapPin, Mail, Send, TriangleAlert } from 'lucide-react';
import { profile } from '../data/site.js';
import safeUrl from '../utils/safeUrl.js';
import Reveal from './Reveal.jsx';
import Section from './Section.jsx';
import SocialLinks from './SocialLinks.jsx';

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;
const MAX_LENGTHS = { name: 80, email: 120, subject: 120, message: 2000 };
const THROTTLE_MS = 30_000;
const MAX_SUBMISSIONS = 3;
const MAILTO_MAX_LENGTH = 2000;
const STORAGE_KEY = 'contact-submission-limits';
// Client-side checks are bypassable; configure real rate limiting and spam filtering at the form provider.

const fields = [
  { name: 'name', label: 'Name', type: 'text', autoComplete: 'name', autoCapitalize: 'words', maxLength: MAX_LENGTHS.name, placeholder: 'Anthony Joshua Malabanan' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', autoCapitalize: 'off', spellCheck: false, maxLength: MAX_LENGTHS.email, placeholder: 'you@example.com' },
  { name: 'subject', label: 'Subject', type: 'text', autoComplete: 'off', autoCapitalize: 'sentences', maxLength: MAX_LENGTHS.subject, placeholder: 'What are you working on?' },
  { name: 'message', label: 'Message', type: 'textarea', autoComplete: 'off', autoCapitalize: 'sentences', maxLength: MAX_LENGTHS.message, placeholder: 'Tell me what you want to build or what you need help with.' },
];

const sanitizeField = (value, allowNewlines = false) =>
  value.replace(
    allowNewlines ? /[\u0000-\u0009\u000B-\u001F\u007F-\u009F]/g : /[\u0000-\u001F\u007F-\u009F]/g,
    '',
  );

function readSubmissionLimits() {
  try {
    const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}');
    return {
      count: Number.isInteger(stored.count) && stored.count >= 0 ? stored.count : 0,
      lastAttempt: Number.isFinite(stored.lastAttempt) ? stored.lastAttempt : 0,
    };
  } catch {
    return { count: 0, lastAttempt: 0 };
  }
}

function getHttpsEndpoint(value) {
  if (typeof value !== 'string' || !value.startsWith('https://')) return null;

  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password
      ? url.href
      : null;
  } catch {
    return null;
  }
}

const validators = {
  name: (v) =>
    v.length > MAX_LENGTHS.name
      ? `Your name must be ${MAX_LENGTHS.name} characters or fewer.`
      : !v.trim()
        ? 'Enter your name.'
        : v.trim().length < 2
          ? 'Your name needs at least 2 characters.'
          : '',
  email: (v) =>
    v.length > MAX_LENGTHS.email
      ? `Your email must be ${MAX_LENGTHS.email} characters or fewer.`
      : !v.trim()
        ? 'Enter your email address.'
        : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
          ? 'Enter a valid email address, like name@example.com.'
          : '',
  subject: (v) =>
    v.length > MAX_LENGTHS.subject
      ? `The subject must be ${MAX_LENGTHS.subject} characters or fewer.`
      : !v.trim()
        ? 'Add a subject so I know what this is about.'
        : v.trim().length < 3
          ? 'The subject needs at least 3 characters.'
          : '',
  message: (v) =>
    v.length > MAX_LENGTHS.message
      ? `Your message must be ${MAX_LENGTHS.message} characters or fewer.`
      : !v.trim()
        ? 'Tell me a little about your project.'
        : v.trim().length < 20
          ? `Add a few more details (${v.trim().length} of 20 characters minimum).`
          : '',
};

const empty = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [honeypot, setHoneypot] = useState('');
  const [throttleMessage, setThrottleMessage] = useState('');
  const refs = useRef({});
  const limits = useRef(readSubmissionLimits());
  const endpoint = getHttpsEndpoint(ENDPOINT);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const cleanValue = sanitizeField(value, name === 'message');
    setValues((current) => ({ ...current, [name]: cleanValue }));
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: validators[name](cleanValue) }));
    }
    if (status !== 'idle' && status !== 'sending') setStatus('idle');
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((current) => ({ ...current, [name]: validators[name](sanitizeField(value, name === 'message')) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (honeypot) {
      setStatus('success');
      setValues(empty);
      setErrors({});
      return;
    }

    const cleanValues = {
      name: sanitizeField(values.name),
      email: sanitizeField(values.email),
      subject: sanitizeField(values.subject),
      message: sanitizeField(values.message, true),
    };
    const next = {};
    fields.forEach(({ name }) => { next[name] = validators[name](cleanValues[name]); });
    setErrors(next);
    const firstInvalid = fields.find(({ name }) => next[name]);
    if (firstInvalid) {
      refs.current[firstInvalid.name]?.focus();
      return;
    }

    const now = Date.now();
    const wait = THROTTLE_MS - (now - limits.current.lastAttempt);
    if (wait > 0) {
      setThrottleMessage(`Please wait ${Math.ceil(wait / 1000)} seconds before sending another message.`);
      setStatus('throttled');
      return;
    }
    if (limits.current.count >= MAX_SUBMISSIONS) {
      setThrottleMessage('You have reached the message limit for this session. Please try again in a new session.');
      setStatus('throttled');
      return;
    }

    limits.current = { count: limits.current.count + 1, lastAttempt: now };
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(limits.current));
    } catch {
      // The in-memory limit still applies when session storage is unavailable.
    }

    setStatus('sending');
    try {
      if (endpoint) {
        const controller = new AbortController();
        const timeout = window.setTimeout(() => controller.abort(), 10_000);
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(cleanValues),
            credentials: 'omit',
            referrerPolicy: 'no-referrer',
            signal: controller.signal,
          });
          if (!response.ok) throw new Error('Form submission failed.');
        } finally {
          window.clearTimeout(timeout);
        }
      } else {
        const body = `${cleanValues.message}\n\nFrom: ${cleanValues.name} (${cleanValues.email})`;
        const mailto = safeUrl(`mailto:${profile.email}?subject=${encodeURIComponent(cleanValues.subject)}&body=${encodeURIComponent(body)}`);
        if (mailto.length > MAILTO_MAX_LENGTH) {
          throw new Error('The prepared email is too long.');
        }
        window.location.href = mailto;
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
    <Section id="contact" title="Have a project in mind? Let's talk." intro="I am open to learning opportunities and collaborations. Send me a message or reach out by email.">
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.3fr]">
        <Reveal className="min-w-0 space-y-8">
          <div className="card bg-gradient-to-br from-accent/15 to-accent2/15 p-7">
            <h3 className="font-display text-2xl font-semibold">Let&apos;s build something</h3>
            <p className="mt-2 text-muted">If you have a project idea, a website to practice, or a question about what I can build, send me a message.</p>
            <a href={safeUrl(`mailto:${profile.email}`)} className="btn btn-primary mt-6">
              <Mail size={18} aria-hidden="true" /> Email me directly
            </a>
          </div>

          <ul className="space-y-5">
            {details.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex items-start gap-3">
                <span className="icon-frame mt-0.5 grid h-10 w-10 shrink-0 place-items-center border border-line bg-accent/10 text-accent">
                  <Icon size={19} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm text-muted">{label}</p>
                  {href ? <a href={safeUrl(href)} className="break-words font-medium hover:text-accent">{value}</a> : <p className="break-words font-medium">{value}</p>}
                </div>
              </li>
            ))}
          </ul>
          <SocialLinks />
        </Reveal>

        <Reveal delay={0.1} className="min-w-0">
          <form onSubmit={handleSubmit} noValidate className="card space-y-5 p-6 sm:p-8">
            <div className="honeypot" aria-hidden="true">
              <label htmlFor="contact-website">Website</label>
              <input
                id="contact-website"
                name="website"
                type="text"
                value={honeypot}
                onChange={(event) => setHoneypot(event.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            {fields.map(({ name, label, type, autoComplete, autoCapitalize, spellCheck, maxLength, placeholder }) => {
              const error = errors[name];
              const common = {
                id: `contact-${name}`,
                name,
                value: values[name],
                onChange: handleChange,
                onBlur: handleBlur,
                placeholder,
                autoComplete,
                autoCapitalize,
                spellCheck,
                maxLength,
                required: true,
                'aria-invalid': error ? 'true' : 'false',
                'aria-describedby': error ? `contact-${name}-error` : undefined,
                ref: (element) => { refs.current[name] = element; },
                className: 'input',
              };
              return (
                <div key={name}>
                  <label htmlFor={`contact-${name}`} className="mb-1.5 block text-sm font-medium uppercase tracking-wider">{label}</label>
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
                <p className="flex items-start gap-2 text-success">
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0" aria-hidden="true" />
                  {endpoint ? 'Message sent. I will reply within one working day.' : 'Your email app should now open with the message ready to send.'}
                </p>
              )}
              {status === 'throttled' && (
                <p className="text-muted">{throttleMessage}</p>
              )}
              {status === 'error' && (
                <p className="flex items-start gap-2 text-danger">
                  <TriangleAlert size={20} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <span>The message could not be prepared. Check your email app or email <a className="underline" href={safeUrl(`mailto:${profile.email}`)}>{profile.email}</a>.</span>
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

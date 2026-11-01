import { useState, useRef, useEffect, type FormEvent } from 'react';
import { checkFormRateLimit, recordFormSubmission } from '../lib/rateLimit';

type Errors = Record<string, string>;
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function Field({ error, id, children }: { error?: string; id: string; children: React.ReactNode }) {
  return (
    <>
      {children}
      {error && (
        <div className="text-size-small field-error text-red-400 mt-1 text-xs" id={`${id}-error`} role="alert">
          {error}
        </div>
      )}
    </>
  );
}

const SUCCESS_NOTE = 'Inquiry received! Our studio coordinator will review your dates and reach out within 24 hours.';

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const [rateLimitSeconds, setRateLimitSeconds] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formLoadTime = useRef(Date.now());

  // Check initial rate limit on mount
  useEffect(() => {
    const check = checkFormRateLimit(45);
    if (!check.allowed) {
      setRateLimitSeconds(check.remainingSeconds);
    }
  }, []);

  // Cooldown countdown timer
  useEffect(() => {
    if (rateLimitSeconds <= 0) return;
    const timer = setInterval(() => {
      setRateLimitSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [rateLimitSeconds]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1. Rate Limit Check
    const rateCheck = checkFormRateLimit(45);
    if (!rateCheck.allowed) {
      setRateLimitSeconds(rateCheck.remainingSeconds);
      return;
    }

    const d = new FormData(e.currentTarget);

    // 2. Honeypot Anti-Bot Trap
    if (d.get('_gotcha')) {
      console.warn('Bot submission discarded via honeypot.');
      setDone(true);
      return;
    }

    // 3. Speed-trap verification (rejections under 1.2 seconds)
    if (Date.now() - formLoadTime.current < 1200) {
      console.warn('Bot submission discarded via speed trap.');
      setDone(true);
      return;
    }

    const er: Errors = {};
    const email = String(d.get('email') ?? '').trim();
    if (!email) er.email = 'Please enter your email address.';
    else if (!emailOk(email)) er.email = 'Please enter a valid email address.';
    if (!String(d.get('Subject') ?? '').trim()) er.Subject = 'Please add a subject or event type.';
    if (!String(d.get('Message') ?? '').trim()) er.Message = 'Please describe your dates or requirements.';

    setErrors(er);

    if (Object.keys(er).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setDone(true);
        recordFormSubmission();
        setRateLimitSeconds(45);
      }, 600);
    }
  };

  const p = (k: string) => ({
    'aria-invalid': !!errors[k] || undefined,
    'aria-describedby': errors[k] ? `${k}-error` : undefined,
  });

  return (
    <div className="contact-form-wrapper w-form">
      <div className="form-heading">◉ Ready to start your project?</div>

      {rateLimitSeconds > 0 && (
        <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between">
          <span>Rate limit active: Please wait before sending another inquiry.</span>
          <span className="font-mono font-bold ml-2 px-2 py-0.5 rounded bg-black/40">
            {rateLimitSeconds}s
          </span>
        </div>
      )}

      <form className="contact-form" noValidate onSubmit={submit}>
        {/* Hidden Honeypot Field */}
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          style={{ display: 'none' }}
          aria-hidden="true"
        />

        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          className="form-input w-input"
          maxLength={256}
          name="name"
          type="text"
          id="name"
          autoComplete="name"
          placeholder="Your Full Name"
        />
        <div className="spacer-small"></div>

        <label htmlFor="email" className="form-label">
          Email Address
        </label>
        <Field id="email" error={errors.email}>
          <input
            className="form-input w-input"
            maxLength={256}
            name="email"
            type="email"
            id="email"
            autoComplete="email"
            required
            placeholder="name@domain.com"
            {...p('email')}
          />
        </Field>
        <div className="spacer-small"></div>

        <label htmlFor="Subject" className="form-label">
          Subject / Event Type
        </label>
        <Field id="Subject" error={errors.Subject}>
          <input
            className="form-input w-input"
            maxLength={256}
            name="Subject"
            type="text"
            id="Subject"
            placeholder="e.g. Wedding Cinematography / Commercial"
            required
            {...p('Subject')}
          />
        </Field>
        <div className="spacer-small"></div>

        <label htmlFor="Message" className="form-label">
          Message &amp; Event Dates
        </label>
        <Field id="Message" error={errors.Message}>
          <textarea
            className="form-input is-text-area w-input"
            maxLength={5000}
            name="Message"
            id="Message"
            placeholder="Tell us about your dates, location, and vision..."
            required
            {...p('Message')}
          />
        </Field>
        <div className="spacer-large"></div>

        <button
          type="submit"
          disabled={isSubmitting || rateLimitSeconds > 0}
          className={`button w-button w-full sm:w-auto transition-all ${
            rateLimitSeconds > 0
              ? 'opacity-50 cursor-not-allowed bg-neutral-800'
              : 'hover:brightness-110'
          }`}
        >
          {isSubmitting
            ? 'Transmitting...'
            : rateLimitSeconds > 0
            ? `Cooldown (${rateLimitSeconds}s)`
            : 'Send Message'}
        </button>
      </form>

      {done && (
        <div className="form-message-success w-form-done mt-4" style={{ display: 'block' }} role="status">
          <div className="text-amber-400 font-semibold mb-1">Message Sent Successfully</div>
          <div className="text-sm text-neutral-300">{SUCCESS_NOTE}</div>
        </div>
      )}
    </div>
  );
}

export function NewsletterForm({ id }: { id?: string }) {
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [rateLimitSeconds, setRateLimitSeconds] = useState(0);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rateLimitSeconds > 0) return;

    const email = String(new FormData(e.currentTarget).get('email') ?? '').trim();
    const msg = !email
      ? 'Please enter your email address.'
      : !emailOk(email)
      ? 'Please enter a valid email address.'
      : '';
    setError(msg);

    if (!msg) {
      setDone(true);
      setRateLimitSeconds(30);
      const timer = setInterval(() => {
        setRateLimitSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  return (
    <div id={id} className="newsletter-form-wrapper w-form">
      <form className="newsletter-form" noValidate onSubmit={submit}>
        <div className="input-wrap">
          <label htmlFor="nl-name" className="form-label">
            Name
          </label>
          <input
            className="form-input w-input"
            maxLength={256}
            name="name"
            type="text"
            id="nl-name"
            autoComplete="name"
          />
        </div>
        <div className="input-wrap">
          <label htmlFor="nl-email" className="form-label">
            Email
          </label>
          <input
            className="form-input w-input"
            maxLength={256}
            name="email"
            type="email"
            id="nl-email"
            autoComplete="email"
            required
            aria-invalid={!!error || undefined}
            aria-describedby={error ? 'nl-error' : undefined}
          />
          {error && (
            <div className="text-size-small field-error" id="nl-error" role="alert">
              {error}
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={rateLimitSeconds > 0}
          className="button is-form-submit w-button"
        >
          {rateLimitSeconds > 0 ? `Wait ${rateLimitSeconds}s` : 'Subscribe'}
        </button>
      </form>
      {done && (
        <div className="form-message-success w-form-done" style={{ display: 'block' }} role="status">
          <div>Subscribed! You will receive our latest stories and production updates.</div>
        </div>
      )}
    </div>
  );
}

export function StyleGuideForm() {
  const [checked, setChecked] = useState(true);
  const [radio, setRadio] = useState(false);
  return (
    <div className="form-component w-form">
      <form className="form-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-field-wrapper">
          <label htmlFor="First-Name" className="form-label">Text Input</label>
          <input className="form-input w-input" maxLength={256} name="First-Name" placeholder="First Name" type="text" id="First-Name" />
        </div>
        <div className="form-field-wrapper">
          <label htmlFor="sg-message" className="form-label">Text Area</label>
          <textarea id="sg-message" name="Message" maxLength={5000} placeholder="Message" className="form-input is-text-area w-input" />
        </div>
        <div className="form-field-wrapper">
          <label htmlFor="Select" className="form-label">Select field</label>
          <select id="Select" name="Select" className="form-input is-select-input w-select" defaultValue="">
            <option value="">Select one...</option>
            <option value="First">First Choice</option>
            <option value="Second">Second Choice</option>
            <option value="Third">Third Choice</option>
          </select>
        </div>
        <div className="form-field-wrapper">
          <span className="form-label">Checkbox field</span>
          <label className="w-checkbox form-checkbox">
            <div className={`w-checkbox-input w-checkbox-input--inputType-custom form-checkbox-icon${checked ? ' w--redirected-checked' : ''}`}></div>
            <input type="checkbox" name="Checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} style={{ opacity: 0, position: 'absolute', zIndex: -1 }} />
            <span className="form-checkbox-label w-form-label">Checkbox</span>
          </label>
        </div>
        <div className="form-field-wrapper">
          <span className="form-label">Radio button</span>
          <label className="form-radio w-radio">
            <div className={`w-form-formradioinput w-form-formradioinput--inputType-custom form-radio-icon w-radio-input${radio ? ' w--redirected-checked' : ''}`}></div>
            <input type="radio" name="Radio" checked={radio} onChange={() => setRadio(true)} style={{ opacity: 0, position: 'absolute', zIndex: -1 }} />
            <span className="form-radio-label w-form-label">Radio</span>
          </label>
        </div>
        <input type="submit" className="button is-form-submit w-button" value="Submit" />
      </form>
    </div>
  );
}

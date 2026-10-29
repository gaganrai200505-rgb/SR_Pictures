import { useState, type FormEvent } from 'react';

type Errors = Record<string, string>;
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function Field({ error, id, children }: { error?: string; id: string; children: React.ReactNode }) {
  return (
    <>
      {children}
      {error && (
        <div className="text-size-small field-error" id={`${id}-error`} role="alert">
          {error}
        </div>
      )}
    </>
  );
}

const DEMO_NOTE = 'Thanks! Your entries are valid, but this recreation has no backend connected, so nothing was sent.';

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const er: Errors = {};
    const email = String(d.get('email') ?? '').trim();
    if (!email) er.email = 'Please enter your email address.';
    else if (!emailOk(email)) er.email = 'Please enter a valid email address.';
    if (!String(d.get('Subject') ?? '').trim()) er.Subject = 'Please add a subject.';
    if (!String(d.get('Message') ?? '').trim()) er.Message = 'Please write a message.';
    setErrors(er);
    setDone(Object.keys(er).length === 0);
  };
  const p = (k: string) => ({ 'aria-invalid': !!errors[k] || undefined, 'aria-describedby': errors[k] ? `${k}-error` : undefined });
  return (
    <div className="contact-form-wrapper w-form">
      <div className="form-heading">◉ Ready to start your project?</div>
      <form className="contact-form" noValidate onSubmit={submit}>
        <label htmlFor="name" className="form-label">Name</label>
        <input className="form-input w-input" maxLength={256} name="name" type="text" id="name" autoComplete="name" />
        <div className="spacer-small"></div>
        <label htmlFor="email" className="form-label">Email Address</label>
        <Field id="email" error={errors.email}>
          <input className="form-input w-input" maxLength={256} name="email" type="email" id="email" autoComplete="email" required {...p('email')} />
        </Field>
        <div className="spacer-small"></div>
        <label htmlFor="Subject" className="form-label">Subject</label>
        <Field id="Subject" error={errors.Subject}>
          <input className="form-input w-input" maxLength={256} name="Subject" type="text" id="Subject" required {...p('Subject')} />
        </Field>
        <div className="spacer-small"></div>
        <label htmlFor="Message" className="form-label">Message</label>
        <Field id="Message" error={errors.Message}>
          <textarea className="form-input is-text-area w-input" maxLength={5000} name="Message" id="Message" required {...p('Message')} />
        </Field>
        <div className="spacer-large"></div>
        <input type="submit" className="button w-button" value="Send Message" />
      </form>
      {done && (
        <div className="form-message-success w-form-done" style={{ display: 'block' }} role="status">
          <div>{DEMO_NOTE}</div>
        </div>
      )}
    </div>
  );
}

export function NewsletterForm({ id }: { id?: string }) {
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get('email') ?? '').trim();
    const msg = !email ? 'Please enter your email address.' : !emailOk(email) ? 'Please enter a valid email address.' : '';
    setError(msg);
    setDone(!msg);
  };
  return (
    <div id={id} className="newsletter-form-wrapper w-form">
      <form className="newsletter-form" noValidate onSubmit={submit}>
        <div className="input-wrap">
          <label htmlFor="nl-name" className="form-label">Name</label>
          <input className="form-input w-input" maxLength={256} name="name" type="text" id="nl-name" autoComplete="name" />
        </div>
        <div className="input-wrap">
          <label htmlFor="nl-email" className="form-label">Email</label>
          <input className="form-input w-input" maxLength={256} name="email" type="email" id="nl-email" autoComplete="email" required aria-invalid={!!error || undefined} aria-describedby={error ? 'nl-error' : undefined} />
          {error && <div className="text-size-small field-error" id="nl-error" role="alert">{error}</div>}
        </div>
        <input type="submit" className="button is-form-submit w-button" value="Subscribe" />
      </form>
      {done && (
        <div className="form-message-success w-form-done" style={{ display: 'block' }} role="status">
          <div>{DEMO_NOTE}</div>
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


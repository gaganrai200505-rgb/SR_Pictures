import { useState, type FormEvent } from 'react';
import Video from '../components/Video';
import { heroBackground } from '../data/media';

/** Protected page template. No backend exists, so every password is rejected honestly. */
export default function Protected() {
  const [error, setError] = useState(false);
  const submit = (e: FormEvent) => { e.preventDefault(); setError(true); };
  return (
    <div className="utility-page-wrap">
      <div className="background-wrapper">
        <div className="background-video-wrapper">
          <Video className="background-video" poster={heroBackground.poster} src={heroBackground.src} />
          <div className="video-opacity"></div>
        </div>
      </div>
      <div className="utility-page-content">
        <form className="utility-page-form" onSubmit={submit}>
          <div className="utility-icon"></div>
          <h1 className="utility-page-title">Protected Page</h1>
          <div className="spacer-small"></div>
          <label htmlFor="pass">Password</label>
          <div className="spacer-xsmall"></div>
          <input className="form-input w-input" name="pass" type="password" id="pass" required />
          <div className="spacer-xsmall"></div>
          <input type="submit" className="button w-button" value="Submit" />
          {error && <div className="form-message-error w-form-fail" style={{ display: 'block' }} role="alert"><div>Incorrect password. Please try again.</div></div>}
        </form>
      </div>
    </div>
  );
}

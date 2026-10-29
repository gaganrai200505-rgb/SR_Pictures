import { Link } from 'react-router-dom';
import Video from '../components/Video';
import { heroBackground } from '../data/media';

export default function NotFound() {
  return (
    <div className="utility-page-wrap">
      <div className="utility-page-content">
        <div className="utility-icon"></div>
        <h1 className="utility-page-title">Page Not Found</h1>
        <div className="spacer-xsmall"></div>
        <div>The page you are looking for doesn't exist or has been moved</div>
        <div className="spacer-small"></div>
        <Link to="/" className="button w-button">Go Home</Link>
      </div>
      <div className="background-wrapper">
        <div className="background-video-wrapper">
          <Video className="background-video" poster={heroBackground.poster} src={heroBackground.src} />
          <div className="video-opacity"></div>
        </div>
      </div>
    </div>
  );
}

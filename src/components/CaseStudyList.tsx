import { Link } from 'react-router-dom';
import { caseArrow, caseArrow2 } from '../data/icons';
import { caseStudyItemIds, projects, type Project } from '../data/projects';
import Video from './Video';

function Arrow({ d, cls }: { d: string; cls: string }) {
  return (
    <div className={`case-arrow ${cls} w-embed`} aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d={d}></path>
      </svg>
    </div>
  );
}

function Card({ project, ids }: { project: Project; ids: string[] }) {
  return (
    <div className="w-dyn-list">
      <div role="list" className="w-dyn-items">
        <div role="listitem" className="w-dyn-item">
          <Link to={`/project/${project.slug}`} className="case-study-link w-inline-block" aria-label={`${project.name}, ${project.year} – view case study`}>
            <div className="case-study-wrapper">
              <div className="background-glass case-study"></div>
              <div className="case-study-container">
                <div className="video-wrapper">
                  <Video className="case-video" poster={project.poster} src={project.video} />
                  <div className="case-logo-wrap">
                    <div className="case-logo-block">
                      <img className="case-logo" src={project.logo} alt="" loading="lazy" />
                      <img className="case-logo" src={project.logo} alt="" loading="lazy" />
                    </div>
                    <div className="case-study-overlay"></div>
                  </div>
                </div>
              </div>
              <div className="w-layout-grid case-study-content-grid">
                <div id={ids[0]} className="case-study-item">
                  <div className="text-size-medium text-style-allcaps">{project.name}</div>
                  <div className="text-size-medium" aria-hidden="true">
                    •
                  </div>
                  <div className="text-size-medium text-color-secondary">{project.year}</div>
                </div>
                <div id={ids[1]} className="case-study-item">
                  <div className="case-arrow-wrap">
                    <div className="case-arrow-block">
                      <Arrow d={caseArrow} cls="_01" />
                      <Arrow d={caseArrow2} cls="_02" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

/** Two rows of two case study cards, driven by the projects collection. */
export default function CaseStudyList() {
  const rows = [projects.slice(0, 2), projects.slice(2, 4)];
  return (
    <div className="case-study-component">
      {rows.map((row, r) => (
        <div className={`case-study-block _0${r + 1}`} key={r}>
          <div className="w-layout-grid case-study-component-grid">
            {row.map((p, i) => (
              <Card key={p.slug} project={p} ids={caseStudyItemIds[r * 2 + i]} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

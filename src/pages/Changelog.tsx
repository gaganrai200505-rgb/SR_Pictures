
export default function Changelog() {
  return (
    <>
    <div id="top" className="top"></div>
    <header className="section-changelog-header">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-top-header">
            <div className="spacer-xlarge"></div>
            <h1 className="heading-style-h2 text-align-center">Changelog</h1>
            <div className="spacer-medium"></div>
            <div className="max-width-medium align-center">
              <div className="text-align-center">
                <p className="text-size-medium text-color-secondary">The latest updates and enhancements to SR Pictures.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <section className="section-changelog-content">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="spacer-xlarge"></div>
            <div className="changelog-content-flex">
              <p className="text-size-regular">{"◉ Updates"}</p>
              <div className="changelog-flex">
                <p className="text-size-regular text-weight-semibold">(Jan 2026)</p>
                <ul role="list" className="list">
                  <li className="list-item">
                    <div className="text-size-regular">Initial Version 1.0 Release</div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="spacer-xlarge"></div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

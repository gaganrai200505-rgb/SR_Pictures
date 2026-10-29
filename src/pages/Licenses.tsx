import LinkButton from '../components/LinkButton';

export default function Licenses() {
  return (
    <>
    <div id="top" className="top"></div>
    <header className="section-licenses-header">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-top-header">
            <div className="spacer-medium"></div>
            <h1 className="heading-style-h2 text-align-center">Licenses</h1>
            <div className="spacer-small"></div>
            <div className="max-width-medium align-center">
              <div className="text-align-center">
                <p className="text-size-medium text-color-secondary">All graphical assets in this template are licensed for personal and commercial use. If you'd like to use a specific asset, please check the license below.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <section className="section-licenses-content">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="licenses-content">
              <div className="licenses-content-item">
                <h2 className="heading-style-h3">Images</h2>
                <div className="spacer-medium"></div>
                <div className="max-width-large">
                  <div className="text-color-secondary">
                    <p className="text-size-medium text-align-center">The images in this template are from Freepik and created with AI, and are available for commercial use free of charge. See the licenses below for more information:</p>
                  </div>
                </div>
                <ul role="list" className="licenses-list-wrapper">
                  <li className="list-item">
                    <div className="w-layout-hflex">
                      <LinkButton to="https://www.freepik.com/legal/terms-of-use" external>Freepik</LinkButton>
                    </div>
                  </li>
                  <li className="list-item">
                    <div className="w-layout-hflex">
                      <LinkButton to="https://labs.google/fx/tools/image-fx" external>Image FX</LinkButton>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="spacer-huge"></div>
              <div className="licenses-content-item">
                <h2 className="heading-style-h3">Fonts</h2>
                <div className="spacer-medium"></div>
                <div className="max-width-large">
                  <div className="text-align-center">
                    <p className="text-size-medium text-color-secondary">The font used in this template (Overused Grotesk) is free to use and available for commercial use. Please refer to the font license below for more information.</p>
                  </div>
                </div>
                <ul role="list" className="licenses-list-wrapper">
                  <li className="list-item">
                    <div className="w-layout-hflex">
                      <LinkButton to="https://befonts.com/overused-grotesk-font-family.html" external>Overused Grotesk</LinkButton>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="spacer-huge"></div>
              <div className="licenses-content-item">
                <h2 className="heading-style-h3">Icons</h2>
                <div className="spacer-medium"></div>
                <div className="max-width-large">
                  <div className="text-align-center">
                    <p className="text-size-medium text-color-secondary">The icons featured in this model come from the Remix Icon collection. See the license below for more information:</p>
                  </div>
                </div>
                <ul role="list" className="licenses-list-wrapper">
                  <li className="list-item">
                    <div className="w-layout-hflex">
                      <LinkButton to="https://remixicon.com/license" external>Remix Icon</LinkButton>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

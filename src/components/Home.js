import React, { useState } from 'react';
import { contentData } from '../data/content-data';
import { TutorialsCard, EcosystemSection } from '.';

function Home() {
  return (
    <div className="bootstrap-wrapper">
      <div className="section-divider"></div>
      <div className="container">
        <div className="row">
          <div className="index-page exclude">
            <section className="section container-fluid">
              <div className="row justify-content-between">
                <h1 className="landing-page-h1">
                  <a href="https://www.availproject.org/">Avail</a> Developer
                  Docs
                </h1>
              </div>
            </section>
          </div>
        </div>
        <div className="justify-content-center tutorial-cards card-container">
          {contentData.linksCard.map((props, idx) => (
            <TutorialsCard key={idx} {...props} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

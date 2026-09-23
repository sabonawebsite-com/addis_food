import React from 'react';
import './About.css';
import { devabout } from '../../devinfo/devinfo';
const About = () => {
  return (
    <>
      <h1 id="main-text">Developer Info</h1>
      <div className="dev-info">
        {devabout.map(({ image, name, About, email, web, github }, index) => (
          <div key={index} className="dev-display">
            <img src={image} alt="" className="dev-image" />
            <div className="dev-info">
              <p className="name-dev">{name}</p>
              <p className="dev-about"> {About}</p>
              <p className="dev-email">email: {email}</p>
              <button className="dev-website">
                <a href={web}>➡️My website</a>
              </button>
              <button className="dev-github">
                <a href={github}>➡️My github</a>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default About;
import React from 'react';
import './stylesheets/styles.scss';


const Footer = () => {
  return(
    <footer className=" footer d-flex flex-column flex-sm-row justify-content-between mt-5 pt-3">
      <p className="mb-0">Full Stack Twitter Clone</p>
      <div className="d-flex social-links align-items-center">
        <a href="https://www.linkedin.com/in/javid-alakbarli-3a78b7232/" target="_blank" rel="noferrer noopener">
        Linkedin
        </a>
        <a href="https://github.com/JavidBaku1991" target="_blank" rel="noferrer noopener">
        Github
        </a>
        <a href="https://www.facebook.com/cavid.baku.7/" target="_blank" rel="noferrer noopener">Facebook
        </a>
      </div>
    </footer>
  )
}

export default Footer;
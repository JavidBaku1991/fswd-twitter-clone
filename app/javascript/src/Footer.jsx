import React from 'react';
import './stylesheets/styles.scss';
// import '@fortawesome/fontawesome-free';
// import logo from '../src/images/favicon.ico'


const Footer = () => {
  return(
    <footer className="d-flex flex-column flex-sm-row justify-content-between mt-5 pt-3">
      <p className="mb-0">Full Stack Twitter Clone</p>
      <div className="d-flex social-links align-items-center">
        <a href="https://www.joannaredihough.com/" target="_blank" rel="noferrer noopener">
          {/* <img width="20" height="20" src={logo}></img> */}
        </a>
        <a href="https://github.com/jonars99" target="_blank" rel="noferrer noopener">
          {/* <i className="fa-brands fa-github-alt"></i> */}
        </a>
        <a href="https://www.linkedin.com/in/joanna-redihough-profile/" target="_blank" rel="noferrer noopener">
          {/* <i className="fa-brands fa-linkedin"></i> */}
        </a>
      </div>
    </footer>
  )
}

export default Footer;
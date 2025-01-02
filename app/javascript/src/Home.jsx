import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { createUser, logInUser, authenticateUser } from '../packs/requests';
import './stylesheets/home.scss';
import './stylesheets/styles.scss';

const Home = () => {
  const [signUpMessage, setSignUpMessage] = useState("");
  const [logInMessage, setLogInMessage] = useState("");

  const newUsernameRef = useRef(null);
  const newEmailRef = useRef(null);
  const newPasswordRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSignUp = (event) => {
    event.preventDefault();
    const username = newUsernameRef.current.value;
    const email = newEmailRef.current.value;
    const password = newPasswordRef.current.value;
    createUser(username, email, password, function (response) {
      if (response.success === false) {
        setSignUpMessage(response.error);
      } else {
        setSignUpMessage("Cool, you can log in now!");
        newUsernameRef.current.value = '';
        newEmailRef.current.value = '';
        newPasswordRef.current.value = '';
      }
    });
  };

  const handleLogIn = (event) => {
    event.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    logInUser(username, password, function (response) {
      if (response.success === true) {
        window.location.assign('/feed');
      } else {
        setLogInMessage("Error logging in. Please try again");
      }
    });
  };

  // Go to feed if user is logged in
  useEffect(() => {
    authenticateUser(function (response) {
      if (response.authenticated === true) {
        window.location.assign('/feed');
      }
    });
  }, []);

  return (
    <div id="homePage" className="container-fluid">
      <div className="row">
        <div id="homeLeft" className="col-6 d-none d-lg-flex px-0">
          {/* <img className="img-fluid p-4 ps-0" src={image} alt="graffiti wall art image"></img> */}
        </div>

        <div className="col-12 col-lg-6 fw-bold p-4 home-wrapper">
          <div className="twitter-icon text-center text-lg-start">
            {/* <i className="fa-brands fa-twitter"></i> */}
          </div>
          <div className="my-3 mb-5 mb-lg-3">
            <h1 className="my-3">Happening Now</h1>
            <h3>Join Twitter today.</h3>
          </div>

          <div className="row flex-column flex-sm-row text-center">
            <div className="col-12 col-md-6 d-flex">
              <form onSubmit={handleSignUp} className="home-page-forms d-flex flex-column justify-content-around w-100 p-4">
                <p className="heading">Create your account</p>
                <div>
                  <label htmlFor="newUsernameInput" className="form-label" hidden>Username</label>
                  <input type="text" className="form-control" id="newUsernameInput" placeholder="username" minLength="3" required ref={newUsernameRef}></input>
                </div>
                <div>
                  <label htmlFor="newEmailInput" className="form-label" hidden>Email address</label>
                  <input type="email" className="form-control" id="newEmailInput" placeholder="email" required ref={newEmailRef}></input>
                </div>
                <div>
                  <label htmlFor="newPasswordInput" className="form-label" hidden>Password</label>
                  <input type="password" className="form-control" id="newPasswordInput" placeholder="password" minLength="8" required ref={newPasswordRef}></input>
                </div>
                <button type="submit" className="btn mt-4 mt-lg-4">Sign up</button>
                <p className="form-message my-2">
                  {signUpMessage}
                </p>
              </form>
            </div>

            <div className="col-12 col-md-6 d-flex my-4 my-md-0">
              <form onSubmit={handleLogIn} className="home-page-forms d-flex flex-column justify-content-around w-100 p-4">
                <p className="heading">Already have an account?</p>
                <div>
                  <label htmlFor="usernameInput" className="form-label" hidden>Username</label>
                  <input type="text" className="form-control" id="usernameInput" placeholder="username" required ref={usernameRef}></input>
                </div>
                <div>
                  <label htmlFor="passwordInput" className="form-label" hidden>Password</label>
                  <input type="password" className="form-control mb-0 mb-md-3" id="passwordInput" placeholder="password" required ref={passwordRef}></input>
                </div>
                <button type="submit" className="btn mt-4 mt-md-2 mt-lg-0">Log In</button>
                <p className="form-message m-0 p-0">
                  {logInMessage}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div'))
  );
});
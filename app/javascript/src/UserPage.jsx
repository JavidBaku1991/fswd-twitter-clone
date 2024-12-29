import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { getUsersTweets, deleteTweet } from '../packs/requests';
import Navbar from './Navbar';
import './stylesheets/home.scss';
import './stylesheets/styles.scss';
import { getCurrentUser, countUsersTweets } from '../packs/utils';
import Footer from './Footer';

const UserPage = () => {

  //    states

  const [usersTweets, setUsersTweets] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [tweetCount, setTweetCount] = useState(0);

  //    the clicked user 

  const username = window.location.pathname.replace('/', '');

  //    map users tweets to state

  const listUserTweets = function (response) {
    setUsersTweets(response.tweets.map(tweet => tweet));
  };

  //    handlers 

  const deleteTweetHandler = function (event) {
    var id = event.target.dataset.id;
    deleteTweet(id, function () {
      getUsersTweets(username, listUserTweets);
      countUsersTweets(username, setTweetCount);
    });
  };

  //    get user and users tweets on page load

  useEffect(() => {
    getCurrentUser(function (response) {
      setCurrentUser(response.username);
      countUsersTweets(username, setTweetCount);
    });
    getUsersTweets(username, listUserTweets);
  }, []);

  return (
    <div className="container mb-5">
      <Navbar />
      <div id="userFeed" className="container row mt-1">

        <div className="py-2 ms-3 ms-xl-0">
          <a href="/feed" className="back-to-feed">
            <i className="fa-solid fa-arrow-left fs-4"></i>
          </a>
        </div>

        <div className="col-12 col-xl-3">

          <div className="row justify-content-around">

            <div className="col-5 col-xl-12 username-box">
              <ul className="p-0 py-2 py-xxl-3 ps-xxl-2 m-0">
                <li className="title fw-bold">{username}</li>
                <a href={"/" + username}>@{username}</a>
                <ul className="px-0 mt-1 user-stats">
                  <li>TWEETS
                    <a href={"/" + username} className="d-md-flex ps-4 ps-md-0 user-stats-tweets">{tweetCount}</a>
                  </li>
                  <li>FOLLOWING 
                    <span className="d-md-flex">0</span>
                  </li>
                  <li>FOLLOWERS 
                    <span className="d-md-flex">0</span>
                  </li>
                </ul>
              </ul>
            </div>

            <div className="col-5 col-xl-12 my-xl-3 explore-box">
              <ul className="p-2 py-xxl-3 m-0">
                <li className="title fw-bold">#Explore</li>
                <ul className="ps-0 ps-md-2 explore-tags">
                  <li>#WorldHealthDay</li>
                  <li>#Rails</li>
                  <li>#MathsInFilmOrSong</li>
                  <li>#ror</li>
                  <li>#etc</li>
                </ul>
              </ul>
            </div>

          </div>

        </div>

        <div className="col-12 col-xl-6 twitter-feed px-md-4 my-4 my-xl-0">

          <div className="tweet-list">

            {usersTweets.map(tweet => {
              if (tweet.username === currentUser) {
                return (
                  <div className="tweet p-3 pb-0" key={tweet.id}>
                    <p className="fw-bold d-inline">{tweet.username}</p>
                    <a href={'/' + tweet.username} className="fw-light ps-1">@{tweet.username}</a>
                    <p className="d-inline date ps-1">{tweet.created_at}</p>
                    <p className="pt-3 fw-light">{tweet.message}</p>
                    <div className="img-wrapper px-md-4">
                      <img className="pb-1 tweet-image" src={tweet.image}></img>
                    </div>
                    <button className="btn btn-sm d-flex ms-auto delete-btn" data-id={tweet.id} onClick={deleteTweetHandler}>Delete</button>
                  </div>
                )
              }
              else {
                return (
                  <div className="tweet pb-4 p-3" key={tweet.id}>
                    <p className="fw-bold d-inline">{tweet.username}</p>
                    <a href={'/' + tweet.username} className="fw-light ps-1">@{tweet.username}</a>
                    <p className="d-inline date ps-1">{tweet.created_at}</p>
                    <p className="pt-3 fw-light">{tweet.message}</p>
                    <div className="img-wrapper px-md-4">
                      <img className="pb-1 tweet-image" src={tweet.image}></img>
                    </div>
                  </div>
                )
              }
            })}
            
          </div>
        </div>

        <div className="col-3 d-none d-xl-block p-0">
          <form>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
              <input className="form-control search" type="search" placeholder="Search" aria-label="Search"/>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <UserPage />,
    document.body.appendChild(document.createElement('div'))
  )
});
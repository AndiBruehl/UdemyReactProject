import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { getAuth } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

import './SideBar.css'
import pImg from '../assets/profilePic.jpg'

const SideBar = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    const auth = getAuth();
    auth.signOut().then(() => navigate("/"));
  };

  useEffect(() => {
   
    getAuth().onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
      }
    });
  }, [navigate]);

  return (
    <div className='sidebar'>
      <Link to="/impressum_" style={{ fontSize: "25px", position: "absolute", bottom: "5rem", left: "7.5rem", color: "white", textDecoration: "none" }}>
        Impressum
      </Link>
      <Link to="/" onClick={logoutHandler} style={{ fontSize: "25px", position: "absolute", bottom: "10rem", left: "7.5rem", color: "white", textDecoration: "none" }}>
        Abmelden
      </Link>
      <div className='user-profile'>
        <img className='profile-img' alt="profilepic" src={pImg} />
        <h3 className='username'>Dein Arbeitsbereich</h3>
      </div>
      <div className='divider'></div>
      <div className='sidebar-content'>
        <Link to='/dashboard' className='sidebar-link'>
          <FontAwesomeIcon className='sidebar-icon' icon={faClipboard} />
          <p className='sidebar-text'>Dashboard</p>
        </Link>
        <Link to='/create-link' className='sidebar-link'>
          <FontAwesomeIcon className='sidebar-icon' icon={faScrewdriverWrench} />
          <p className='sidebar-text'>Neues Projekt</p>
        </Link>
      </div>
    </div>
  );
}

export default SideBar;

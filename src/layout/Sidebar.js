import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

import './SideBar.css'
import pImg from '../assets/profilePic1.png'

const SideBar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState(pImg);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getFirestore();
      const userRef = doc(db, "users", user.uid);

      getDoc(userRef)
        .then((doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            setUserName(userData.name);

            if (userData.profilePicture) {
              setProfilePic(userData.profilePicture);
            }
          } else {
            console.log("No user data found");
          }
        })
        .catch((error) => {
          console.error("Error getting user data:", error);
        });
    }
  }, []);

  const logoutHandler = () => {
    const auth = getAuth();
    auth.signOut().then(() => navigate("/"));
  };

  return (
    <div className='sidebar'>
      <Link to="/impressum_" style={{ fontSize: "25px", position: "absolute", bottom: "5rem", left: "7.5rem", color: "white", textDecoration: "none" }}>
        Impressum
      </Link>
      <Link to="/" onClick={logoutHandler} style={{ fontSize: "25px", position: "absolute", bottom: "10rem", left: "7.5rem", color: "white", textDecoration: "none" }}>
        Abmelden
      </Link>
      <div className='user-profile'>
        <img className='profile-img' alt="profilepic" src={profilePic} />
        <h3 className='username'>ProjectHub{userName}</h3>
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

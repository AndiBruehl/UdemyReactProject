import React, { useState } from "react";
import "./UserItem.css";
import ReactModal from "react-modal";
import defaultProfilePicture from "../assets/profilePic.jpg";

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    borderRadius: "20px",
    width: "500px",
    height: "200px",
    margin: "auto",
    textAlign: "center",
    padding: "20px",
    fontSize: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
};

const UserItem = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    if (!modalIsOpen) {
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const profilePictureURL =
    props.user.photoURL || props.user.profilePictureURL || defaultProfilePicture;

  return (
    <div className="user">
      <div className="useritem">
        <img className="useritem-img" src={profilePictureURL} alt={props.user.displayName} />
        <p className="useritem-name">
          <span className="useritem-link" onClick={openModal} style={{ cursor: "pointer", textDecoration: "none" }}>
            {props.user.displayName}
          </span>
        </p>
        <ReactModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="User Details Modal"
          style={modalStyles}
        >
          <h2>{props.user.displayName}</h2>
          <p>Email: {props.user.email}</p>
        </ReactModal>
      </div>
    </div>
  );
};

export default UserItem;

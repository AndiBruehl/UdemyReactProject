import React, { useState } from "react";
import "./UserItem.css";
import Modal from "react-modal";
import defaultProfilePicture from "../assets/profilePic.jpg"; // Import des Standardbildes

// Stil für das Modal
const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Hintergrund ausgrauen
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    borderRadius: "20px",
    width: "300px",
    height: "150px",
    margin: "auto",
    textAlign: "center",
    padding: "20px",
    fontSize: "20px", // Doppelt so große Schrift
  },
};

const UserItem = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
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
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="User Details Modal"
          style={modalStyles} // Übergebe den Stil an das Modal
        >
          <h2>{props.user.displayName}</h2>
          <p>Email:</p>
          <p> {props.user.email}</p>
        </Modal>
      </div>
    </div>
  );
};

export default UserItem;

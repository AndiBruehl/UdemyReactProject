import "./ProjectItem.css";
import Card from "../layout/Card";
import { firestore_db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root"); // Setze das App-Element für react-modal

const ProjectItem = (props) => {

    const [user, setUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (props.assignedTo) {
            const docRef = doc(firestore_db, "users", props.assignedTo);
            getDoc(docRef).then((resp) => setUser(resp.data()));
        }
    }, [props.assignedTo]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <Card className="projectitem" onClick={openModal}>
                <h1 className="projectitem-title">{props.title}</h1>
                <h2 className="projectitem-subtitle">
                    Zeit bis zum {new Date(props.date).toLocaleDateString("de-DE")}
                </h2>
                <div>
                    <div className="divider"></div>
                    <h3 className="projectitem-task-title">Aufgabe für:</h3>
                    <div className="projectitem-task-container">
                        {user ? <p>{user.displayName}</p> : <p>Lade Username...</p>}
                    </div>
                </div>
            </Card>
            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                    },
                    content: {
                        width: "500px",
                        height: "500px",
                        borderRadius: "20px",
                        margin: "0 auto",
                        marginTop: "50px",
                        padding: "20px",
                    },
                }}
            >
                <h1 className="projectitem-title">{props.title}</h1>
                <h2 className="projectitem-subtitle">
                    Zeit bis zum {new Date(props.date).toLocaleDateString("de-DE")}
                </h2>
                <div>
                    <div className="divider"></div>
                    <h3 className="projectitem-task-title">Aufgabe für:</h3>
                    <div className="projectitem-task-container">
                        {user ? <p>{user.displayName}</p> : <p>Lade Username...</p>}
                    </div>
                </div>
                <div className="divider"></div>
                <p className="projectitem-text">{props.text}</p>
            </ReactModal>
        </div>
    );
};

export default ProjectItem;

import React, { useRef, useState } from "react";
import { Link } from "react-router-dom"; // Import Link component
import Input from "../layout/Input";
import Button from "../layout/Button";
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { firestore_db } from "../firebase";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import GoogleLogo from "../assets/GoogleLogo.png";



const SignUpPage = () => {
    const displayNameRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const [signUpError, setSignUpError] = useState("");
    const [googleLoginError, setGoogleLoginError] = useState("");

    const navigate = useNavigate();

    const clickHandler = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(
            auth,
            emailRef.current.value,
            passwordRef.current.value
        ).then((userCredential) => {
            const user = userCredential.user;

            // Update user profile
            updateProfile(user, {
                displayName: displayNameRef.current.value
            }).then(() => {
                // Add user data to Firestore
                const usersCollection = collection(firestore_db, "users");
                const userData = {
                    displayName: displayNameRef.current.value,
                    email: user.email,
                };
                addDoc(usersCollection, userData);

                navigate("/dashboard");
            });
        }).catch((error) => {
            setSignUpError(error.message);
        });
    };

    const googleSignIn = () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;

                // Check if user's email already exists in Firestore
                const usersCollection = collection(firestore_db, "users");
                const emailQuery = query(usersCollection, where("email", "==", user.email));

                getDocs(emailQuery)
                    .then((querySnapshot) => {
                        if (querySnapshot.size > 0) {
                            setGoogleLoginError("This email is already registered.");
                        } else {
                            // Add user data to Firestore
                            const userData = {
                                displayName: user.displayName,
                                email: user.email,
                            };
                            addDoc(usersCollection, userData);

                            navigate("/dashboard");
                        }
                    })
                    .catch((error) => {
                        console.error("Error checking user email:", error);
                    });
            })
            .catch((error) => {
                setGoogleLoginError("Google sign-in error: " + error.message);
            });
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "white",
                fontSize: "24px",
                paddingTop: "5rem"
            }}

        >
            <Link to="/impressum" style={{ fontSize: "25px", position: "absolute", bottom: "5rem", left: "7.5rem", color: "white", textDecoration: "none" }}>
                Impressum
            </Link>
            <div>
                <h1 style={{ textAlign: "center" }}>Sign Up...</h1>
                <h2 style={{ textAlign: "center", marginTop: "15px", marginBottom: "15px" }}>It's free!</h2>
                <Input ref={displayNameRef} type="text">Nutzername:</Input>
                <Input ref={emailRef} type="text">Email:</Input>
                <Input ref={passwordRef} type="password">Passwort (mindestens 6 Zeichen!):</Input>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "25px", textAlign: "center" }}>
                    <Button onClick={googleSignIn} style={{ textAlign: "center" }}>
                        <img src={GoogleLogo} alt="Google Logo" style={{ marginRight: "10px", height: "15px", width: "15px" }} />
                        Sign in with Google
                    </Button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "25px" }}>
                    <Button onClick={clickHandler} style={{ textAlign: "center" }}> Konto erstellen → </Button>
                </div>

            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "15px" }}>
                {signUpError && (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "15px", color: "red" }}>
                        {signUpError}
                    </div>
                )}
                {googleLoginError && (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "15px", color: "red" }}>
                        {googleLoginError}
                    </div>
                )}
                <h3 style={{ textAlign: "center", marginTop: "15px", marginBottom: "25px" }}>Konto vorhanden?</h3>
                <Button onClick={() => navigate("/login")} style={{ textAlign: "center" }}> Hier einloggen → </Button>
            </div>
        </div>
    );
};

export default SignUpPage;

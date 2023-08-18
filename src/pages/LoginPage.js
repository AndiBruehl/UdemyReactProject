import React, { useRef, useState } from "react";
import Input from "../layout/Input";
import Button from "../layout/Button";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { collection, getDocs, where, query, getFirestore } from "firebase/firestore";

import GoogleLogo from "../assets/GoogleLogo.png";

const LoginPage = () => {
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const [loginError, setLoginError] = useState("");
    const [googleLoginError, setGoogleLoginError] = useState("");

    const navigate = useNavigate();

    const clickHandler = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(
            auth,
            emailRef.current.value,
            passwordRef.current.value
        ).then(() => {
            navigate("/dashboard");
        }).catch((error) => {
            setLoginError(error.message);
        });
    };

    const googleLogin = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Check if the user's Google account is saved in the database
            const db = getFirestore();
            const usersRef = collection(db, "users");
            const querySnapshot = await getDocs(query(usersRef, where("email", "==", user.email)));

            if (querySnapshot.docs.length > 0) {
                navigate("/dashboard");
            } else {
                setGoogleLoginError("Google account not registered");
            }
        } catch (error) {
            setGoogleLoginError("Google login error: " + error.message);
        }
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
                <h1 style={{ textAlign: "center", marginTop: "15px", marginBottom: "25px" }}>Welcome Back!</h1>
                <Input ref={emailRef} type="text">Email:</Input>
                <Input ref={passwordRef} type="password">Passwort:</Input>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "25px", textAlign: "center" }}>
                    <Button onClick={googleLogin} style={{ textAlign: "center" }}>
                        <img src={GoogleLogo} alt="Google Logo" style={{ marginRight: "10px", height: "15px", width: "15px" }} />
                        Log in with Google
                    </Button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "25px" }}>
                    <Button onClick={clickHandler} style={{ textAlign: "center" }}> Einloggen → </Button>
                </div>

            </div>
            {loginError && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "15px", color: "red" }}>
                    {loginError}
                </div>
            )}
            {googleLoginError && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "15px", color: "red" }}>
                    {googleLoginError}
                </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "15px" }}>
                <h3 style={{ textAlign: "center", marginTop: "15px", marginBottom: "25px" }}>Kein Konto?</h3>
                <Button onClick={() => navigate("/signup")} style={{ textAlign: "center" }}> Hier erstellen → </Button>
            </div>
        </div>
    );
};

export default LoginPage;

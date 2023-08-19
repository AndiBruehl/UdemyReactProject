import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../layout/Input";
import Button from "../layout/Button";
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { firestore_db } from "../firebase";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import GoogleLogo from "../assets/GoogleLogo.png";

const SignUpPage = () => {
  const displayNameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [signUpError, setSignUpError] = useState("");
  const [googleLoginError, setGoogleLoginError] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const navigate = useNavigate();
  const fileInputRef = useRef(null); // Ref for the file input

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
  };

  const clickHandler = async () => {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );

      const user = userCredential.user;

      if (profilePicture) {
        const storage = getStorage();
        const storageRef = ref(storage, `profilePictures/${user.uid}/${profilePicture.name}`);
        await uploadBytes(storageRef, profilePicture);

        const downloadURL = await getDownloadURL(storageRef);

        await updateProfile(user, {
          displayName: displayNameRef.current.value,
          photoURL: downloadURL,
        });
      }

      const usersCollection = collection(firestore_db, "users");
      const userData = {
        displayName: displayNameRef.current.value,
        email: user.email,
        profilePictureURL: user.photoURL || "",
      };
      await addDoc(usersCollection, userData);

      navigate("/dashboard");
    } catch (error) {
      setSignUpError(error.message);
    }
  };

  const googleSignIn = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;

        const profilePictureURL = user.photoURL;

        const usersCollection = collection(firestore_db, "users");
        const emailQuery = query(usersCollection, where("email", "==", user.email));

        getDocs(emailQuery)
          .then((querySnapshot) => {
            if (querySnapshot.size > 0) {
              setGoogleLoginError("This email is already registered.");
            } else {
              const userData = {
                displayName: user.displayName,
                email: user.email,
                profilePictureURL: profilePictureURL || "",
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
        paddingTop: "2rem"
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
        
        {/* Container for image upload text */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "15px", textAlign: "center", color: "white" }}>
          <p style={{ fontSize: "1.5rem", marginBottom: "10px",  color: "white"  }}>Upload a profile picture:</p>
          
          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
                        onChange={handleProfilePictureChange}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
          
          {/* Display selected file name */}
          {profilePicture && (
            <p style={{ fontSize: "1rem", marginBottom: "5px",  color: "white"}}>
              {profilePicture.name}
            </p>
          )}
          
          {/* Button to trigger file input */}
          <Button onClick={() => fileInputRef.current.click()} className="button">
            Choose Profile Picture
          </Button>
        </div>
        
        {/* Use the same styling classes for the button */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "25px", textAlign: "center" }}>
          <Button onClick={googleSignIn} className="button">
            <img src={GoogleLogo} alt="Google Logo" style={{ marginRight: "10px", height: "15px", width: "15px" }} />
            Sign in with Google
          </Button>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "25px" }}>
          <Button onClick={clickHandler} className="button"> Konto erstellen → </Button>
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
        <Button onClick={() => navigate("/login")} className="button"> Hier einloggen → </Button>
      </div>
    </div>
  );
};

export default SignUpPage;

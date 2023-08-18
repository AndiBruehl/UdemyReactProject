import React from "react";
import Button from "../layout/Button";
import { useNavigate, Link } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
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
      {/* Added Link to "/impressum" */}
      <Link to="/impressum" style={{ fontSize: "25px", position: "absolute", bottom: "5rem", left: "7.5rem", color: "white", textDecoration: "none" }}>
        Impressum
      </Link>
      <h1 style={{ marginBottom: "70px" }}>Willkommen zu ProjectHub!</h1>
      <p style={{ marginBottom: "10px" }}>Neu hier?</p>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
        <Button onClick={() => navigate("/signup")} style={{ textAlign: "center" }}> Registrieren → </Button>
        <div style={{ marginTop: "20px" }}>
          <p style={{ marginBottom: "10px" }}>Schon dabei?</p>
          <Button onClick={() => navigate("/login")} style={{ textAlign: "center" }}> Einloggen → </Button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

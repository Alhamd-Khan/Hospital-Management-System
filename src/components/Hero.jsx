import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <div
      className="hero container"
      style={{ display: "flex", alignItems: "center", gap: "20px", padding: "20px" }}
    >
      <div className="hero-text" style={{ flex: 2, textAlign: "left", color: "#333" }}>
        <h1>{title}</h1>
        <div style={{ height: "18px" }} />
        <p style={{
          color: "#555",
          fontWeight: 500,
          fontSize: "1.1rem",
          letterSpacing: "0.2px",
          lineHeight: 1.5,
          maxWidth: "700px"
        }}>
          Al Care HealthHub is a modern, all-in-one healthcare center designed to deliver advanced medical services with empathy and excellence. Our dedicated team of healthcare professionals strives to provide personalized treatment and patient-centered care for every individual. At Al Care, we believe in combining technology with compassion to ensure a smooth, supportive, and healing journey towards your complete well-being.
        </p>
      </div>

      <div
        className="hero-image-wrapper"
        style={{ flex: 1, display: "flex", justifyContent: "flex-end", paddingRight: "20px" }}
      >
        <img
          src={imageUrl}
          alt="doctor"
          className="doctor-img hero-animated"
          style={{ maxWidth: "500px", width: "100%", height: "auto", borderRadius: "10px" }}
        />
      </div>
    </div>
  );
};

export default Hero;

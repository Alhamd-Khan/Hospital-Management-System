import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import MessageForm from "../components/MessageForm";
import Departments from "../components/Departments";

const Home = () => {
  return (
    <>
      <Hero
        title={
          "Welcome to AlCare Medical Institute | Your Trusted Healthcare Provider"
        }
        imageUrl={"/images/hero.png"}  
      />
      <div style={{ height: "48px" }} />
      <Biography imageUrl={"/images/aboutUs.png"} />  
      <Departments />
      <MessageForm />
    </>
  );
};

export default Home;
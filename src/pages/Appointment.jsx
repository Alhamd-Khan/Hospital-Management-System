import React from "react";
import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";

const Appointment = () => {
  return (
    <>
      <Hero
        title={"Schedule Your Appointment | Al Care Medical Institute"}
        imageUrl={"/images/signin.png"}
      />
      <div style={{ height: "48px" }} />
      <AppointmentForm/>
    </>
  );
};

export default Appointment;
import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";

const AboutUs = () => {
    return (
    <> 
    <Hero title={"Learn More About Us | AlCare Medical Institute"} imageUrl={"/images/aboutUs.png"}/>
<Biography imageUrl={"/images/whoweare.jpg"}/>
    </>
    );
};

export default AboutUs;
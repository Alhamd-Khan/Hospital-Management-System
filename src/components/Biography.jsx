import React from "react";

const Biography = ({ imageUrl }) => {
  const containerStyle = {
    display: "flex",
    gap: "30px",
    padding: "30px",
    backgroundColor: "#f0f0f0",
    alignItems: "flex-start",
    flexWrap: "wrap",
  };

  const imageWrapperStyle = {
    flex: "0 0 450px",  // image width 450px ki ho gayi
  };

  const imageStyle = {
    width: "100%",
    borderRadius: "10px",
  };

  const contentStyle = {
    flex: 1,
    color: "#333",
    textAlign: "left",
  };

  return (
    <div style={containerStyle}>
      <div style={imageWrapperStyle}>
        <img src={imageUrl} alt="about" style={imageStyle} />
      </div>
      <div style={contentStyle}>
        <p style={{ fontWeight: "bold", fontSize: "25px" }}>Biography</p>
        <h3>Who We Are</h3>
        <p>AlCare Medical Institute is a modern healthcare center committed to delivering advanced, compassionate care. Our expert team provides personalized treatments, blending cutting-edge technology with a patient-first approach to support your journey to better health.</p>
        {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, ipsa saepe dolorum in assumenda totam quam voluptatum eius similique!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid praesentium consequatur quaerat qui molestias voluptate repudiandae reiciendis cupiditate dolores id architecto ea, veniam vitae aliquam veritatis exercitationem perspiciatis quia nostrum omnis sapiente.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, eveniet!</p>
        <p>Lorem, ipsum dolor.</p> */}
      </div>
    </div>
  );
};

export default Biography;

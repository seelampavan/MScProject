import React from "react";
import arrowDown from "../Assets/icons8-arrow-64.png";
import Hero2 from "../Assets/hero2.png";
const Hero = () => {
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };
  return (
    <div className="hero quicksand flex items-center flex-col h-[90vh] text-white">
      <h1 className="text-3xl text-center mb-8 mt-8">
        Why Choose <span className="julius">Shieldgen</span> ?
      </h1>
      <div className="w-11/12 text-center lg:w-3/5">
        <p>
          Our mission is to empower girls and women by providing personalized
          self-defense training programs and tailored recommendations for safety
          resources and techniques. Whether you're concerned about public
          transportation, home safety, or outdoor activities, our platform
          offers the tools and support you need to stay safe and confident
        </p>
      </div>

      <div
        className="arrow h-24 w-24 bg-transparent rounded-full flex items-center justify-center text-white border-2 border-white relative top-8 z-0"
        onClick={handleScroll}
      >
        <img
          src={arrowDown}
          alt="scroll down"
          width="50"
          height="50"
          className="arrow"
        />
      </div>
      <img
        src={Hero2}
        alt="hero"
        className="mt-16 h-2/6 lg:h-1/2 mix-blend-multiply z-0"
      />
    </div>
  );
};

export default Hero;

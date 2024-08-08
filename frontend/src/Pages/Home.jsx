import React from "react";
import Header from "./../Components/Header";
import Hero from "./../Components/Hero";
import Testimonial from "./../Components/Testimonial";
import Hamburger from "./../Components/Hamburger";

const Home = () => {
  const [showHamburger, setShowHamburger] = React.useState(false);

  return (
    <div className="bg-[#002233]">
      <Hamburger
        isOpen={showHamburger}
        onClose={() => setShowHamburger(false)}
      />
      <div
        className={`transition-all duration-300 ${
          showHamburger ? "ml-[25%]" : "ml-0"
        }`}
      >
        <Header
          showHamburger={showHamburger}
          setShowHamburger={setShowHamburger}
        />
        <Hero />
        <Testimonial />
      </div>
    </div>
  );
};

export default Home;

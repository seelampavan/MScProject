import React from "react";
import "../App.css";
import Test from "../Assets/download.jpeg";
import Member from "./Member";
import TestUser from "./TestUser";
import Footer from "./Footer";
const Testimonial = () => {
  return (
    <div className="quicksand w-full bg-[#002233] text-white text-center flex flex-col items-center">
      <section className="w-full">
        <h2 className="w-full text-2xl p-8 underline">OUR TEAM</h2>
        <div className="w-full flex items-center justify-center">
          <p className="w-11/12 text-center lg:w-3/5">
            Meet our team of dedicated self-defense experts, ftness trainers,
            and safety advocates. We are passionate about helping you achieve
            your personal safety goals.
          </p>
        </div>
        <div className="w-full mt-8 team flex flex-row flex-wrap justify-around p-16 bg-black">
          <Member source={Test} name="John Doe" pos="Self-defense expert" />
          <Member source={Test} name="Deepak" pos="Self-defense expert" />
          <Member source={Test} name="John Doe" pos="Self-defense expert" />
          <Member source={Test} name="John Doe" pos="Self-defense expert" />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mt-4 text-2xl p-8 underline ">USER'S TESTIMONIAL</h2>
        <div className="w-full mt-8 team flex flex-col flex-wrap items-center justify-around p-16 bg-black lg:flex-row">
          <TestUser
            source={Test}
            name="John Doe"
            rating={4.5}
            content="SafeGuard has completely transformed how I approach personal
            safety. The personalized training plans are amazing, and I've
            learned so much about situational awareness. Highly recommend"
          />
          <TestUser
            source={Test}
            name="John Doe"
            rating={5}
            content="I feel so much more confdent knowing I have the
                  skills and knowledge to protect myself. The progress
                  tracking keeps me motivated, and I love the tailored
                  technique recommendations."
          />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Testimonial;

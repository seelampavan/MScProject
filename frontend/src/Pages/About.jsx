import React from "react";
import Header from "./../Components/Header";

const About = () => {
  return (
    <div className="bg-[#002233] text-white min-h-dvh">
      <Header />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mt-4 mb-4 julius">
          Why Choose Shieldgen?
        </h1>
        <p className="text-lg mb-4">
          At Shieldgen, our mission is to empower girls and women by providing
          personalized self-defense training programs and tailored
          recommendations for safety resources and techniques. We understand the
          unique challenges faced by women in different environments, and our
          goal is to equip you with the knowledge and skills to navigate them
          with confidence.
        </p>
        <p className="text-lg mb-4">
          Whether you're concerned about public transportation, home safety, or
          outdoor activities, our platform offers the tools and support you need
          to stay safe. Our comprehensive training programs are designed to be
          accessible and effective, ensuring that you can learn at your own pace
          and apply what you've learned in real-world situations.
        </p>
        <p className="text-lg mb-4">
          Shieldgen is more than just a training platform—it's a community. We
          are committed to creating a supportive environment where women can
          share their experiences, learn from one another, and build their
          confidence together. Join us on our mission to create a safer, more
          empowered world for women everywhere.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-2">Our Vision</h2>
        <p className="text-lg mb-4">
          To be the leading platform in women's safety and self-defense,
          ensuring that every woman feels secure and empowered to live her life
          to the fullest.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-2">Our Values</h2>
        <ul className="list-disc pl-5 p-4">
          <li className="text-lg mb-2">Empowerment</li>
          <li className="text-lg mb-2">Education</li>
          <li className="text-lg mb-2">Community</li>
          <li className="text-lg mb-2">Safety</li>
          <li className="text-lg ">Confidence</li>
        </ul>
      </div>
    </div>
  );
};

export default About;

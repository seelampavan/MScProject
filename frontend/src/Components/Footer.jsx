import React from "react";
import Medi from "../Assets/medi.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row justify-around items-center mt-4 p-8 space-y-8 lg:space-y-0">
      <div className="w-full lg:w-1/5 flex items-center flex-col">
        <img
          src={Medi}
          alt="medi-central"
          className="w-[100px] mix-blend-luminosity rounded"
        />
        <h2 className="quicksand w-full mt-4 text-center text-sm">
          Where Healthcare Systems Seamlessly Connect !!
        </h2>
      </div>
      <div className="flex w-full lg:w-1/5 mt-4 flex-row justify-around flex-wrap">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center"
        >
          <FontAwesomeIcon icon={faFacebook} size="2x" />
          <p className="text-sm">Facebook</p>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center"
        >
          <FontAwesomeIcon icon={faInstagram} size="2x" />
          <p className="text-sm">Instagram</p>
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center"
        >
          <FontAwesomeIcon icon={faTwitter} size="2x" />
          <p className="text-sm">Twitter</p>
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center"
        >
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
          <p className="text-sm">LinkedIn</p>
        </a>
      </div>
      <div className="w-full lg:w-1/5 text-center lg:text-left">
        <h2 className="text-2xl mb-2">Contact Us</h2>
        <p className="text-sm">
          505, Sunshine Apartments, Gandhi Nagar, Ashok Nagar, Karnataka -
          405678
        </p>
        <p className="text-sm">9876543210</p>
        <p className="text-sm"> MediCentral@gmail.com</p>
      </div>
    </div>
  );
};

export default Footer;

import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const TestUser = ({ source, name, content, rating }) => {
  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <>
        {Array(fullStars)
          .fill()
          .map((_, i) => (
            <FaStar key={`full-${i}`} />
          ))}
        {halfStars === 1 && <FaStarHalfAlt />}
        {Array(emptyStars)
          .fill()
          .map((_, i) => (
            <FaRegStar key={`empty-${i}`} />
          ))}
      </>
    );
  };

  return (
    <div className="w-4/5 team-member border p-4 rounded flex items-center  flex-col items-center mb-2 lg:w-1/3">
      <img src={source} alt="team member" className="rounded-full" width={50} />
      <h3 className="mt-2">{name}</h3>
      <div className="rating flex flex-row text-yellow-500 text-xl">
        {renderStars()}
      </div>
      <p className="mt-2 text-sm">{content}</p>
    </div>
  );
};

export default TestUser;

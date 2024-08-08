import React from "react";

const Member = ({ source, name, pos }) => {
  return (
    <div className="team-member border  mb-2 rounded p-8 flex flex-col items-center ">
      <img
        src={source}
        alt="team member"
        className="rounded w-[100px] lg:w-[150px]"
      />
      <h3 className="mt-2">{name}</h3>
      <p className="mt-2">{pos}</p>
    </div>
  );
};

export default Member;

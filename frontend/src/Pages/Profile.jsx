import React from "react";
import { useUser } from "../userContext"; // Adjust the import path based on your project structure
import "../App.css";
const Profile = () => {
  const { user } = useUser(); // Assuming useUser provides user, loading, and error states

  return (
    <div className="profile-container h-full  flex items-center justify-center flex-col">
      <h1 className="text-center text-2xl font-bold mb-4 p-4 quicksand">
        Profile
      </h1>
      <div className="rounded-lg bg-black shadow-lg w-full max-w-4xl flex flex-col items-center p-8 h-1/2">
        <h2 className="julius text-center text-xl ">
          Welcome {user.username}!
        </h2>
        <h3 className="mt-8 underline">Your information</h3>
        <div className="w-full quicksand flex flex-row justify-around mt-8 ">
          <ul>
            <li>Mail:</li>
            <li>Age:</li>
            <li>Gender:</li>
          </ul>
          <ul>
            <li>{user.email}</li>
            <li>{user.age}</li>
            <li>
              {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;

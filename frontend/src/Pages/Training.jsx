import React, { useState, useEffect } from "react";
import { useUser } from "../userContext";
import Module from "./../Components/Module";
import Men from "../Assets/Men.jpg";
import Women from "../Assets/women.webp";

const Training = ({ videos, setTotal, setProgress }) => {
  const { user } = useUser();
  const [personal, setPersonal] = useState([]);

  const [userData, setUserData] = useState({
    name: user.username,
    age: user.age,
    gender: user.gender,
    fitnessLevel: [],
    injuries: "",
    availability: [],
    injuryDetails: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setUserData((prevData) => ({
        ...prevData,
        [name]: checked
          ? [...prevData[name], value]
          : prevData[name].filter((item) => item !== value),
      }));
    } else {
      setUserData({
        ...userData,
        [name]: value,
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/training", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      console.log("Form submitted:", data);

      // Reset userData after submission
      setUserData({
        ...userData,
        fitnessLevel: [],
        injuries: "",
        availability: [],
        injuryDetails: "",
      });

      // Trigger the creation of a personal module after form submission
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchInfo = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/training/${user.username}`, // Pass username as route parameter
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log("FETCHING INFO", data);

      // Update state with fetched data
      setUserData({
        ...userData,
        fitnessLevel: data[0].fitnessLevel || [],
        injuries: data[0].injuries || "",
        availability: data[0].availability || [],
        injuryDetails: data[0].injuryDetails || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Trigger handleCreatePersonal when userData is updated
  useEffect(() => {
    if (
      userData.fitnessLevel.length > 0 ||
      userData.injuries ||
      userData.availability.length > 0
    ) {
      handleCreatePersonal();
    }
  }, [userData]);

  const handleCreatePersonal = () => {
    const gender = user.gender === "male" ? "Men" : "Women";
    const genderSpecificVideos = videos.filter((item) => item.for === gender);
    console.log("GenderSpecific", genderSpecificVideos);
    const difficulty = userData.fitnessLevel[0];

    console.log("Difficulty", difficulty);
    const filteredPersonalModule = genderSpecificVideos.filter((item) =>
      userData.fitnessLevel.includes(item.difficulty)
    );

    console.log("Filtered Personal Module:", filteredPersonalModule);
    setPersonal(filteredPersonalModule);
    setTotal(filteredPersonalModule.length);
  };

  useEffect(() => {
    handleFetchInfo();
  }, []);
  return (
    <div className="mt-4 quicksand flex items-center flex-col justify-center ">
      <div className=" p-8 bg-[#003b59] rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl  font-bold text-center ">PERSONAL TRAINING</h2>
        <p className="text-center text-[#cccccc]">
          We will create personalized Training Program that suits you
        </p>
        <form
          onSubmit={handleFormSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4"
        >
          {/* Fitness Level */}
          <div className="flex flex-col justify-center">
            <label className="text-sm font-medium mb-2">Fitness Level</label>
            <div className="flex flex-col">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="fitnessLevel"
                  value="Beginner"
                  checked={userData.fitnessLevel.includes("Beginner")}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Beginner
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="fitnessLevel"
                  value="Intermediate"
                  checked={userData.fitnessLevel.includes("Intermediate")}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Intermediate
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="fitnessLevel"
                  value="Advanced"
                  checked={userData.fitnessLevel.includes("Advanced")}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Advanced
              </label>
            </div>
          </div>

          {/* Availability */}
          <div className="flex flex-col justify-center">
            <label className="text-sm font-medium mb-2">Availability</label>
            <div className="flex flex-col">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="availability"
                  value="0-30 mins"
                  checked={userData.availability.includes("0-30 mins")}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                0 - 30 mins
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="availability"
                  value="30-1 hr"
                  checked={userData.availability.includes("30-1 hr")}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                30 - 1 hr
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="availability"
                  value="1-2 hrs"
                  checked={userData.availability.includes("1-2 hrs")}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                1 - 2 hrs
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="availability"
                  value="2+ hrs"
                  checked={userData.availability.includes("2+ hrs")}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                2+ hrs
              </label>
            </div>
          </div>
          {/* Injuries */}
          <div className="flex flex-col justify-center">
            <label className="text-sm font-medium mb-2">Injuries</label>
            <div className="flex items-center">
              <label className="flex items-center mr-4">
                <input
                  type="checkbox"
                  name="injuries"
                  value="Yes"
                  checked={userData.injuries === "Yes"}
                  onChange={() => setUserData({ ...userData, injuries: "Yes" })}
                  className="mr-2"
                />
                Yes, then specify
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="injuries"
                  value="No"
                  checked={userData.injuries === "No"}
                  onChange={() => setUserData({ ...userData, injuries: "No" })}
                  className="mr-2"
                />
                No
              </label>
            </div>
            {userData.injuries === "Yes" && (
              <input
                type="text"
                name="injuryDetails"
                value={userData.injuryDetails || ""}
                onChange={handleInputChange}
                className="mt-2 p-2 border border-gray-300 rounded text-black"
                placeholder="Enter Type of Injury"
              />
            )}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center">
            <input
              type="submit"
              value="Save"
              className="w-full md:w-1/2 p-3 bg-blue-600 text-white font-medium rounded cursor-pointer"
            />
          </div>
        </form>
      </div>
      <div className="bg-black w-11/12 p-4 rounded mt-8 ">
        <h2 className="mt-4 text-2xl p-8 underline text-center ">
          TRAINING MODULES
        </h2>
        <div className="flex flex-row justify-around flex-wrap">
          <div className="flex flex-row justify-around flex-wrap">
            {personal.length > 0 && (
              <Module
                name="Personlized for you"
                videos={personal}
                image="https://images.squarespace-cdn.com/content/v1/56416249e4b041a7c3999f19/1646199109462-SOIX7UQ9IMCHXM0QYWDS/1410.jpeg?format=1500w"
                setProgress={setProgress}
                setTotal={setTotal}
              />
            )}
          </div>

          <Module
            name="Men"
            image={Men}
            videos={videos}
            setProgress={setProgress}
            setTotal={setTotal}
          />
          <Module
            name="Women"
            image={Women}
            videos={videos}
            setProgress={setProgress}
            setTotal={setTotal}
          />
        </div>
      </div>
    </div>
  );
};

export default Training;

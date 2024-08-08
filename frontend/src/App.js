import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import { useUser } from "./userContext";
import Dashboard from "./Pages/Dashboard";
import Resource from "./Pages/Resource";
import Training from "./Pages/Training";
import Forum from "./Pages/Forum";
import DashboardHome from "./Pages/DashboardHome";
import testVideo from "./Assets/Videos/Abs_BirdDogs.mp4";
import Profile from "./Pages/Profile";

const App = () => {
  const { user } = useUser();
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);
  const videos = [
    {
      videoSrc: testVideo,
      name: "Bird Dogs",
      difficulty: "Intermediate",
      des: "The birddog exercise is a core strengthening exercise that involves extending one arm and the opposite leg while maintaining a stable position on all fours.",
      for: "Men",
      other: "3 times",
    },
    {
      videoSrc: testVideo,
      name: "Bird Dogs",
      difficulty: "Intermediate",
      des: "The birddog exercise is a core strengthening exercise that involves extending one arm and the opposite leg while maintaining a stable position on all fours.",
      for: "Men",
      other: "3 times",
    },
    {
      videoSrc: testVideo,
      name: "Bird Dogs",
      difficulty: "Intermediate",
      des: "The birddog exercise is a core strengthening exercise that involves extending one arm and the opposite leg while maintaining a stable position on all fours.",
      for: "Women",
      other: "3 times",
    },
    {
      videoSrc: testVideo,
      name: "Bird Dogs",
      difficulty: "Intermediate",
      des: "The birddog exercise is a core strengthening exercise that involves extending one arm and the opposite leg while maintaining a stable position on all fours.",
      for: "Biceps",
      other: "3 times",
    },
    {
      videoSrc: testVideo,
      name: "Hell of exercise",
      difficulty: "Intermediate",
      des: "The birddog exercise is a core strengthening exercise that involves extending one arm and the opposite leg while maintaining a stable position on all fours.",
      for: "Chest",
      other: "3 times",
    },
  ];

  return (
    <div className="w-dvw">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {user && (
            <Route path="/dashboard" element={<Dashboard />}>
              <Route
                index
                element={<DashboardHome progress={progress} total={total} />}
              />
              <Route path="/dashboard/profile" element={<Profile />} />
              <Route
                path="resource"
                element={<Resource videos={videos} setTotal={setTotal} />}
              />
              <Route
                path="training"
                element={
                  <Training
                    videos={videos}
                    setProgress={setProgress}
                    setTotal={setTotal}
                  />
                }
              />
              <Route path="forum" element={<Forum />} />
            </Route>
          )}
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

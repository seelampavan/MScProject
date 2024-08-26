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
import Profile from "./Pages/Profile";
import About from "./Pages/About";

const App = () => {
  const { user } = useUser();
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);
  const videos = [
    {
      videoSrc:
        "https://www.youtube.com/embed/8oDNH8714oE?list=PLLALQuK1NDrhbNpRSUEAloceyNEMzcKzN",
      name: "Side KIcks",
      difficulty: "Beginner",
      des: "Side kick is traditionally a kick that will thrust straight through, and it's a kick that makes contact with your heel, with the blade edge of the heel, which is the outside of your heel",
      for: "Men",
    },
    {
      videoSrc:
        "https://www.youtube.com/embed/v2Rzhr1OtN4?list=PLLALQuK1NDrhbNpRSUEAloceyNEMzcKzN",
      name: "How to Defend against a Front Choke",
      difficulty: "Intermediate",
      des: "A choke , when he chokes this is a relatively simple solution. You can punch him, you can punch him, you can poke him in the eye, you can do very many things from that place",
      for: "Men",
    },
    {
      videoSrc:
        "https://www.youtube.com/embed/rKo7fFxc5WI?list=PLLALQuK1NDrhbNpRSUEAloceyNEMzcKzN",
      name: "How to Do an Elbow to the Rea",
      difficulty: "Advanced",
      des: "Let's continue forward. We're going to strike an individual that stands behind you.  Obviously, in a street environment. Once again, target could appear from anywhere. This strike will be to an individual who's actually there.",
      for: "Men",
    },
    {
      videoSrc:
        "https://www.youtube.com/embed/SmEgevqarkw?list=PLLALQuK1NDrhbNpRSUEAloceyNEMzcKzN",
      name: "How to Defend against Gun from the Rear ",
      difficulty: "Advanced",
      des: "This is a defense against a gun from the rear. The gun is placed in the back of the head. The attacker is threatening you from the back. This is a very dangerous situation.",
      for: "Men",
    },
    {
      videoSrc: "https://www.youtube.com/embed/xw-8_UTJo2Q",
      name: "Release yourself from a frontal attack.",
      difficulty: "Beginner",
      des: "This is a frontal attack. The attacker is in front of you. He's trying to grab you. He's trying to punch you. He's trying to do something to you. You need to release yourself from this situation.",
      for: "Women",
    },
    {
      videoSrc: "https://www.youtube.com/embed/uphLuMyAVX0",
      name: "How to Defend Yourself from a Frontal Choke ",
      difficulty: "Intermediate",
      des: " how to release yourself from this situation, while kicking and punching the attacker in order to run away and call some help.",
      for: "Women",
    },
    {
      videoSrc: "https://www.youtube.com/embed/lJ-FFqUH4ME",
      name: "Two Guys vs. One Girl",
      difficulty: "Advanced",
      des: " how to release yourself from this situation, while kicking and punching the attacker in order to run away and call some help.",
      for: "Women",
    },
  ];

  return (
    <div className="w-dvw">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
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

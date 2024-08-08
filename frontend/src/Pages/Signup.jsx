import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import "../App.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "", // Added gender to userData state
    age: "", // Added age to userData state
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const responseMessage = async (response) => {
    console.log(response);
    const token = String(response.credential);
    const decodedToken = jwtDecode(token);

    const data = {
      username: decodedToken.name,
      email: decodedToken.email,
      googleId: decodedToken.sub,
    };
    try {
      const res = await fetch("http://localhost:3000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await res.json();
      console.log(responseData);
      if (responseData.message === "User already exists. Please Login") {
        setError("User already exists. Please Login");
      } else {
        setError(null);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      console.log(data);
      if (data.message === "User already exists") {
        setError("User already exists");
      } else if (data.message === "Username already exists") {
        setError("Username already exists");
      } else {
        setError(null);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  const handlePasswordShow = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-[#002233] w-full min-h-dvh flex items-center justify-center lg:min-h-dvh">
      <div className="inter flex w-full h-full justify-center flex-col lg:w-1/3">
        <div className="w-11/12 p-4 pt-8">
          <h1 className="text-white text-3xl font-semibold mb-2">
            Create your new <br /> account.
          </h1>
          <p className="text-[#878787] text-sm font-medium">
            Sign Up & Start Your Free Trial
          </p>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="w-full p-4 flex flex-col justify-center">
            <label className="text-sm text-white font-medium mt-4 mb-1">
              User Name
            </label>
            <input
              type="text"
              className="w-full p-2 border-2 border-[#d6d6d6] outline-[#d6d6d6] rounded-md lg:w-11/12"
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
              required
            />
            <label className="text-sm text-white font-medium m-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full p-2 border-2 border-[#d6d6d6] outline-[#d6d6d6] rounded-md lg:w-11/12"
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              required
            />
            <label className="text-sm font-medium m-1 text-white">Gender</label>
            <select
              name="gender"
              value={userData.gender}
              onChange={(e) =>
                setUserData({ ...userData, gender: e.target.value })
              }
              className=" lg:w-11/12 p-2 border border-gray-300 rounded text-black"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <label className="text-sm text-white font-medium mb-2">Age</label>
            <input
              type="number"
              name="age"
              onChange={(e) =>
                setUserData({ ...userData, age: e.target.value })
              }
              className="w-full p-2 border-2 border-[#d6d6d6] outline-[#d6d6d6] rounded-md lg:w-11/12"
              placeholder="Enter Age"
              required
            />
            <label className="text-sm text-white font-medium mt-4 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-2 border-2 border-[#d6d6d6] outline-[#d6d6d6] rounded-md pr-10 lg:w-11/12"
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                required
              />
              <span
                className="absolute top-1/2 right-6 transform -translate-y-1/2 lg:right-14 cursor-pointer"
                onClick={handlePasswordShow}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.50001 1.5L4.49098 4.49097M16.5 16.5L13.5093 13.5093M10.5624 14.6872C10.0564 14.7831 9.53428 14.8333 9.00039 14.8333C5.26902 14.8333 2.11043 12.3809 1.04855 8.99997C1.33763 8.07958 1.7821 7.22801 2.35121 6.47598M7.23224 7.23223C7.68465 6.77982 8.30965 6.5 9.00001 6.5C10.3807 6.5 11.5 7.61929 11.5 9C11.5 9.69036 11.2202 10.3154 10.7678 10.7678M7.23224 7.23223L10.7678 10.7678M7.23224 7.23223L4.49098 4.49097M10.7678 10.7678L4.49098 4.49097M10.7678 10.7678L13.5093 13.5093M4.49098 4.49097C5.79083 3.65295 7.33881 3.16667 9.00038 3.16667C12.7318 3.16667 15.8903 5.61909 16.9522 9.00003C16.3631 10.8756 15.1288 12.4654 13.5093 13.5093"
                    stroke="#101010"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>

            <div>{error && <p className="text-red-500">{error}</p>}</div>

            <span className="m-4 mt-8 mb-8 flex flex-row items-center justify-center gap-4">
              <input
                type="checkbox"
                className="custom-checkbox transform scale-150"
                required
              />
              <p className="text-white">
                I Agree with{" "}
                <span className="text-[#0066ff]">Terms of Service</span> and{" "}
                <span className="text-[#0066ff]">Privacy Policy</span>
              </p>
            </span>
            <input
              type="submit"
              value="Register"
              className="w-11/12 p-3 bg-[#0066ff] text-white font-medium rounded-full cursor-pointer"
            />
          </div>
        </form>
        <div className="w-full flex justify-center items-center flex-col ">
          <span className="w-4/5 mb-4 mt-4 flex flex-row items-center justify-center space-x-2">
            <hr className="flex-grow border-[0.5] border-[#a5a5a5] " />
            <p className="text-[#878787]">Or sign in with</p>
            <hr className="flex-grow border=[0.5] border-[#a5a5a5]" />
          </span>
          <GoogleLogin
            clientId="349072461760-4r1smqf00o58mi0nougeop5gilvo2clb.apps.googleusercontent.com"
            onSuccess={responseMessage}
            onFailure={errorMessage}
            cookiePolicy={"single_host_origin"}
          />
        </div>

        <div className="w-full mt-4 p-4 flex justify-center">
          <p className=" text-sm text-white font-medium">
            Have an account?{" "}
            <Link to="/login">
              <span className="text-[#0066ff]">Sign in</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

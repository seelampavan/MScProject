import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        try {
          return JSON.parse(storedUserData);
        } catch (error) {
          console.error("Error parsing userData from localStorage", error);
          return {
            userName: "",
            email: "",
            age: "",
            gender: "",
          };
        }
      } else {
        return {
          userName: "",
          email: "",
          age: "",
          gender: "",
        };
      }
    } else {
      return {
        userName: "",
        email: "",
        age: "",
        gender: "",
      };
    }
  });
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("userData", JSON.stringify(user));
      } catch (error) {
        console.error("Error saving userData to localStorage", error);
      }
    }
    console.log(user);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

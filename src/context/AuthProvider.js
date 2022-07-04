import React, { createContext, useState } from "react";
import axios from "axios";
import { useContext, useEffect } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();
const API_KEY = "AIzaSyDQEzOEo1lv-tZtgWOiKQz7Xafn1mN6s1U";

function calculateTime(total) {
  const differ = total - Date.now();
  console.log(differ);
  return differ;
}

const AuthProvider = ({ children }) => {
  const initValue = localStorage.getItem("token");
  const time = localStorage.getItem("time");
  const [token, setToken] = useState(initValue);
  const isLoggeIn = !!token;

  useEffect(() => {
    let timeSet = setTimeout(logout, calculateTime(time));

    var decoded = jwt_decode(token);

    console.log(decoded);

    return () => {
      clearTimeout(timeSet);
    };
  }, [token, time]);

  async function signup(email, password) {
    try {
      await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      );

      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async function singin(email, password) {
    try {
      const { data } = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      );

      console.log(data);

      setToken(data.idToken);

      //3
      //2 + 3 = 5

      localStorage.setItem("token", data.idToken);
      localStorage.setItem("time", itsTime(data.expiresIn) + Date.now());

      setTimeout(logout, itsTime(data.expiresIn));

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function logout() {
    setToken(null);
    localStorage.removeItem("token");
  }

  function itsTime(expiresDate) {
    const seconds = +expiresDate;
    const milliseconds = seconds * 1000;
    return milliseconds;
  }

  const authState = {
    signup,
    singin,
    logout,
    isLoggeIn,
    token,
  };

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;

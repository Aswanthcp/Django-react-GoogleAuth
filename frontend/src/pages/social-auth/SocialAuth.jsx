import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import "./index.css";

const { VITE_BACKEND_URL } = import.meta.env;

const SocialAuth = () => {
  const location = useLocation();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const values = queryString.parse(location.search);
    const code = values?.code;

    if (code) {
      onGoogleLogin(code);
    }
  }, []);

  const googleLoginHandler = (code) => {
    if (!code) {
      return;
    }
    return axios
      .get(`${VITE_BACKEND_URL}/api/auth/google/?code=${code}`)
      .then((res) => {
        console.log("Response:", res);
        localStorage.setItem("googleFirstName", res.data.user.first_name);
        navigate("/");
      })
      .catch((err) => {
        setError("Authentication failed");
        console.error("Error:", err);
      });
  };

  const onGoogleLogin = async (code) => {
    const response = await googleLoginHandler(code);
    if (!response.error) {
      clearQueryParams();
    }
  };

  const clearQueryParams = () => {
    navigate({
      pathname: "/", // Navigate to the same location
      search: "", // Clear query parameters
    });
  };

  return (
    <div className="loading-icon-container">
      <div className="loading-icon">
        <div className="loading-icon__circle loading-icon__circle--first"></div>
        <div className="loading-icon__circle loading-icon__circle--second"></div>
        <div className="loading-icon__circle loading-icon__circle--third"></div>
        <div className="loading-icon__circle loading-icon__circle--fourth"></div>
      </div>
      <small className="text-center mr-2">Just a moment</small>
      {error && <div className="text-center text-red-500">{error}</div>}
    </div>
  );
};

export default SocialAuth;

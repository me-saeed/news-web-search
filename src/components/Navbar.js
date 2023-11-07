import React from "react";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div
        onClick={() => {
          navigate("/");
        }}
        className="logo"
      >
        <img src={require("../assets/logos/news1.png")} alt="Logo" />
      </div>
      <div
        onClick={() => {
          navigate("/setting");
        }}
        className="user-settings-logo"
      >
        <div className="user-setting-logo">
          <img src={require("../assets/logos/setting4.png")} alt="Logo" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

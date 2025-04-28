import React from "react";
import "./Navbar.css";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    toast.success("User Logout Successfully");
  };

  return (
    <nav>
      <h1>Text to Image / GIF / Video Generator</h1>

      <div className="email-container">
        {user && user.email}
        {user ? (
          <p onClick={handleLogout} className="logout">
            LogOut
          </p>
        ) : (
          <p onClick={() => navigate("/login")}>Sign In</p>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

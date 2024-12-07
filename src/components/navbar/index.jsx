import React from "react";
import { useAuth } from "../../context/auth";
import { useNavigate, Link } from "react-router-dom";
import { TbSalt } from "react-icons/tb";
import { TbUser } from "react-icons/tb";
import toast from "react-hot-toast";
import Searchbar from "../searchbar";
import axios from "axios";

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  async function onLogout(e) {
    try {
      const { data } = await axios.delete("/api/auth/logout/");
      logoutUser();
      toast.success("You are logged out, bye!");
      navigate("/signin");
    } catch (error) {
      console.log(error.response.data.error);
      return toast.error(error.response.data.error);
    }
  }

  return (
    <div className="w-full p-4 gap-x-8 bg-primary flex justify-between items-center">
      <Link to="/" className="w-auto text-accent flex items-end">
        <TbSalt className="text-lg" />
        <span className="text-xs">Passthesalt</span>
      </Link>

      <Searchbar />

      {user ? (
        <div className="flex-1 gap-x-4 flex justify-end items-center">
          <div className="flex items-center gap-x-1 text-white">
            <TbUser className="text-xl text-white" />
            <span className="text-xs text-white">{user.username}</span>
          </div>
          <button
            className="px-2 py-1 bg-white rounded-sm hover:shadow-md text-xs"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex-1 flex gap-x-4 justify-end">
          <Link
            to="/signin"
            className="px-2 py-1 bg-white rounded-sm hover:shadow-md text-xs"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-2 py-1 bg-white rounded-sm hover:shadow-md text-xs"
          >
            Signup
          </Link>
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function Signin() {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  async function onSignin(e) {
    e.preventDefault();
    console.log("FORMDATA: ", formData);

    try {
      const { data } = await axios.post("/api/auth/login/", {
        ...formData,
      });
      console.log("DATA: ", data);
      loginUser(data.user);
      toast.success(`Welcome back ${data.user.username}`);
      navigate("/");
    } catch (error) {
      console.log(error.response.data.error);
      return toast.error(error.response.data.error);
    }
  }

  return (
    <div className="w-full h-full">
      <form
        className="w-full h-full flex flex-col gap-y-4 max-w-[70%] mx-auto pt-[100px]"
        onSubmit={onSignin}
      >
        <h2 className="text-xl font-semibold text-center">
          Sign in to your account
        </h2>
        <div className="w-full flex flex-col">
          <label htmlFor="" className="p-2 ">
            Email
          </label>
          <input
            type="text"
            name="email"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            className="w-full border border-primary p-2 rounded-sm"
          />
        </div>
        <div className="w-full flex flex-col">
          <label htmlFor="" className="p-2 ">
            Password
          </label>
          <input
            type="text"
            name="password"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            className="w-full border border-primary p-2 rounded-sm"
          />
        </div>

        <div className="w-full flex gap-x-2 py-4">
          <p className="text-sm">Don't have an account?</p>
          <Link to="/signup" className="text-sm text-blue-500">
            Sign up
          </Link>
        </div>
        <button className="w-full p-2 bg-primary text-white hover:shadow-xl delay-75">
          Signin
        </button>
      </form>
    </div>
  );
}

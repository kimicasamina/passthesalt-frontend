import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function Signup() {
  const { user, setLogin } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  async function onLogin(e) {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/auth/register/", {
        ...formData,
      });
      console.log("DATA: ", data);
      setLogin(data.user);
      toast.success("User is registered");
      return navigate("/signin");
    } catch (error) {
      console.log(error);
      return toast.error("Something went wrong");
    }
  }

  return (
    <div className="w-full h-full flex">
      <form
        className="w-full h-full flex flex-col gap-y-4 max-w-[70%] mx-auto pt-[100px]"
        onSubmit={onLogin}
      >
        <h2 className="text-xl font-semibold text-center">
          Create a new Account
        </h2>
        <div className="w-full flex flex-col">
          <label htmlFor="" className="p-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            className="w-full border border-primary p-2 rounded-sm"
          />
        </div>
        <div className="w-full flex flex-col">
          <label htmlFor="" className="p-2">
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
          <label htmlFor="" className="p-2">
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
          <Link to="/signin" className="text-sm text-blue-500">
            Sign in
          </Link>
        </div>
        <button className="w-full p-2 bg-primary text-white hover:shadow-xl delay-75">
          Signin
        </button>
      </form>
    </div>
  );
}

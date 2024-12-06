import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../../../../context/auth";

export default function CreatePassword() {
  const { user, isFetching, addLogin } = useAuth();
  const [formData, setFormData] = useState({
    userUuid: user?.uuid,
    name: "",
    email: "",
    password: "",
    website: "",
  });
  async function onHandleSubmit(e) {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/logins/", { ...formData });
      console.log("DATA: ", data);
      addLogin(data);
      setFormData({
        userUuid: user.id,
        name: "",
        email: "",
        password: "",
        website: "",
      });
      toast.success("Created a new Password");
    } catch (error) {
      return toast.error("Something went wrong");
    }
  }

  if (!user && !isFetching) {
    return <h1 className="">Loading...</h1>;
  }

  useEffect(() => {
    if (user) {
      setFormData({ ...formData, userUuid: user.uuid });
    }
  }, [user]);

  return (
    <div className="flex-1 h-full p-4 flex flex-col gap-y-10">
      <form
        className="w-full h-full flex flex-col gap-y-4 max-w-[70%] mx-auto"
        onSubmit={onHandleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center mb-8">
          Create a new Login
        </h2>
        <div className="w-full flex flex-col">
          <label htmlFor="" className="p-2 ">
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            name="name"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            className="w-full border border-primary p-2 rounded-sm"
          />
        </div>
        <div className="w-full flex flex-col">
          <label htmlFor="" className="p-2 ">
            Email
          </label>
          <input
            type="text"
            name="email"
            value={formData.email}
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
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            className="w-full border border-primary p-2 rounded-sm"
          />
        </div>

        <div className="w-full flex flex-col">
          <label htmlFor="" className="p-2 ">
            Website
          </label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            className="w-full border border-primary p-2 rounded-sm"
          />
        </div>

        <button className="w-full p-2 bg-primary text-white hover:shadow-xl delay-75 mt-10">
          Create Login
        </button>
      </form>
    </div>
  );
}

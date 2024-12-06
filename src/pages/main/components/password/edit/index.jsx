import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";

export default function EditPassword() {
  const params = useParams();
  const navigate = useNavigate();
  const { user, isFetching, updateLogin } = useAuth();
  const [decryptedPassword, setDecryptedPassword] = useState(null);
  const login = user.logins.filter((login) => login.uuid === params.id)[0];

  const [formData, setFormData] = useState({
    name: login.name,
    email: login.email,
    password: "",
    website: login.website,
  });

  async function onDecryptPassword() {
    try {
      const { data } = await axios.post("/api/logins/decryptpassword/", {
        iv: login.iv,
        password: login.password,
      });
      console.log("DATA :", data);

      setFormData({
        ...formData,
        password: data.password,
      });
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  async function onSubmitHandler(e) {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/logins/${login.uuid}`, {
        ...formData,
      });
      console.log("DATA: ", data);
      updateLogin(data);
      navigate(`/password/${login.uuid}`);
      return toast.success("Password updated");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  useEffect(() => {
    onDecryptPassword();
  }, []);

  return (
    <div className="flex-1 h-full p-4 flex flex-col gap-y-10">
      <h2 className="text-2xl font-semibold text-center">Edit Password</h2>

      <form
        className="w-full h-full flex flex-col gap-y-4 max-w-[70%] mx-auto"
        onSubmit={onSubmitHandler}
      >
        <div className="w-full flex flex-col">
          <label htmlFor="" className="p-2 ">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
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
          Update
        </button>
      </form>
    </div>
  );
}

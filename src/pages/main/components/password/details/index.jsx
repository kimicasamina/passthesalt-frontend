import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../../context/auth";
import { formatTime, formatDate } from "../../../../../utils/helper";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import { TbEyeClosed } from "react-icons/tb";
import { TbEye } from "react-icons/tb";
import { TbCopy } from "react-icons/tb";
import { TbTrashX } from "react-icons/tb";
import { TbCopyCheck } from "react-icons/tb";

export default function PasswordDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const { user, deleteLogin } = useAuth();
  const login = user?.logins.filter((login) => login.uuid === params.id)[0];
  const [isCopied, setIsCopied] = useState(false);
  const [decryptedPassword, setDecryptedPassword] = useState(null);
  console.log("PASS:", decryptedPassword);

  useEffect(() => {
    // reset to null the password after switching params
    setDecryptedPassword(null);
    setIsCopied(false);

    // setLogin(login);
  }, [params.id]);

  async function onDecryptPassword() {
    try {
      const { data } = await axios.post("/api/logins/decryptpassword/", {
        iv: login.iv,
        password: login.password,
      });
      return data.password;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  async function onShowPassword() {
    const password = await onDecryptPassword();
    console.log("password", password);
    setDecryptedPassword(password);
    setTimeout(() => {
      setDecryptedPassword(null);
    }, 3000);
  }

  function onHidePassword() {
    setDecryptedPassword(null);
  }

  async function onCopyToClipboard() {
    if (!decryptedPassword) {
      const password = await onDecryptPassword();
      setIsCopied(true);
      navigator.clipboard.writeText(password);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      toast.success("Password copied!");
    } else {
      setIsCopied(true);
      navigator.clipboard.writeText(decryptedPassword);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      toast.success("Password copied!");
    }
  }

  async function onDelete() {
    try {
      const { data } = await axios.delete(`/api/logins/${login.uuid}`);
      deleteLogin(login.uuid);
      toast.success("Deleted");
      return navigate("/");
    } catch (error) {
      return toast.error("Something went wrong");
    }
  }

  if (!login) {
    return <h1 className="">Loading...</h1>;
  }

  return (
    <div className="flex-1 h-full p-4 flex flex-col gap-y-10">
      <h2 className="text-2xl font-semibold text-center">Password Details</h2>
      {login ? (
        <div className="flex flex-col gap-y-8">
          <div className="w-full flex flex-col gap-y-1">
            <label className="text-sm font-semibold">Name</label>
            <p className="text-md font-light">{login.name}</p>
          </div>
          <div className="w-full flex flex-col gap-y-1">
            <label className="text-sm font-semibold">Email</label>
            <p className="text-md font-light">{login.email}</p>
          </div>
          <div className="w-full flex flex-col gap-y-1 ">
            <label className="text-sm font-semibold">Password</label>
            <div className={`w-full flex justify-between`}>
              {decryptedPassword ? (
                <p
                  className={`w-full text-md font-light ${
                    isCopied
                      ? " animate-all animate-spin:outline animate-spin:outline-accent ease-in-out rounded-sm"
                      : ""
                  }`}
                >
                  {decryptedPassword}
                </p>
              ) : (
                <p
                  className={`w-full text-md font-light ${
                    isCopied
                      ? " animate-all animate-spin:outline animate-spin:outline-accent ease-in-out rounded-sm"
                      : ""
                  }`}
                  onClick={onDecryptPassword}
                >
                  ****************
                </p>
              )}
              <div className="flex items-center gap-x-2 pl-4">
                {isCopied ? (
                  <TbCopyCheck className="text-xl hover:cursor-pointer" />
                ) : (
                  <TbCopy
                    className="text-xl hover:cursor-pointer"
                    onClick={onCopyToClipboard}
                  />
                )}

                {decryptedPassword ? (
                  <TbEye
                    className="text-xl hover:cursor-pointer"
                    onClick={onHidePassword}
                  />
                ) : (
                  <TbEyeClosed
                    className="text-xl hover:cursor-pointer"
                    onClick={onShowPassword}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-y-1">
            <label className="text-sm font-semibold">Website</label>
            <p className="text-md font-light">{login.website}</p>
          </div>
          <div className="w-full flex flex-col gap-y-1">
            <label className="text-sm font-semibold">Created At</label>
            <p className="text-md font-light">{`${formatDate(
              login.createdAt
            )} ${formatTime(login.createdAt)}`}</p>
          </div>
          <div className="w-full flex flex-col gap-y-1">
            <label className="text-sm font-semibold">Updated At</label>
            <p className="text-md font-light">{`${formatDate(
              login.updatedAt
            )} ${formatTime(login.updatedAt)}`}</p>
          </div>
        </div>
      ) : null}

      <div className="flex gap-x-4 items-center">
        <button
          className="flex items-center bg=blue-200 text-white p-2"
          onClick={onDelete}
        >
          <TbTrashX />
          <span className="text-xs">Delete</span>
        </button>
        <Link
          to={`/password/edit/${login.uuid}`}
          className="flex items-center bg=blue-200 text-white p-2"
        >
          <TbTrashX />
          <span className="text-xs">Edit</span>
        </Link>
      </div>
    </div>
  );
}

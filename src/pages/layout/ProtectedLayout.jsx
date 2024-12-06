import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Sidebar from "../../components/sidebar";

export default function ProtectedLayout() {
  const { user, isFetching } = useAuth();

  console.log("USER", user);

  if (!user && !isFetching) {
    return <Navigate to="/signin" />;
  }

  if (!user && isFetching) {
    return <h1 className="">Loading...</h1>;
  }

  return (
    <div className="w-full h-full flex">
      <Sidebar />
      <Outlet />
    </div>
  );
}

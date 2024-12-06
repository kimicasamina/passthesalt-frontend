import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar";

export default function RootLayout() {
  return (
    <div className="w-full h-screen flex flex-col justify-between">
      <Navbar />
      <main className="w-full h-full mt-auto">
        <Outlet />
      </main>
    </div>
  );
}

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TbSquarePlus } from "react-icons/tb";
import { useAuth } from "../../context/auth";

export default function Searchbar() {
  const { setSearchKeyword } = useAuth();
  //   const [keyword, setKeyword] = useState("");
  return (
    <div className="w-full max-w-[50%] flex items-center gap-x-4">
      <Link to="/password/create">
        <TbSquarePlus className="text-white text-2xl" />
      </Link>
      <input
        type="text"
        className="w-full rounded-sm px-2 py-1 text-xs text-neutral-500"
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
    </div>
  );
}

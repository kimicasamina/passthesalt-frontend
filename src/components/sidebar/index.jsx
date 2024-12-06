import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SearchItems from "./search-items";

export default function Sidebar() {
  const { user, searchKeyword } = useAuth();
  const location = useLocation();
  const path = location.pathname.split("/");

  return (
    <div className="h-full w-[250px] p-4 bg-neutral-300 ">
      <div className="w-full h-full flex flex-col gap-y-2 overflow-y-scroll hideScrollbar">
        {searchKeyword !== "" ? (
          <SearchItems />
        ) : (
          user.logins.map((login, index) => (
            <Link
              to={`/password/${login?.uuid}`}
              key={index}
              className={`w-full py-1 font-normal text-sm hover:text-neutral-600 ${
                path[2] === login.uuid
                  ? "text-neutral-600 font-medium"
                  : "text-primary"
              }`}
            >
              <span className="">{login?.name}</span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

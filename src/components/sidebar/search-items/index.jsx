import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/auth";
import { useLocation } from "react-router-dom";

export default function SearchItems() {
  const { user, searchKeyword } = useAuth();
  const [searchItem, setSearchItem] = useState([]);
  const location = useLocation();
  const path = location.pathname.split("/");

  useEffect(() => {
    const logins = user.logins.filter((login) => {
      if (login.name.toLowerCase().includes(searchKeyword.toLowerCase())) {
        return login;
      }
    });
    setSearchItem(logins);
  }, [searchKeyword]);

  if (searchItem.length === 0 || null) {
    return null;
  }

  return (
    <ul className="w-full h-full">
      {searchItem.map((login, index) => (
        <Link
          to={`/password/${login.uuid}`}
          key={index}
          className={`w-full py-1 font-normal text-sm hover:text-neutral-600 ${
            path[2] === login.uuid
              ? "text-neutral-600 font-medium"
              : "text-primary"
          }`}
        >
          <span className="">{login.name}</span>
        </Link>
      ))}
    </ul>
  );
}

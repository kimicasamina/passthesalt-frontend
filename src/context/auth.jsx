import React, { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    async function fetchData() {
      if (!user) {
        try {
          const { data } = await axios.get("/api/auth/");
          console.log("AUTH USER DATA: ", data);
          if (data) {
            setUser(data.user);
          }
          setIsFetching(false);
        } catch (err) {
          console.log(err);
          setError(err.message);
        } finally {
          setIsFetching(false);
        }
      }
    }

    fetchData();
  }, []);

  function logoutUser() {
    setUser(null);
  }

  function loginUser(user) {
    setUser(user);
  }

  function addLogin(login) {
    const newLogins = [...user.logins, login];
    console.log("new Logins:", newLogins);
    setUser({
      ...user,
      logins: newLogins,
    });
  }

  function deleteLogin(loginUuid) {
    const newLogins = user.logins.filter((login) => login.uuid !== loginUuid);
    console.log("new login: ", newLogins);
    setUser({
      ...user,
      logins: [...newLogins],
    });
  }

  function updateLogin(newLogin) {
    const updatedLogins = user.logins.map((login) => {
      if (login.uuid === newLogin.uuid) {
        return newLogin;
      }
      return login;
    });
    setUser({
      ...user,
      logins: updatedLogins,
    });
  }

  return (
    <authContext.Provider
      value={{
        user,
        setUser,
        isFetching,
        setIsFetching,
        loginUser,
        logoutUser,
        deleteLogin,
        addLogin,
        updateLogin,
        searchKeyword,
        setSearchKeyword,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};

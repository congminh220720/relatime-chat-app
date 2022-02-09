import React, { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { useHistory } from "react-router-dom";
import { Spin } from "antd";

export const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const unsubscibe = auth.onAuthStateChanged((userInfo) => {
      if (userInfo) {
        const { displayName, uid, photoURL } = userInfo;
        setUser({ displayName, uid, photoURL });
        setIsLoading(false);
        history.push("/");
        return;
      }
      setIsLoading(false);
      history.push("/login");
    });

    return () => {
      unsubscibe();
    };
  }, [history]);

  return (
    <AuthContext.Provider value={user}>
      {isLoading ? <Spin /> : children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

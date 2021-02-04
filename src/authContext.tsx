import React, { useEffect, useState, useContext, createContext } from "react";
import firebase from "./firebaseConfig";

type AuthStatus = "loading" | "logged-in-verified" | "not-verified" | "logged-out";

const AuthContext = createContext<AuthStatus>("loading");
const UpdateAuthContext = createContext<React.Dispatch<React.SetStateAction<AuthStatus>> | null>(
  null
);

export const AuthProvider: React.FC = ({ children }) => {
  const [loggedInStatus, setLoggedInStatus] = useState<AuthStatus>("loading");

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser && firebaseUser.emailVerified) {
        setLoggedInStatus("logged-in-verified");
      } else if (firebaseUser && !firebaseUser.emailVerified) {
        setLoggedInStatus("not-verified");
      } else {
        setLoggedInStatus("logged-out");
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={loggedInStatus}>
      <UpdateAuthContext.Provider value={setLoggedInStatus}>{children}</UpdateAuthContext.Provider>
    </AuthContext.Provider>
  );
};

export const useVerifyUser = () => {
  return useContext(AuthContext);
};

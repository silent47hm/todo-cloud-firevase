import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

// ✅ Exporting the context itself for use in custom hook
export const AuthContext = createContext();

// ✅ Provider component for wrapping your app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); // Loading flag while checking session

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user, authLoading }}>
      {!authLoading && children}
    </AuthContext.Provider>
  );
};

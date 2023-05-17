import auth from "@/firebase/auth";
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { createContext, useContext, useEffect, useState } from "react";

type authContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => void;
  signUp: (email: string, password: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<authContextType>({
  user: null,
  loading: true,
  error: null,
  signIn: () => {},
  signUp: () => {},
  signOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  const signIn = async (email: string, password: string) => {
    try {
      signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setError(error.message);
    }
  };
  const signUp = async (email: string, password: string) => {
    try {
      createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setError(error.message);
    }
  };
  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error: any) {
      setError(error.message);
    }
  };
  const value: authContextType = {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

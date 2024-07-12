import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

type AuthContextType = {
  user: boolean | null;
  setUser: (user: boolean | null) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
}

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<boolean | null>(false);

  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:4000/auth/me", {
        withCredentials: true,
      });
      if (response.data) setUser(true);

      console.log(response.data);
      return response.data;
    },
  });

  // if (isSuccess) {
  //   if (data) setUser(data);
  // }

  if (isLoading) {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <span className="loading loading-bars loading-xs"></span>
        <span className="loading loading-bars loading-sm"></span>
        <span className="loading loading-bars loading-md"></span>
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  const value: AuthContextType = {
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

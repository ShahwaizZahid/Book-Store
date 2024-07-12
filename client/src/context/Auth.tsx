import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

// Define a type for the user state
type User = {
  user: boolean;
  userId: string | null;
};

// Define the context type with proper type for `user` and `setUser`
type AuthContextType = {
  user: User;
  setUser: (user: User) => void;
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
  const [user, setUser] = useState<User>({ user: false, userId: null });

  const { data, isLoading, error, isSuccess } = useQuery<User, AxiosError>({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:4000/auth/me", {
        withCredentials: true,
      });

      console.log(response.data.user.token);
      if (response.data)
        setUser({ user: true, userId: response.data.user.token });

      return response.data;
      return {
        user: true,
        userId: response.data.token,
      };
    },
  });

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

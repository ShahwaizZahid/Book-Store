// import { createContext, useContext, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import axios, { AxiosError } from "axios";

// import { useLocalStorage } from "@/hooks/useLocalStorage";
// import { toast } from "sonner";
// import { useThemeContext } from "./ThemeProvider";

// export type User = {
//   id: string;
//   email: string;
//   profilePicture: string;
//   username: string;
//   biography: string;
//   hasNoCategories?: boolean;
// };

// type AuthContextType = {
//   user: User | null;
//   setUser: (user: User | null) => void;
//   setHasSession: (newValue: boolean) => void;
// };

// const AuthContext = createContext<AuthContextType | null>(null);

// export function useAuthContext() {
//   return useContext(AuthContext)!;
// }

// export function AuthContextProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [hasSession, setHasSession] = useLocalStorage("has-session", false);
//   const { isDark } = useThemeContext();

//   const existingSessionQuery = useQuery<User, AxiosError>({
//     queryKey: ["user"],
//     queryFn: async () => {
//       return (
//         await axios.get(`/api/users/me`, {
//           withCredentials: true,
//         })
//       ).data;
//     },
//     refetchOnWindowFocus: false,
//     enabled: !user && hasSession,
//   });

//   if (existingSessionQuery.isLoading) {
//     return <span className="loading loading-infinity loading-md"></span>;
//   }

//   if (existingSessionQuery.isError) {
//     window.location.pathname = "/login";

//     if (
//       existingSessionQuery.error.response &&
//       existingSessionQuery.error.response.data &&
//       typeof existingSessionQuery.error.response.data === "object" &&
//       "message" in existingSessionQuery.error.response.data &&
//       typeof existingSessionQuery.error.response.data.message === "string"
//     ) {
//       setHasSession(false);
//       return toast.error(existingSessionQuery.error.response.data.message);
//     } else {
//       return toast.error(existingSessionQuery.error.cause?.message);
//     }
//   }

//   if (existingSessionQuery.data && !user) {
//     setUser(existingSessionQuery.data);
//   }

//   const value: AuthContextType = {
//     user,
//     setUser,
//     setHasSession,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

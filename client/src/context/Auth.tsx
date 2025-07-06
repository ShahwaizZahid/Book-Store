import React, { createContext, useContext, useState, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { API_URL } from "../config";
import {
  User,
  AuthContextType,
  SessionData,
  ApiResponse,
} from "../hooks/DataTypes";

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
  const queryClient = useQueryClient();

  const { isLoading, error } = useQuery<ApiResponse<SessionData>, AxiosError>({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${API_URL}/me`, {
          withCredentials: true,
        });
        return response.data;
      } catch (error: any) {
        // If 401, user is not authenticated - this is expected
        if (error.response?.status === 401) {
          return { success: false, user: null };
        }
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error: any) => {
      // Don't retry on 401 errors
      if (error?.response?.status === 401) {
        return false;
      }
      return failureCount < 2;
    },
  });

  // Update user state when query data changes
  React.useEffect(() => {
    if (isLoading) return;

    if (error?.response?.status === 401) {
      setUser({ user: false, userId: null });
      return;
    }

    // Handle successful response
    const queryData = queryClient.getQueryData<ApiResponse<SessionData>>([
      "auth",
      "me",
    ]);
    if (queryData?.success && queryData.user) {
      setUser({
        user: true,
        userId: queryData.user.token,
        userData:
          typeof queryData.user.userId === "object"
            ? queryData.user.userId
            : undefined,
      });
    } else {
      setUser({ user: false, userId: null });
    }
  }, [isLoading, error, queryClient]);

  const logout = useCallback(async () => {
    try {
      await axios.post(
        `${API_URL}/logout`,
        { userId: user.userId },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser({ user: false, userId: null });
      queryClient.clear();
    }
  }, [user.userId, queryClient]);

  // Show loading only on initial load, not on every navigation
  if (isLoading && !queryClient.getQueryData(["auth", "me"])) {
    return (
      <div className="flex min-h-screen justify-center items-center bg-gray-50 dark:bg-slate-900">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-2">
            <span className="loading loading-bars loading-xs"></span>
            <span className="loading loading-bars loading-sm"></span>
            <span className="loading loading-bars loading-md"></span>
            <span className="loading loading-bars loading-lg"></span>
          </div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  const value: AuthContextType = {
    user,
    setUser,
    isLoading,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

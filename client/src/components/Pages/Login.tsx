import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoginFormData, AuthResponse } from "../../hooks/DataTypes";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/Auth";
import { API_URL } from "../../config";

export default function Login() {
  const loginMutation = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginMutation.mutateAsync(data);
    } catch (error) {
      console.error("Login error: ", error);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-8 border border-gray-200 dark:border-slate-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome Back
            </h3>
            <Link
              to="/"
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Link>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Password
              </label>
              <div className="flex border border-gray-300 dark:border-slate-600 rounded-lg overflow-hidden bg-white dark:bg-slate-700">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                      message:
                        "Include uppercase, lowercase, number & special character",
                    },
                  })}
                  className="w-full px-4 py-3 outline-none bg-transparent dark:text-white"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="px-4 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-3 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition-all duration-200"
              >
                {!loginMutation.isPending ? (
                  "Login"
                ) : (
                  <span className="loading loading-infinity loading-md"></span>
                )}
              </button>
            </div>

            {/* Feedback Message */}
            {(loginMutation.isSuccess || loginMutation.isError) && (
              <div
                className={`text-center text-sm mt-2 ${
                  loginMutation.isSuccess ? "text-blue-600" : "text-red-600"
                }`}
              >
                {loginMutation.data?.message}
                {
                  (loginMutation.error?.response?.data as { message?: string })
                    ?.message
                }
              </div>
            )}

            {/* Signup Prompt */}
            <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
              Not registered?{" "}
              <Link
                to="/signup"
                className="text-blue-600 dark:text-blue-400 font-medium underline underline-offset-4"
              >
                Create an account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function useLogin() {
  const navigate = useNavigate();
  const { setUser } = useAuthContext()!;

  return useMutation<AuthResponse, AxiosError, LoginFormData>({
    mutationKey: ["login"],
    mutationFn: async ({ email, password }) => {
      const res = await axios.post(
        `${API_URL}/login`,
        { email, password },
        { withCredentials: true }
      );
      setUser({ user: true, userId: res.data.user._id });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Login successful!");
      navigate("/courses", { replace: true });
      console.log("Login successfully");
    },
    onError: (error) => {
      console.error("Login failed: ", error);

      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        "An error occurred during login";
      toast.error(errorMessage);
    },
  });
}

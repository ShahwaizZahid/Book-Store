import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { SignupFormData, AuthResponse } from "../../hooks/DataTypes";
import toast from "react-hot-toast";
import { API_URL } from "../../config";

export default function SignUp() {
  const signupMutation = useSignup();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();

  const onSubmit = async (data: SignupFormData) => {
    try {
      await signupMutation.mutateAsync(data);
    } catch (err) {
      console.error(err);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-800 shadow-2xl rounded-2xl p-8 border border-gray-200 dark:border-slate-700">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Create Account
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

            {/* Full Name */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <div className="w-full flex bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md overflow-hidden">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  className="w-[80%] px-4 py-3 dark:bg-slate-700 dark:text-white outline-none"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                      message:
                        "Password must include uppercase, lowercase, number, and special character",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="w-[20%] text-sm text-gray-600 dark:text-white bg-gray-100 dark:bg-slate-700"
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
                disabled={signupMutation.isPending || signupMutation.isSuccess}
                className="w-full py-3 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition-all duration-200"
              >
                {signupMutation.isPending ? (
                  <span className="loading loading-infinity loading-md"></span>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
            <p>
              Already have an account?{" "}
              <span className="cursor-pointer underline underline-offset-4 text-blue-500">
                <Link to="/login">Login</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

function useSignup() {
  const navigate = useNavigate();

  return useMutation<AuthResponse, AxiosError, SignupFormData>({
    mutationKey: ["signup"],
    mutationFn: async ({ email, password, name }) => {
      const res = await axios.post(
        `${API_URL}/signup`,
        { email, password, name },
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: (_, { email }) => {
      toast.success("Signup successful!");
      navigate("/otp", {
        replace: true,
        state: { email },
      });
    },
    onError: (error) => {
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        "An error occurred during signup";
      toast.error(errorMessage);
    },
  });
}

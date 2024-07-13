import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { SignupFormData } from "../../hooks/DataTypes";
import toast from "react-hot-toast";
import { API_URL } from "../../config";

export default function SignUp() {
  const signupMutation = useSignup();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    await signupMutation.mutateAsync(data);
    console.log("measss", signupMutation?.data?.message);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="w-[600px] shadow-lg border-[2px] p-5 rounded-lg">
          <div className="model-box dark:bg-slate-900 dark:text-white dark:border-white">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-between">
                <h3 className="font-bold text-lg">Signup</h3>
                <Link to="/" className="btn btn-sm btn-circle btn-ghost">
                  ✕
                </Link>
              </div>

              {/* Name */}
              <div className="mt-4 space-y-2">
                <label htmlFor="name">Name:</label>
                <br />
                <input
                  type="text"
                  {...register("name", { required: true })}
                  id="name"
                  placeholder="Enter your name"
                  className="w-80 dark:bg-slate-900 dark:text-white px-3 border py-1 rounded-md outline-none"
                />
                <br />

                {errors.name && (
                  <span className="text-red-500">Name is required</span>
                )}
              </div>

              {/* Email */}
              <div className="mt-4 space-y-2">
                <label htmlFor="email">Email:</label>
                <br />
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address",
                    },
                  })}
                  id="email"
                  placeholder="Enter your email"
                  className="w-80 px-3 border dark:bg-slate-900 dark:text-white py-1 rounded-md outline-none"
                />
                <br />
                {errors.email && (
                  <span className="text-red-500">
                    {typeof errors.email.message === "string"
                      ? errors.email.message
                      : "Invalid email"}
                  </span>
                )}
              </div>

              {/* Password */}
              <div className="mt-4 space-y-2">
                <label htmlFor="password">Password:</label>
                <br />
                <div className="w-80 flex bg-white border rounded-md  overflow-hidden ">
                  <input
                    type={showPassword ? "text" : "password"}
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
                          "Password must contain uppercase, lowercase, number, and special character",
                      },
                    })}
                    id="password"
                    placeholder="Enter your password"
                    className="w-[80%] dark:bg-slate-900 dark:text-white px-3 py-1 outline-none "
                  />
                  <br />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className=" dark:bg-slate-900 dark:text-white w-[20%]"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <br />
                {errors.password && (
                  <span className="text-red-500">
                    {typeof errors.password.message === "string"
                      ? errors.password.message
                      : "Invalid password"}
                  </span>
                )}
              </div>

              {/* Button */}
              <div className="flex justify-around mt-4">
                <button
                  disabled={
                    signupMutation.isPending || signupMutation.isSuccess
                  }
                  type="submit"
                  className="bg-pink-500 text-white px-3 py-1 hover:bg-pink-700 rounded-md"
                >
                  {!signupMutation.isPending ? (
                    "Signup"
                  ) : (
                    <span className="loading loading-infinity loading-md"></span>
                  )}
                </button>

                {/* If have account */}
                <div>
                  Have account?{" "}
                  <span className="cursor-pointer underline underline-offset-4 text-blue-500">
                    <Link to="/login" className="underline underline-offset-4">
                      Login
                    </Link>
                  </span>
                </div>
              </div>
              {(signupMutation.isSuccess || signupMutation.isError) && (
                <div
                  className={` my-2  ${
                    signupMutation?.data?.message
                      ? "text-blue-600"
                      : "text-red-600"
                  }`}
                >
                  {signupMutation?.data?.message}
                  {(signupMutation?.error?.response?.data as any)?.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

function useSignup() {
  const navigate = useNavigate();

  return useMutation<any, AxiosError, SignupFormData>({
    mutationKey: ["signup"],
    mutationFn: async ({ email, password, name }) => {
      const res = await axios.post(
        `${API_URL}/signup`,
        {
          email,
          password,
          name,
        },
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: (_, { email }) => {
      toast.success("Signup successful!");
      navigate("/otp", {
        replace: true,
        state: {
          email,
        },
      });
    },
    onError: (error) => {
      console.error("Signup failed: ", error);

      // Type assertion for error response
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        "An error occurred during signup";

      toast.error(errorMessage);
    },
  });
}

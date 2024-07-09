import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
export default function Login() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
    // Handle form submission here
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[600px] ">
        <div className="modal-box dark:bg-slate-900 dark:text-white">
          <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
            {/* Close button */}
            <div>
              {isHomePage ? (
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              ) : (
                <Link
                  to="/"
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >
                  ✕
                </Link>
              )}
            </div>

            <h3 className="font-bold text-lg">Login!</h3>

            {/* Email */}
            <div className="mt-4 space-y-2">
              <label htmlFor="email">Email:</label>
              <br />
              <input
                type="text"
                id="email"
                placeholder="Enter your email"
                className="w-80 px-3 border py-1 rounded-md outline-none"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
              />
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
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-80 px-3 border py-1 rounded-md outline-none"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                    message:
                      "Password must contain uppercase, lowercase, number, and special character",
                  },
                })}
              />
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
                type="submit"
                className="bg-pink-500 text-white px-3 py-1 hover:bg-pink-700 rounded-md"
              >
                Login
              </button>
              {/* If not have a account */}
              <p>
                Not registered?{" "}
                <span className="cursor-pointer underline underline-offset-4 text-blue-500">
                  <Link to="/signup">Signup</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

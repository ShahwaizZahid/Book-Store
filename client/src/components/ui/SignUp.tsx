import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data); // Replace with your form submission logic
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="w-[600px] shadow-lg border-[2px] p-5 rounded-lg">
          <div className="model-box dark:bg-slate-900 dark:text-white">
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
                  className="w-80 px-3 border py-1 rounded-md outline-none"
                />
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
                  className="w-80 px-3 border py-1 rounded-md outline-none"
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
                  className="w-80 px-3 border py-1 rounded-md outline-none"
                />
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
                  type="submit"
                  className="bg-pink-500 text-white px-3 py-1 hover:bg-pink-700 rounded-md"
                >
                  Signup
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

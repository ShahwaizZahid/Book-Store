import { Link } from "react-router-dom";
import Login from "./Login";

export default function SignUp() {
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="w-[600px] shadow-lg border-[2px] p-5 rounded-lg">
          <div className="model-box dark:bg-slate-900 dark:text-white">
            <form>
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
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  className="w-80 px-3 border py-1 rounded-md outline-none"
                />
              </div>

              {/* Email */}
              <div className="mt-4 space-y-2">
                <label htmlFor="email">Email:</label>
                <br />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-80 px-3 border py-1 rounded-md outline-none"
                />
              </div>

              {/* Password */}
              <div className="mt-4 space-y-2">
                <label htmlFor="password">Password:</label>
                <br />
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-80 px-3 border py-1 rounded-md outline-none"
                />
              </div>

              {/* Button */}
              <div className="flex justify-around mt-4">
                <button className="bg-pink-500 text-white px-3 py-1 hover:bg-pink-700 rounded-md">
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

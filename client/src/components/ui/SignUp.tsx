export default function SignUp() {
  return (
    <>
      <div className="">
        <div id="my_modal_1" className="modal ">
          <div className="modal-box dark:bg-slate-900 dark:text-white">
            <h3 className="font-bold text-lg">Login!</h3>

            {/* Email */}
            <div className="mt-4 space-y-2">
              <label htmlFor="email">Email:</label>
              <br />
              <input
                type="text"
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
                type="text"
                name="password"
                id="password"
                placeholder="Enter your email"
                className="w-80 px-3 border py-1 rounded-md outline-none"
              />
            </div>

            {/*Button  */}
            <div className="flex justify-around mt-4">
              <button className="bg-pink-500 text-white px-3 py-1 hover-bg-pink-700 rounded-md">
                Login
              </button>
              <p>
                Not register?{" "}
                <span className=" cursor-pointer underline underline-offset-4 text-blue-500 ">
                  {/* <Link to="/signup"> Signup</Link> */}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

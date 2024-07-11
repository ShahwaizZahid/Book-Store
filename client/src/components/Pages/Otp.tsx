import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { OTPFormData } from "../../hooks/DataTypes";

const OtpInput = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const OTPVerifyMutation = useOTPVerifyMutation();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (element: any, index: any) => {
    if (isNaN(element.value)) return;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Move to next input
    if (element.value !== "" && index < 5) {
      const nextInput = inputRefs.current[index + 1];
      nextInput?.focus(); // Use optional chaining to focus if nextInput exists
    }
  };

  const handleKeyDown = (event: any, index: any) => {
    if (event.key === "Backspace" && index > 0 && otp[index] === "") {
      const nextInput = inputRefs.current[index - 1];
      nextInput?.focus();
    }
  };

  useEffect(() => {
    if (otp.join("").length === 6) {
      const joinOtp = otp.join("");
      sendOtpToServer({ otp: joinOtp });
      setOtp(["", "", "", "", "", ""]);
      const nextInput = inputRefs.current[0];
      nextInput?.focus();
    }
    // Reset otp state after sending to server
  }, [otp]);

  const sendOtpToServer = async (data: any) => {
    console.log(state.email);
    console.log(data);

    // Create a new data object that includes the email
    const newData = { ...data, email: state.email };

    await OTPVerifyMutation.mutateAsync(newData);
  };
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white min-h-screen ">
        <div className="flex flex-col justify-center items-center ">
          <h1 className="my-8 text-center font-bold text-5xl mt-36">
            OTP Verification
          </h1>
          <p className="my-4 font-semibold md:w-[60%] w-[80%]">
            Please enter the one-time password sent to your email:{" "}
            <span className="text-pink-500">{state.email}</span>
          </p>
          <div className=" flex justify-center items-center ">
            <div className="space-x-2">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center  dark:text-black dark:border-2  border border-gray-400 rounded-md mt-8 my-4"
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                />
              ))}
              {(OTPVerifyMutation.isSuccess || OTPVerifyMutation.isError) && (
                <div
                  className={`  ${
                    OTPVerifyMutation?.data?.message
                      ? "text-blue-600"
                      : "text-red-600"
                  }`}
                >
                  {OTPVerifyMutation?.data?.message}
                  {(OTPVerifyMutation?.error?.response?.data as any)?.message}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="items-center text-center flex justify-center my-28">
          <p className="md:w-[60%] w-[80%] ">
            Upon initiating account verification, a 6-digit verification code is
            automatically generated and sent to the contact information
            associated with your account (either via email). Please enter this
            code in the provided field be80%low to complete the verification
            process. This step ensures the security and integrity of your
            account information.
          </p>
        </div>
      </div>
    </>
  );
};

export default OtpInput;

function useOTPVerifyMutation() {
  const navigate = useNavigate();

  return useMutation<any, AxiosError, OTPFormData>({
    mutationKey: ["otp"],
    mutationFn: async (data) => {
      return (await axios.post(`http://localhost:4000/auth/verify-email`, data))
        .data;
    },
    onSuccess: (_, { email }) => {
      navigate("/login", {
        replace: true,
        state: {
          email,
        },
      });
    },
  });
}

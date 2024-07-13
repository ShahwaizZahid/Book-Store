import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { OTPFormData } from "../../hooks/DataTypes";
import toast from "react-hot-toast";
import { API_URL } from "../../config";

const OtpInput = () => {
  const [enable, setEnable] = useState(true);
  const { state } = useLocation();
  const OTPVerifyMutation = useOTPVerifyMutation();
  const OtpAgainMutation = useOAgainOtpMutation();

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (element: any, index: any) => {
    if (isNaN(element.value)) return;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.value !== "" && index < 5) {
      const nextInput = inputRefs.current[index + 1];
      nextInput?.focus();
    }
  };

  const handleKeyDown = (event: any, index: any) => {
    if (event.key === "Backspace" && index > 0 && otp[index] === "") {
      const nextInput = inputRefs.current[index - 1];
      nextInput?.focus();
    }
  };

  useEffect(() => {
    if (OtpAgainMutation.isSuccess) {
      setEnable(true);
    }
  }, [OtpAgainMutation.isSuccess]);

  useEffect(() => {
    setTimeout(() => {
      setEnable(false);
    }, 60000);
  }, [enable]);

  useEffect(() => {
    if (otp.join("").length === 6) {
      const joinOtp = otp.join("");
      sendOtpToServer({ otp: joinOtp });
      setOtp(["", "", "", "", "", ""]);
      const nextInput = inputRefs.current[0];
      nextInput?.focus();
    }
  }, [otp]);

  const sendOtpToServer = async (data: any) => {
    const newData = { ...data, email: state.email };
    await OTPVerifyMutation.mutateAsync(newData);
  };

  const sendEmailToserver = async () => {
    const demo = { otp: "123345" };
    const newData = { ...demo, email: state.email };
    await OtpAgainMutation.mutateAsync(newData);
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
          <div className="flex justify-center items-center ">
            <div className="space-x-2">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center dark:text-black dark:border-2 border border-gray-400 rounded-md mt-8 my-2"
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                />
              ))}
              <br />
              <button
                disabled={enable}
                onClick={sendEmailToserver}
                className={`${
                  enable ? "text-gray-300" : "text-blue-500"
                } hover:text-pink-500 hover:scale-105 cursor-pointer text-sm`}
              >
                Again send code
              </button>
            </div>
          </div>
        </div>

        <div className="items-center text-center flex justify-center my-28">
          <p className="md:w-[60%] w-[80%] ">
            Upon initiating account verification, a 6-digit verification code is
            automatically generated and sent to the contact information
            associated with your{" "}
            <span className="text-pink-500 font-bold">
              Email: {state.email}
            </span>{" "}
            . Please enter this code in the provided field below to complete the
            verification process. This step ensures the security and integrity
            of your account information.
          </p>
        </div>
      </div>
    </>
  );
};

type Data = {
  email: any;
};

export default OtpInput;

function useOTPVerifyMutation() {
  const navigate = useNavigate();

  return useMutation<any, AxiosError, Data>({
    mutationKey: ["otp"],
    mutationFn: async (data) => {
      return (await axios.post(`${API_URL}/verify-email`, data)).data;
    },
    onSuccess: (_, { email }) => {
      toast.success("OTP verified successfully!");
      navigate("/login", {
        replace: true,
        state: {
          email,
        },
      });
    },
    onError: (error) => {
      console.error("OTP verification failed: ", error);

      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        "An error occurred during OTP verification";

      toast.error(errorMessage);
    },
  });
}

function useOAgainOtpMutation() {
  return useMutation<any, AxiosError, OTPFormData>({
    mutationKey: ["otp"],
    mutationFn: async (data) => {
      return (await axios.post(`${API_URL}/otp-again`, data)).data;
    },
    onSuccess: () => {
      toast.success("OTP sent again successfully!");
    },
    onError: (error) => {
      console.error("Sending OTP again failed: ", error);

      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        "An error occurred while sending OTP again";

      toast.error(errorMessage);
    },
  });
}

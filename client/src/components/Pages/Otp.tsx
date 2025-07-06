import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { API_URL } from "../../config";
import { OTPFormData } from "../../hooks/DataTypes";

const OtpInput = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [enableResend, setEnableResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { state } = useLocation();

  const OTPVerifyMutation = useOTPVerifyMutation();
  const OtpAgainMutation = useResendOTPMutation();

  const email = (state as { email: string })?.email || "";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const resetOtp = () => {
    setOtp(Array(6).fill(""));
    inputRefs.current[0]?.focus();
  };

  const submitOtp = async () => {
    const joinedOtp = otp.join("");
    if (joinedOtp.length === 6) {
      await OTPVerifyMutation.mutateAsync({ email, otp: joinedOtp });
      resetOtp();
    }
  };

  const handleResend = async () => {
    await OtpAgainMutation.mutateAsync({ email, otp: "000000" }); // Dummy OTP, not used by server
    setEnableResend(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => setEnableResend(true), 60000);
    return () => clearTimeout(timer);
  }, [OtpAgainMutation.isSuccess]);

  useEffect(() => {
    if (otp.every((val) => val.length === 1)) {
      submitOtp();
    }
  }, [otp]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-800 shadow-2xl rounded-2xl p-8 border border-gray-200 dark:border-slate-700">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Verify Your Email
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              We've sent a 6-digit verification code to:
            </p>
            <p className="text-blue-600 dark:text-blue-400 font-semibold">
              {email}
            </p>
          </div>

          <div className="flex justify-center mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center mx-1 text-lg text-gray-900 dark:text-white border border-gray-400 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 focus:ring-2 ring-blue-500 outline-none"
              />
            ))}
          </div>

          <div className="text-center">
            <button
              disabled={!enableResend || OtpAgainMutation.isPending}
              onClick={handleResend}
              className={`text-sm font-medium transition-colors ${
                enableResend
                  ? "text-blue-600 hover:text-pink-500"
                  : "text-gray-400 cursor-not-allowed"
              }`}
            >
              {OtpAgainMutation.isPending ? "Sending..." : "Resend Code"}
            </button>
          </div>
        </div>

        <div className="text-center mt-12 text-sm text-gray-700 dark:text-gray-300 px-6">
          A 6-digit OTP has been sent to your{" "}
          <span className="text-pink-500 font-semibold">email</span>. Enter it
          above to verify your account and continue.
        </div>
      </div>
    </div>
  );
};

export default OtpInput;

// Types
interface VerifyOTPData {
  email: string;
  otp: string;
}

// Mutation for verifying OTP
function useOTPVerifyMutation() {
  const navigate = useNavigate();

  return useMutation<unknown, AxiosError<{ message?: string }>, VerifyOTPData>({
    mutationKey: ["verify-otp"],
    mutationFn: async (data) => {
      const response = await axios.post(`${API_URL}/verify-email`, data);
      return response.data;
    },
    onSuccess: (_, { email }) => {
      toast.success("OTP verified successfully!");
      navigate("/login", {
        replace: true,
        state: { email },
      });
    },
    onError: (error) => {
      const errorMsg =
        error.response?.data?.message || "OTP verification failed.";
      toast.error(errorMsg);
    },
  });
}

// Mutation for resending OTP
function useResendOTPMutation() {
  return useMutation<unknown, AxiosError<{ message?: string }>, OTPFormData>({
    mutationKey: ["resend-otp"],
    mutationFn: async (data) => {
      const response = await axios.post(`${API_URL}/otp-again`, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("OTP sent again successfully!");
    },
    onError: (error) => {
      const errorMsg = error.response?.data?.message || "Failed to resend OTP.";
      toast.error(errorMsg);
    },
  });
}

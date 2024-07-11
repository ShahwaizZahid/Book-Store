import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

type OTPFormData = {
  email: string;
  otp: string;
};
export default function Otp() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const OTPVerifyMutation = useOTPVerifyMutation();

  const verifyEmailAndOTP = async (data: OTPFormData) => {
    console.log(data);
    console.log(state.email);

    // Create a new data object that includes the email
    const newData = { ...data, email: state.email };

    await OTPVerifyMutation.mutateAsync(newData);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OTPFormData>();

  useEffect(() => {
    if (!state || state?.email === undefined) {
      navigate("/", { replace: true });
    }
  }, []);

  if (!state || state?.email === undefined) return null;
  return (
    <>
      <form onSubmit={handleSubmit(verifyEmailAndOTP)}>
        <div>
          <label htmlFor="otp">OTP</label>
          <input
            id="otp"
            type="number"
            {...register("otp", {
              required: "OTP is required",
              minLength: {
                value: 6,
                message: "OTP must be at least 6 length",
              },
              maxLength: {
                value: 6,
                message: "OTP maximum 6 length",
              },
            })}
          />
          {errors.otp && <p>{errors.otp.message}</p>}
        </div>
        <button
          type="submit"
          disabled={OTPVerifyMutation.isPending || OTPVerifyMutation.isSuccess}
          className="w-full"
        >
          {!OTPVerifyMutation.isPending ? (
            "verify"
          ) : (
            <div className="text-black">......Loading</div>
            // <LoadingSpinner
            //   className="text-white dark:text-black"
            //   isDark={isDark}
            // />
          )}
        </button>

        {(OTPVerifyMutation.isError || OTPVerifyMutation.isSuccess) && (
          <div
            className={`text-blue-600   ${
              OTPVerifyMutation?.data?.message
                ? "text-blue-600"
                : "text-red-600"
            }`}
          >
            {OTPVerifyMutation?.data?.message}
            {(OTPVerifyMutation.error?.response?.data as any)?.message}
          </div>
        )}
      </form>
    </>
  );
}

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

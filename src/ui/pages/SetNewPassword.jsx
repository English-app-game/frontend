import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BlueBox from "../components/BlueBox";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import Header from "../components/Header";
import {
  toggleShowPassword,
  handleInputChange,
} from "../../utils/handleRegister";
import { onSubmitNewPassword } from "../../utils/handleReset";

export default function SetNewPassword() {
  const [searchParams] = useSearchParams();
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState(null);
  const [token, setToken] = useState("");

  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmedPassword, setshowConfirmedPassword] = useState(false);

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[url('/homePage.png')] flex justify-center">
      <div className="pt-10 w-full">
        <BlueBox>
          <Header text="RESET YOUR PASSWORD" className="text-center" />
          <div className="mt-5 relative flex flex-col items-start">
            <div className="relative w-full">
              <InputField
                text="Enter your new password"
                value={form.newPassword}
                type={showPassword ? "text" : "password"}
                onChange={handleInputChange("newPassword", form, setForm)}
                error={errors.password}
              />
              <span
                className="absolute top-9 right-19 cursor-pointer text-gray-600"
                onClick={toggleShowPassword(showPassword, setshowPassword)}
              >
                👁️
              </span>
            </div>
            <div className="relative w-full">
              <InputField
                text="confirm your new password"
                value={form.confirmPassword}
                type={showConfirmedPassword ? "text" : "password"}
                onChange={handleInputChange("confirmPassword", form, setForm)}
                error={errors.confirmPassword}
              />
              <span
                className="absolute top-9 right-19 cursor-pointer text-gray-600"
                onClick={toggleShowPassword(
                  showConfirmedPassword,
                  setshowConfirmedPassword
                )}
              >
                👁️
              </span>
            </div>
            {serverMessage && (
              <p className="text-white mt-2">{serverMessage}</p>
            )}
            <PrimaryButton
              text={"CHANGE"}
              onClick={onSubmitNewPassword(
                { password: form.newPassword },
                { password: form.confirmPassword },
                setErrors,
                setServerMessage,
                token,
                navigate
              )}
              className="mt-10 float-right"
            />
          </div>
        </BlueBox>
      </div>
    </div>
  );
}

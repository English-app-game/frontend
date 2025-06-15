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
import { handleSubmitNewPassword } from "../../services/service";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
    <div className="min-h-screen bg-[url('/homePage.png')] bg-cover bg-center flex justify-center items-center px-4">
      <div className="pt-10 w-full">
        <BlueBox>
          <Header text="RESET YOUR PASSWORD" className="text-center" />
          <div className="mt-5 relative flex flex-col items-start">
            <div className="relative w-96">
              <InputField
                text="Enter your new password"
                value={form.newPassword}
                type={showPassword ? "text" : "password"}
                onChange={handleInputChange("newPassword", form, setForm)}
                error={errors.password}
              />
              <span
                className="absolute top-10 right-20 cursor-pointer text-white"
                onClick={() =>
                  toggleShowPassword(showPassword, setshowPassword)
                }
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="relative w-96">
              <InputField
                text="confirm your new password"
                value={form.confirmPassword}
                type={showConfirmedPassword ? "text" : "password"}
                onChange={handleInputChange("confirmPassword", form, setForm)}
                error={errors.confirmPassword}
              />
              <span
                className="absolute top-10 right-20 cursor-pointer text-white"
                onClick={() =>
                  toggleShowPassword(
                    showConfirmedPassword,
                    setshowConfirmedPassword
                  )
                }
              >
                {showConfirmedPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {serverMessage && (
              <p className="text-white mt-2">{serverMessage}</p>
            )}
            <PrimaryButton
              text={"CHANGE"}
              onClick={() =>
                handleSubmitNewPassword(
                  { password: form.newPassword },
                  { password: form.confirmPassword },
                  setErrors,
                  setServerMessage,
                  token,
                  navigate
                )
              }
              className="mt-10 float-right px-4 py-2"
            />
          </div>
        </BlueBox>
      </div>
    </div>
  );
}

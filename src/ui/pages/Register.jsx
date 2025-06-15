import BlueBox from "../components/BlueBox";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import Header from "../components/Header";
import SkeletonAvatar from "../components/SkeletonAvatar";
import { avatarList } from "../../assets/index.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  handleInputChange,
  handleAvatarClick,
  onSubmitRegister,
  toggleShowPassword,
} from "../../utils/handleRegister";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const navigate = useNavigate();
  const [dataform, setDataform] = useState({
    name: "",
    email: "",
    password: "",
    avatarImg: "",
    lastLogin: new Date(),
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setshowPassword] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-[url('/homePage.png')] bg-cover bg-center flex justify-center items-center px-4">
        <div className="pt-10 w-full">
          <BlueBox className="pr-3">
            <Header text="LETS MAKE YOUR ACCOUNT!" className="text-center pr-3" />
            <div className="pb-5">
              <InputField
                text="User"
                value={dataform.name}
                onChange={handleInputChange("name", dataform, setDataform)}
                error={errors.name}
              />
              {errors.general === "User name already in use" && (
                <p className="text-black text-sm mt-1">{errors.general}</p>
              )}
              <div className="relative w-96">
                <InputField
                  text="Password"
                  type={showPassword ? "text" : "password"}
                  value={dataform.password}
                  onChange={handleInputChange(
                    "password",
                    dataform,
                    setDataform
                  )}
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
              <InputField
                text="Email"
                value={dataform.email}
                onChange={handleInputChange("email", dataform, setDataform)}
                error={errors.email}
              />
              {errors.general === "Email already in use" && (
                <p className="text-black text-sm mt-1">{errors.general}</p>
              )}
              <PrimaryButton
                text="REGISTER"
                className="float-right mt-4 ml-4 px-4 py-2 mb-5"
                onClick={() => onSubmitRegister(dataform, setErrors, navigate)}
              />
            </div>
            <h3 className="text-white">Choose your Avatar:</h3>
            <div className="grid grid-cols-5 gap-1">
              {avatarList.map((src, index) => (
                <div
                  key={index}
                  onClick={() => {
                    const relativePath = src.replace(
                      window.location.origin,
                      ""
                    );
                    handleAvatarClick(relativePath, dataform, setDataform);
                  }}
                  className={`cursor-pointer rounded-xl ${
                    dataform.avatarImg === src.replace(window.location.origin, "") ? "ring-4 ring-green-500" : ""
                  }`}
                >
                  <SkeletonAvatar src={src} alt={`avatar-${index}`} />
                </div>
              ))}
            </div>
            {errors.avatarImg && (
              <p className="text-black text-sm mt-1">{errors.avatarImg}</p>
            )}
            {errors.general && (
              <p className="text-white text-sm mt-3">{errors.general}</p>
            )}
          </BlueBox>
        </div>
      </div>
    </>
  );
}

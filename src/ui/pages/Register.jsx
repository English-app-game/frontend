import AvatarImg from "../components/AvatarImg";
import BlueBox from "../components/BlueBox";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import Header from "../components/Header";
import * as avatars from "../../assets/index";
import { useState, useEffect } from "react";
import { handleRegister } from "../../utils/handleRegister";
import { useNavigate } from "react-router-dom";
import { handleInputChange, handleAvatarClick, onSubmitRegister, toggleShowPassword } from "../../utils/handleRegister";
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
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const imgPromises = Object.values(avatars).map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve;
        })
    );
    Promise.all(imgPromises).then(() => setImagesLoaded(true));
  }, []);

  return (
    <>
      <div className="min-h-screen bg-[url('/homePage.png')] flex justify-center">
        <div className="pt-10 w-full">
          <BlueBox className="pr-3 ">
            <Header text="LETS MAKE YOUR ACCOUNT!" className="text-center" />
            <div className="pb-5">
              <InputField
                text="User"
                value={dataform.name}
                onChange={
                  (handleInputChange("name", dataform, setDataform))
                }
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
                  onChange={
                    (handleInputChange("password", dataform, setDataform))
                  }
                  error={errors.password}
                />
                <span
                  className="absolute top-10 right-19 cursor-pointer text-white"
                  onClick={toggleShowPassword(showPassword, setshowPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <InputField
                text="Email"
                value={dataform.email}
                onChange={
                  (handleInputChange("email", dataform, setDataform))
                }
                error={errors.email}
              />
              {errors.general === "Email already in use" && (
                <p className="text-black text-sm mt-1">{errors.general}</p>
              )}
              <PrimaryButton
                text="REGISTER"
                className="float-right mt-4 ml-4"
                onClick={onSubmitRegister(dataform, setErrors, navigate)}
              />
            </div>
            <h3 className="text-white">Choose your Avatar:</h3>
            <div className="grid grid-cols-5 gap-1">
              {Object.entries(avatars).map(([key, src]) => (
                <div
                  key={key}
                  onClick={handleAvatarClick(src, dataform, setDataform)}
                  className={`cursor-pointer rounded-xl ${dataform.avatarImg === src ? "ring-4 ring-green-500" : ""
                    }`}
                >
                  {imagesLoaded ? (
                    <AvatarImg src={src} alt={key} />
                  ) : (
                    <div className="aspect-square w-full bg-white/30 rounded-xl border-white border-2 flex items-center justify-center">
                      <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
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

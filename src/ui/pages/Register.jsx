import AvatarImg from "../components/AvatarImg";
import BlueBox from "../components/BlueBox";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import Header from "../components/Header";
import * as avatars from "../../assets/index";
import { useState } from "react";
import {handleRegister} from "../../utils/handleRegister"
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [dataform, setDataform] = useState({
    name: "",
    email: "",
    password: "",
    avatarImg: "",
    lastLogin: new Date()
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setshowPassword] = useState(false);

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
                onChange={(e) =>
                  setDataform({ ...dataform, name: e.target.value })
                }
              />
              {errors.name && (
                <p className="text-black text-sm mt-1">{errors.name}</p>
              )}
              {errors.general === "User name already in use" && (
                <p className="text-black text-sm mt-1">{errors.general}</p>
              )}
              <div className="relative w-96">
                <InputField
                  text="Password"
                  type={showPassword ? "text" : "password"}
                  value={dataform.password}
                  onChange={(e) =>
                    setDataform({ ...dataform, password: e.target.value })
                  }
                />
                <span
                  className="absolute top-9 right-19 cursor-pointer text-gray-600"
                  onClick={() => setshowPassword(!showPassword)}
                >
                  👁️
                </span>
              </div>
              {errors.password && (
                <p className="text-black text-sm mt-1">{errors.password}</p>
              )}
              <InputField
                text="Email"
                value={dataform.email}
                onChange={(e) =>
                  setDataform({ ...dataform, email: e.target.value })
                }
              />
              {errors.email && (
                <p className="text-black text-sm mt-1">{errors.email}</p>
              )}
              {errors.general === "Email already in use" && (
                <p className="text-black text-sm mt-1">{errors.general}</p>
              )}
              <PrimaryButton
                text="REGISTER"
                className="float-right mt-4 ml-4"
                onClick={() => {
                  handleRegister(dataform,setErrors,navigate);
                }}
              />
            </div>
            <h3 className="text-white">Choose your Avatar:</h3>
            <div className="grid grid-cols-5 gap-1">
              {Object.entries(avatars).map(([key, src]) => (
                <div
                  key={key}
                  onClick={() => setDataform({ ...dataform, avatarImg: src })}
                  className={`cursor-pointer rounded-xl ${
                    dataform.avatarImg === src ? "ring-4 ring-green-500" : ""
                  }`}
                >
                  <AvatarImg key={key} src={src} alt={key} />
                </div>
              ))}
            </div>
            {errors.avatarImg && (
              <p className="text-black text-sm mt-1">{errors.avatarImg}</p>
            )}
          </BlueBox>
        </div>
      </div>
    </>
  );
}

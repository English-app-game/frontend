import AvatarImg from "../components/AvatarImg";
import BlueBox from "../components/BlueBox";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import * as avatars from "../../assets/index";

export default function Register() {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-[url('/homePage.png')] flex justify-center">
        <div className="pt-10 w-full">
          <BlueBox className="pr-3 ">
            <Header text="LETS MAKE YOUR ACCOUNT!" className="text-center" />
            <div className="pb-5">
              <InputField text="User" />
              <InputField text="Password" />
              <InputField text="Email" />
              <PrimaryButton
                text="REGISTER"
                className="float-right mt-4 ml-4"
                onClick={() => navigate("/login")}
              />
            </div>
            <h3 className="text-white">Choose your Avatar:</h3>
            <div className="grid grid-cols-5 gap-1">
              {Object.entries(avatars).map(([key, src]) => (
                <AvatarImg key={key} src={src} alt={key} />
              ))}
            </div>
          </BlueBox>
        </div>
      </div>
    </>
  );
}

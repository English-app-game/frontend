import BlueBox from "../components/BlueBox";
import Header from "../components/Header";
import InputField from "../components/InputField";
import * as avatars from "../../assets/index";
import AvatarImg from "../components/AvatarImg";
import PrimaryButton from "../components/PrimaryButton";

export default function LoginGuest() {
  return (
      <div className="min-h-screen bg-[url('/homePage.png')] flex justify-center">
        <div className="pt-10 w-full">
          <BlueBox className="pr-3 ">
            <Header text="WELCOME GUEST!" className="pl-2 pt-4" />
            <div className="pt-7">
              <InputField text="User Name" />
            </div>
            <div className="pt-7">
            <PrimaryButton
                text="LET'S GO!"
                className="float-right mt-4 ml-4"
              />
              <h3 className="text-white">Choose your Avatar:</h3>
              <div className="grid grid-cols-5 gap-1">
                {Object.entries(avatars).map(([key, src]) => (
                  <AvatarImg key={key} src={src} alt={key} />
                ))}
              </div>
            </div>
          </BlueBox>
        </div>
      </div>
  );
}

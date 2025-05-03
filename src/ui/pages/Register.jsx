import AvatarImg from "../components/AvatarImg";
import BlueBox from "../components/BlueBox";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import avatar1 from "../../assets/images/avatar1.png";
import avatar2 from "../../assets/images/avatar2.png";
import avatar3 from "../../assets/images/avatar3.png";
import avatar4 from "../../assets/images/avatar4.png";
import avatar5 from "../../assets/images/avatar5.png";
import avatar6 from "../../assets/images/avatar6.png";
import avatar7 from "../../assets/images/avatar7.png";
import avatar8 from "../../assets/images/avatar8.png";
import avatar9 from "../../assets/images/avatar9.png";
import avatar10 from "../../assets/images/avatar10.png";

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
              <AvatarImg src={avatar1} alt="avatar1" />
              <AvatarImg src={avatar2} alt="avatar2" />
              <AvatarImg src={avatar3} alt="avatar3" />
              <AvatarImg src={avatar4} alt="avatar4" />
              <AvatarImg src={avatar5} alt="avatar5" />
              <AvatarImg src={avatar6} alt="avatar6" />
              <AvatarImg src={avatar7} alt="avatar7" />
              <AvatarImg src={avatar8} alt="avatar8" />
              <AvatarImg src={avatar9} alt="avatar9" />
              <AvatarImg src={avatar10} alt="avatar10" />
            </div>
          </BlueBox>
        </div>
      </div>
    </>
  );
}

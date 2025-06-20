import BlueBox from "../components/BlueBox";
import Header from "../components/Header";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import { handleInputChange } from "../../utils/handleRegister";
import { onSubmitReset } from "../../utils/handleReset";
import { useState } from "react";
import SecondaryButton from "../components/SecondaryButton";
import { LOGIN } from "../../routes/routes_consts";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [Email, setEmail] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState(null);
  const navigate = useNavigate();

  const handleExitRoom = () => {
    navigate(LOGIN);
  };

  return (
    <div className="min-h-screen bg-[url('/homePage.png')] bg-cover bg-center flex justify-center items-center px-4">
      <SecondaryButton text={"BACK"} onclick={handleExitRoom} className={"absolute"}/>
      <div className="pt-10 w-full">
        <BlueBox>
          <Header text="PLEASE ENTER YOUR EMAIL" className="text-center" />
          <div className="mt-5 relative flex flex-col items-start gap-4">
            <InputField
              text="Email"
              value={Email.email}
              onChange={handleInputChange("email", Email, setEmail)}
              error={errors.email}
            />
            {serverMessage && <p className="text-white">{serverMessage}</p>}
            <PrimaryButton
              text="SEND RESET LINK"
              className="mt-20 float-right px-4 py-2"
              onClick={onSubmitReset(
                Email,
                setEmail,
                setErrors,
                setServerMessage
              )}
            />
          </div>
        </BlueBox>
      </div>
    </div>
  );
}

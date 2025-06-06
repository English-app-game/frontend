import BlueBox from "../components/BlueBox";
import Header from "../components/Header";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import { handleInputChange } from "../../utils/handleRegister";
import { onSubmitReset } from "../../utils/handleReset";
import { useState } from "react";

export default function ResetPassword() {
  const [Email, setEmail] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState(null);

  return (
    <div className="min-h-screen bg-[url('/homePage.png')] flex justify-center">
      <div className="pt-10 w-full flex items-center">
        <BlueBox>
          <Header text="PLEASE ENTER YOUR EMAIL" className="text-center" />
          <div className="mt-5 relative flex flex-col items-start gap-4">
            <InputField
              text="Email"
              value={Email.email}
              onChange={handleInputChange("email", Email, setEmail)}
              error={errors.email}
            />
            {serverMessage && (
              <p className="text-white">{serverMessage}</p>
            )}
            <PrimaryButton
              text="SEND RESET LINK"
              className="mt-20 float-right"
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

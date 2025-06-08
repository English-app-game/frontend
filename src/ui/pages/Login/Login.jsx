// Login.jsx (Main page)
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../../services/auth.js";
import { LOGIN_GUEST, REGISTER, ROOMS_LIST } from "../../../routes/routes_consts.js";
import { isValidEmail } from "../../../utils/helpers.js";
import BlueBox from "../../components/BlueBox.jsx";
import LoginFormHeader from "./LoginFormHeader.jsx";
import LoginFormFields from "./LoginFormFields.jsx";
import LoginFormActions from "./LoginFormActions.jsx";

export default function Login() {
  
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const validateLoginFields = () => {
    let valid = true;
    if (!isValidEmail(email)) {
      setEmailError("Invalid email");
      valid = false;
    } else {
      setEmailError("");
    }
    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }
    return valid;
  };

  const handleLogin = async () => {
    if (!validateLoginFields()) return;
    try {
      const { ok, data } = await loginUser(email, password);
      if (!ok) {
        setGeneralError("Invalid email or password");
      } else {
        setEmailError("");
        setPasswordError("");
        setGeneralError("");
        navigate(ROOMS_LIST);
      }
    } catch (err) {
      setGeneralError("Server error. Please try again later.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/homePage.png')] flex justify-center">
      <div className="pt-10 w-full flex items-center">
        <BlueBox className="pr-3 mb-5">
          <LoginFormHeader />
          <LoginFormFields
            email={email} setEmail={setEmail} emailError={emailError}
            password={password} setPassword={setPassword} passwordError={passwordError}
            generalError={generalError}
          />
          <LoginFormActions
            handleLogin={handleLogin}
            navigate={navigate}
          />
        </BlueBox>
      </div>
    </div>
  );
}

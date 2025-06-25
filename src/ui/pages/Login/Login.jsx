// Login.jsx (Main page)
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../../services/auth.js";
import { ROOMS_LIST } from "../../../routes/routes_consts.js";
import { isValidEmail } from "../../../utils/validateFields.js";
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
  const [isLoading, setIsLoading] = useState(false);

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
    
    setIsLoading(true);
    try {
      const { ok, data } = await loginUser(email, password);
      
      if (!ok) {
        setGeneralError(data?.error || "Invalid email or password");
      } else {
        setEmailError("");
        setPasswordError("");
        setGeneralError("");
        navigate(ROOMS_LIST);
      }
    } catch (err) {
      console.error("Login error:", err);
      setGeneralError("Server error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/homePage.png')] bg-cover bg-center flex justify-center items-center px-4">
      <div className="w-full max-w-md">
        <BlueBox className="p-6">
          <LoginFormHeader />
          <LoginFormFields
            email={email} setEmail={setEmail} emailError={emailError}
            password={password} setPassword={setPassword} passwordError={passwordError}
            generalError={generalError}
          />
          <LoginFormActions
            handleLogin={handleLogin}
            navigate={navigate}
            isLoading={isLoading}
          />
        </BlueBox>
      </div>
    </div>
  );
}
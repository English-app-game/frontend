import BlueBox from "../components/BlueBox";
import Header from "../components/Header";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import TextBottom from "../components/TextButton"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../services/auth.js";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };


  const handleLogin = async () => {
    let hasError = false;

    if (!isValidEmail(email)) {
      setEmailError("Invalid email");
      return;
    }
    if (!password) {
      setPasswordError("Password is required")
      hasError = true;
    }
    else {
      setEmailError("");
    }
    if (hasError) return;

    try {
      const data = await loginUser(email, password);
    
      if (data.error) {
        if (data.error === "Invalid password") {
          setPasswordError("Incorrect password");
        } else if (data.error === "User not found") {
          setEmailError("Email not found");
        } else {
          setGeneralError("Login failed. Please try again.");
        }
      } else {
        setEmailError("");
        setPasswordError("");
        setGeneralError("");
        navigate("/rooms");
      }
    } catch (err) {
      setGeneralError("Server error. Please try again later.");
      console.error(err);
    }
  }    
   
  return (
    <>
      <div className="min-h-screen bg-[url('/homePage.png')] flex justify-center">
        <div className="pt-10 w-full flex items-center">
          <BlueBox className="pr-3 mb-5">
            <Header text="ALMOST THERE!" className="pl-2" />
            <div className="pt-5">
              <InputField
                id="email"
                text="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
              {emailError && (
                <p className="text-red-700 text-md mt-1 ml-1">{emailError}</p>
              )}
              <InputField
                id="password"
                text="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              {passwordError && (
                <p className="text-red-700 text-md mt-1 ml-1">{passwordError}</p>
              )}
              {generalError && (
                <p className="text-red-700 text-md mt-2 ml-1">{generalError}</p>
              )}
              <PrimaryButton
                text="LOGIN"
                className="float-right mt-4 ml-4"
                onClick={handleLogin}
              />              <div className="flex flex-col items-start">
                <TextBottom className="pt-4 text-white hover:underline cursor-pointer">
                  Forget Password?
                </TextBottom>
                <TextBottom className="pt-1 text-white hover:underline cursor-pointer" onClick={() => navigate("/login/guest")}>
                  Login as guest
                </TextBottom>
                <p className="pt-1 text-white">
                  Doesn't have an account yet?
                </p>
              </div>
              <PrimaryButton text="SIGN UP" className="mt-4 bg-gray" onClick={() => navigate("/register")} />
            </div>
          </BlueBox>
        </div>
      </div>
    </>
  );
}

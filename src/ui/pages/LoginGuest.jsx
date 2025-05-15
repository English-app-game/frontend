import BlueBox from "../components/BlueBox";
import Header from "../components/Header";
import InputField from "../components/InputField";
import * as avatars from "../../assets/index";
import AvatarImg from "../components/AvatarImg";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginGuest } from "../../services/auth.js";



export default function LoginGuest() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [usernameError, setUsernameError] = useState("");
  const [avatarError, setAvatarError] = useState("");

  const handleLogin = async () => {
    let hasError = false;
  
    if (!username.trim()) {
      setUsernameError("Username is required");
      hasError = true;
    } else {
      setUsernameError("");
    }
  
    if (!selectedAvatar) {
      setAvatarError("Please choose an avatar");
      hasError = true;
    } else {
      setAvatarError("");
    }
  
    if (hasError) return;
  
    try {
      const data = await loginGuest(username, selectedAvatar);
  
      if (data.error) {
        setAvatarError("Login failed. Try again.");
      } else {
        navigate("/rooms");
      }
    } catch (err) {
      console.error("Guest login error:", err);
      setAvatarError("Server error. Please try again.");
    }
  };
  

  return (
    <div className="min-h-screen bg-[url('/homePage.png')] flex justify-center">
      <div className="pt-10 w-full">
        <BlueBox className="pr-3 ">
          <Header text="WELCOME GUEST!" className="pl-2 pt-4" />
          <div className="pt-7">
            <InputField
              text="User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
            />
            {usernameError && (
              <p className="text-red-500 text-sm mt-1 ml-1">{usernameError}</p>
            )}
          </div>
          <div className="pt-4">
            <PrimaryButton
              text="LET'S GO!"
              className="float-right mt-4 ml-4"
              onClick={handleLogin}
            />
            <h3 className="text-white mb-2">Choose your Avatar:</h3>
            <div className="grid grid-cols-5 gap-1">
              {Object.entries(avatars).map(([key, src]) => (
                <div
                  key={key}
                  onClick={() => setSelectedAvatar(src)}
                  className={`cursor-pointer transition transform duration-200 rounded-xl overflow-hidden border-2 
                  ${selectedAvatar === src
                      ? "scale-110 border-transparent"
                      : "opacity-80 hover:scale-105 border-transparent"
                    }`}
                >
                  <AvatarImg src={src} alt={key} />
                </div>
              ))}
            </div>
            {avatarError && (
              <p className="text-red-500 text-sm mt-2 ml-1">{avatarError}</p>
            )}
          </div>
        </BlueBox>
      </div>
    </div>
  );
}

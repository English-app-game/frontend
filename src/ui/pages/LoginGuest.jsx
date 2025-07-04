import { avatarList } from "../../assets/index.js";
import Header from "../components/Header";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import BlueBox from "../components/BlueBox.jsx";
import AvatarImg from "../components/AvatarImg.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginGuest } from "../../services/auth.js";
import { ROOMS_LIST, LOGIN } from "../../routes/routes_consts.js";
import SecondaryButton from "../components/SecondaryButton.jsx";

export default function LoginGuest() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [usernameError, setUsernameError] = useState("");
  const [avatarError, setAvatarError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateGuestFields = (
    username,
    selectedAvatar,
    setUsernameError,
    setAvatarError
  ) => {
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

    return !hasError;
  };

  const handleExitRoom = () => {
    navigate(LOGIN);
  };

  const handleGuestLogin = async () => {
    const isValid = validateGuestFields(
      username,
      selectedAvatar,
      setUsernameError,
      setAvatarError
    );
    if (!isValid) return;

    setIsLoading(true);
    try {
      const data = await loginGuest(username, selectedAvatar);

      if (data.error) {
        setAvatarError("Login failed. Try again.");
      } else {
        navigate(ROOMS_LIST);
      }
    } catch (err) {
      console.error("Guest login error:", err);
      setAvatarError("Server error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/homePage.png')] bg-cover bg-center flex justify-center items-center px-4">
      <SecondaryButton text={"BACK"} onclick={handleExitRoom} className={"absolute"}/>
      <div className="pt-10 w-full">
        <BlueBox className="pr-3">
          <Header text="WELCOME GUEST!" className="pl-2 pt-2 pt-4" />
          <div className="pt-7">
            <InputField
              text="User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
            />
            {usernameError && (
              <p className="text-black text-sm mt-1 ml-1">{usernameError}</p>
            )}
          </div>
          <div className="pt-4">
            <PrimaryButton
              text={isLoading ? "LOGGING IN" : "LET'S GO!"}
              className={`float-right mt-4 ml-4 px-4 py-2 ${isLoading ? 'opacity-75' : ''}`}
              onClick={handleGuestLogin}
              disabled={isLoading}
            >
              {isLoading && (
                <span className="ml-2">
                  <span className="inline-block w-2 h-2 bg-white rounded-full animate-bounce"></span>
                  <span className="inline-block w-2 h-2 bg-white rounded-full animate-bounce ml-1" style={{animationDelay: '0.1s'}}></span>
                  <span className="inline-block w-2 h-2 bg-white rounded-full animate-bounce ml-1" style={{animationDelay: '0.2s'}}></span>
                </span>
              )}
            </PrimaryButton>
            <h3 className="text-white mb-2">Choose your Avatar:</h3>
            <div className="grid grid-cols-5 gap-1">
              {avatarList.map((src, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedAvatar(src)}
                  className={`cursor-pointer rounded-xl ${
                    selectedAvatar === src ? "ring-4 ring-green-500" : ""
                  }`}
                >
                  <AvatarImg
                    src={src}
                    alt={`avatar-${index}`}
                    className={"w-full h-full border-white border-2 rounded-xl"}
                  />
                </div>
              ))}
            </div>
            {avatarError && (
              <p className="text-black text-sm mt-2 ml-1">{avatarError}</p>
            )}
          </div>
        </BlueBox>
      </div>
    </div>
  );
}

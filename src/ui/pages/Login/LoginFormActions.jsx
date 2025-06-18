import PrimaryButton from "../../components/PrimaryButton.jsx";
import TextBottom from "../../components/TextButton.jsx";
import { LOGIN_GUEST, REGISTER, RESET_PASSWORD } from "../../../routes/routes_consts.js";

export default function LoginFormActions({ handleLogin, navigate }) {
  return (
    <>
      <PrimaryButton
        text="LOGIN"
        className="mt-4 px-4 py-2"
        onClick={handleLogin}
      />
      <div className="flex flex-col items-center gap-4 mt-6">
        {/* Main action links in one line */}
        <div className="flex flex-row items-center justify-center gap-6 flex-wrap">
          <TextBottom 
            className="text-white hover:underline cursor-pointer transition-colors hover:text-blue-200" 
            onClick={() => navigate(RESET_PASSWORD)}
          >
            Forgot Password?
          </TextBottom>
          
          <span className="text-white/50">•</span>
          
          <TextBottom
            className="text-white hover:underline cursor-pointer transition-colors hover:text-green-200"
            onClick={() => navigate(LOGIN_GUEST)}
          >
            Login as Guest
          </TextBottom>
        </div>
        
        {/* Sign up section */}
        <div className="flex flex-col items-center gap-2 mt-2">
          <p className="text-white/70 text-sm text-center">
            Doesn't have an account yet?
          </p>
          <TextBottom 
            className="text-white cursor-pointer transition-all duration-300 shadow-lg
                       bg-white/10 hover:bg-white/20 
                       border border-white/30 hover:border-white/50
                       px-6 py-2 rounded-full
                       backdrop-blur-sm
                       hover:scale-105 hover:shadow-lg 
                       font-medium"
            onClick={() => navigate(REGISTER)}
          >
            Sign Up
          </TextBottom>
        </div>
      </div>
    </>
  );
}

import PrimaryButton from "../../components/PrimaryButton.jsx";
import TextBottom from "../../components/TextButton.jsx";
import { LOGIN_GUEST, REGISTER, RESET_PASSWORD } from "../../../routes/routes_consts.js";

export default function LoginFormActions({ handleLogin, navigate }) {
  return (
    <>
      <PrimaryButton
        text="LOGIN"
        className="float-right mt-4 ml-4 px-4 py-2"
        onClick={handleLogin}
      />
      <div className="flex flex-col items-start">
        <TextBottom className="pt-4 text-white hover:underline cursor-pointer" onClick={() => navigate(RESET_PASSWORD)}>
          Forget Password?
        </TextBottom>
        <TextBottom
          className="pt-1 text-white hover:underline cursor-pointer"
          onClick={() => navigate(LOGIN_GUEST)}
        >
          Login as guest
        </TextBottom>
        <p className="pt-1 text-white">Doesn't have an account yet?</p>
      </div>
      <PrimaryButton
        text="SIGN UP"
        className="mt-4 bg-gray px-4 py-2"
        onClick={() => navigate(REGISTER)}
      />
    </>
  );
}

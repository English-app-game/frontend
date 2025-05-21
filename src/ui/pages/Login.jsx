import BlueBox from "../components/BlueBox";
import Header from "../components/Header";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-[url('/homePage.png')] flex justify-center">
        <div className="pt-10 w-full">
          <BlueBox className="pr-3 ">
            <Header text="ALMOST THERE!" className="pl-2" />
            <div className="pt-5">
              <InputField text="User" />
              <InputField text="Password" />
              <PrimaryButton text="LOGIN" className="float-right mt-4 ml-4" />
              <div className="flex flex-col items-start">
                {/*/////////Need to change to text-button component/////////*/}
                <button className="pt-4 text-white hover:underline cursor-pointer" onClick={() => navigate("/login/resetPassword")}>
                  Forget Password?
                </button>
                <button className="pt-1 text-white hover:underline cursor-pointer" onClick={() => navigate("/login/guest")}>
                  Login as guest
                </button>
                {/*/////////////////////////////////////////////////////////*/}
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

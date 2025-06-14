import PrimaryButton from "../components/PrimaryButton" 
import { useNavigate } from "react-router-dom";

export default function Home() {
  
  const navigate = useNavigate();

  return (
    <div className="bg-[url('/homePage.png')] h-screen">

      <div className="relative z-10 flex flex-col text-center items-center justify-center h-full">
        <div className=" px-8 py-6 flex flex-col items-center justify-center rounded-xl">
        <h1 className="text-[#000080] bg-[#9CF2F9] text-6xl font-bold mb-4 ">
          WELCOME TO
        </h1>
        <h1 className="text-[#000080] bg-[#9CF2F9] text-7xl font-bold mb-4">
          SPEALISH
        </h1>
        <h1 className="text-blue-400 bg-[#9CF2F9] text-3xl font-bold mb-6">
          Learn English with us!
        </h1>
        <PrimaryButton className="px-4 py-2" text="START"  onClick={() => navigate("/login")}/>
        </div>
        
      </div>

    </div>
      
  );
}

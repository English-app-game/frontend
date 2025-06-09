import PrimaryButton from "../../ui/components/PrimaryButton";
import BlueBox from "../../ui/components/BlueBox";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { ROOMS_LIST } from "../../routes/routes_consts";

export default function ScoreResult({ score, gameName, loading }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(ROOMS_LIST);
  };

  return (
    <div className="bg-[url('/homePage.png')] bg-cover min-h-screen flex items-center justify-center">
      <BlueBox size="large" className="text-center w-[35rem] h-[28rem] flex flex-col justify-center items-center gap-4 shadow-xl">
        <Header text="🎉 GAME OVER 🎉" className="text-4xl font-extrabold uppercase text-white drop-shadow" />

        {!loading ? (
          <>
            <p className="text-2xl text-white font-semibold">
              Your Score: <span className="text-yellow-300 text-3xl animate-pulse">{score} 🏆</span>
            </p>
            <p className="text-xl text-white italic">
              Game Type: <span className="text-teal-200">{gameName}</span>
            </p>
          </>
        ) : (
          <p className="text-white text-xl animate-pulse">Loading your score...</p>
        )}

        <PrimaryButton
          text="Back to Rooms"
          onClick={handleBack}
          className="mt-8 bg-green-400 hover:scale-105 transition-transform"
        />
      </BlueBox>
    </div>
  );
}
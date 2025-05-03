import PropTypes from "prop-types";
import BlueBox from "../../../components/BlueBox";


const PlayersList = ({ playersAtGame, host }) => {
  return (
    <BlueBox override className="bg-teal-600 px-10 py-8 border-4 border-dashed border-white w-[45rem] h-[24rem] flex justify-between items-center">
      <div className="ml-4">
        <h1 className="text-white text-lg font-semibold mb-4 underline">Players In The Room:</h1>
        <ul className="space-y-4 text-white font-semibold">
          {playersAtGame.map((player, index) => (
            <li key={index} className="flex items-center gap-4">
              <div className="bg-green-400 h-2 w-2 rounded-full animate-ping"></div>
              <div className="flex items-center gap-4">
                <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
                  <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8V21h19.2v-1.8c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                </div>
                <div className={`${player === host ? 'text-amber-100 font-extrabold animate-pulse' : 'text-white'}`}>
                  {player}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mr-3">
        <div className="bg-teal-200 text-teal-600 rounded-full px-5 py-4 font-semibold">MAX PLAYERS: 5</div>
      </div>
    </BlueBox>
  );
};

PlayersList.propTypes = {
  playersAtGame: PropTypes.array.isRequired,
  host: PropTypes.string.isRequired,
};

export default PlayersList;

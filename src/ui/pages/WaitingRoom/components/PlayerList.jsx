import PropTypes from "prop-types";
import BlueBox from "../../../components/BlueBox";
import AvatarImg from "../../../components/AvatarImg";
import avatarImage from "../../../../assets/images/avatar.png";


const PlayersList = ({ playersAtGame, host }) => {
    return (
        <BlueBox size="large" className="bg-teal-600 px-10 py-8 border-4 border-dashed border-white flex justify-between items-center">
            <div className="ml-4">
                <h1 className="text-white text-lg font-semibold mb-4 underline">Players In The Room:</h1>
                <ul className="space-y-4 text-white font-semibold">
                    {playersAtGame.map((player, index) => (
                        <li key={index} className="flex items-center gap-4">
                            <div className="bg-green-400 h-2 w-2 rounded-full animate-ping"></div>
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full overflow-hidden">
                                    <AvatarImg src={avatarImage} alt={`${player} avatar`} />
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

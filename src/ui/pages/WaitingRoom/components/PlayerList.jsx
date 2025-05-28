import PropTypes from "prop-types";
import BlueBox from "../../../components/BlueBox";
import WaitingPlayerListItem from "./WaitingPlayerListItem";
import avatarImage from "../../../../assets/images/avatar.png";

const PlayersList = ({ playersAtGame, host }) => {
    return (
        <BlueBox
            size="large"
          className="px-4 py-6 border-4 border-dashed border-white flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-0 w-full max-w-[90vw]"
        >
            <div className="ml-4">
                <h1 className="text-white text-base sm:text-lg font-semibold mb-4 underline text-center sm:text-left">

                    Players In The Room:
                </h1>
                <ul className="space-y-4 text-white font-semibold">
                    {playersAtGame.map((player, index ) => (
                        <WaitingPlayerListItem
                            key={player}
                            avatarImage={avatarImage}
                            player={player}
                            host={host}
                        />
                    ))}
                </ul>
            </div>

            <div className="mr-3">
               <div className="bg-teal-200 text-teal-600 rounded-full px-4 py-2 font-semibold text-sm sm:text-base text-center">
                    MAX PLAYERS: 5
                </div>
            </div>
        </BlueBox>
    );
};

PlayersList.propTypes = {
    playersAtGame: PropTypes.array.isRequired,
    host: PropTypes.string.isRequired,
};

export default PlayersList;

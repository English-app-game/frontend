import PropTypes from "prop-types";
import BlueBox from "../../../components/BlueBox";
import WaitingPlayerListItem from "./WaitingPlayerListItem";
import avatarImage from "../../../../assets/images/avatar.png";

const PlayersList = ({ playersAtGame, host }) => {
    return (
        <BlueBox
            size="large"
            className="px-10 py-8 border-4 border-dashed border-white flex justify-between items-center"
        >
            <div className="ml-4">
                <h1 className="text-white text-lg font-semibold mb-4 underline">
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
                <div className="bg-teal-200 text-teal-600 rounded-full px-5 py-4 font-semibold">
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

import PropTypes from "prop-types";
import BlueBox from "../../../components/BlueBox";
import WaitingPlayerListItem from "./WaitingPlayerListItem";

const PlayersList = ({ players, hostId }) => {
    return (
        <BlueBox
            size="large"
            className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 border-4 border-dashed border-white px-4 py-6 max-w-4xl"
        >
            <div className="w-full sm:w-2/3">
                <h1 className="text-white text-lg font-semibold mb-4 underline">
                    Players In The Room:
                </h1>
                <ul className="space-y-4 text-white font-semibold">
                    {players.map(({ _id, avatarImg, name, isGuest }) => (
                        <WaitingPlayerListItem
                            key={_id}
                            avatarImage={avatarImg}
                            player={name}
                            host={_id === hostId}
                            isGuest={isGuest || false}
                        />
                    ))}
                </ul>
            </div>

            <div className="w-full sm:w-1/3 flex justify-center sm:justify-end">
                <div className="bg-teal-200 text-teal-600 rounded-full px-5 py-4 font-semibold">
                    MAX PLAYERS: 5
                </div>
            </div>
        </BlueBox>
    );
};

PlayersList.propTypes = {
    players: PropTypes.array.isRequired,
    hostId: PropTypes.string.isRequired,
};

export default PlayersList;

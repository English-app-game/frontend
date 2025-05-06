import PropTypes from "prop-types";
import AvatarImg from "../../../components/AvatarImg";

const WaitingPlayerListItem = ({ player, avatarImage, host }) => {
    return (
        <li className="flex items-center gap-4">
            <div className="bg-green-400 h-2 w-2 rounded-full animate-ping"></div>
            <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                    <AvatarImg src={avatarImage} alt={`${player} avatar`} />
                </div>
                <div
                    className={`${
                        player === host
                            ? "text-amber-100 font-extrabold animate-pulse"
                            : "text-white"
                    }`}
                >
                    {player}
                </div>
            </div>
        </li>
    );
};

WaitingPlayerListItem.propTypes = {
    player: PropTypes.string.isRequired,
    host: PropTypes.string.isRequired,
    avatarImage: PropTypes.string.isRequired,
};

export default WaitingPlayerListItem;

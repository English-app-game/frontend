import PropTypes from "prop-types";
import AvatarImg from "../../../components/AvatarImg";

const WaitingPlayerListItem = ({ player, avatarImage, host, isConnected = true }) => {
    return (
        <li className="flex items-start gap-4">
            <div className="bg-green-400 h-2 w-2 rounded-full animate-ping mt-2"></div>
            <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img src={avatarImage} alt={`${player} avatar`} className="w-full h-full object-cover" />
                </div>
                <div className={`${
                    host 
                        ? "text-amber-100 animate-pulse" 
                        : "text-white"
                } text-sm sm:text-base break-words max-w-[70vw]`}>
                    {player}
                </div>
            </div>
        </li>
    );
};

WaitingPlayerListItem.propTypes = {
    player: PropTypes.string.isRequired,
    host: PropTypes.bool.isRequired,
    avatarImage: PropTypes.string.isRequired,
    isGuest: PropTypes.bool,
    isConnected: PropTypes.bool,
};

export default WaitingPlayerListItem;

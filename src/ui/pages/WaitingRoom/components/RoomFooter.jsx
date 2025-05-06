import PropTypes from "prop-types";
import ExitButton from "../../../components/ExitButton";

const RoomFooter = ({ copied, handleCopy, handleStart }) => {
    return (
        <div className="mt-8 flex items-center gap-4">
            <div className="text-shadow-md font-extrabold text-teal-700">ROOM KEY:</div>
            <div className="relative bg-gray-200 text-xl px-25 py-2 rounded-full font-bold text-black">1KO4W7H
                <button onClick={handleCopy} className="absolute right-5 top-1/2 -translate-y-1/2 text-xs text-gray-600 hover:underline">
                    {copied ? "Copied!" : "Copy"}</button>
            </div>
            <ExitButton onClick={handleStart} className="bg-green-300 border-green-400 hover:bg-green-400">START ▶</ExitButton>
        </div>
    );
};

RoomFooter.propTypes = {
    copied: PropTypes.bool.isRequired,
    handleCopy: PropTypes.func.isRequired,
    handleStart: PropTypes.func.isRequired,
};

export default RoomFooter;

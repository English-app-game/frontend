import PropTypes from "prop-types";
import ExitButton from "../../../components/ExitButton";

const RoomFooter = ({ copied, handleCopy, handleStart, roomKey  }) => {
    return (
         <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full max-w-2xl justify-center">
            <div className="text-shadow-md font-extrabold text-teal-700">ROOM KEY:</div>
            <div className="relative bg-gray-200 text-xl px-6 py-2 rounded-full font-bold text-black text-center break-words max-w-xs sm:max-w-none">{ roomKey }
                 <button onClick={handleCopy} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-600 hover:underline sm:static sm:translate-y-0 sm:ml-2 sm:inline-block sm:mt-0 mt-2">
                    {copied ? "Copied!" : "Copy"}</button>
            </div>
            <ExitButton onClick={handleStart}  className="w-full sm:w-auto text-center bg-green-300 border-green-400 hover:bg-green-400">START ▶</ExitButton>
        </div>
    );
};

RoomFooter.propTypes = {
    copied: PropTypes.bool.isRequired,
    handleCopy: PropTypes.func.isRequired,
    handleStart: PropTypes.func.isRequired,
    roomKey: PropTypes.string.isRequired,

};

export default RoomFooter;

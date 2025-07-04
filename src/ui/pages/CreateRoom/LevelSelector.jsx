import PropTypes from "prop-types";
import { levelOptions } from "./config";

const LevelSelector = ({ level, setLevel }) => (
  <div className="mb-6 sm:mb-6 w-full">
    <h1 className="text-lg sm:text-base md:text-xl font-extrabold mb-4 sm:mb-4 text-[#f5f5dc] uppercase text-center">2. Choose Level</h1>
    <div className="flex justify-around flex-wrap gap-4 sm:gap-4 max-w-full overflow-hidden">
      {Object.entries(levelOptions).map(([key, { nameLevel, img }]) => (
        <div key={key} className="flex flex-col items-center gap-2 sm:gap-2 w-20 sm:w-20 md:w-28">
          <div className="text-sm sm:text-sm md:text-base font-extrabold text-[#f5f5dc] text-center">{nameLevel}</div>
          <button
            onClick={() => setLevel(level === key ? null : key)}
            className={`w-16 h-16 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-lg border-4 sm:border-4 shadow-md transition cursor-pointer hover:scale-105 ${
              level === key ? "border-teal-500" : "border-white"
            }`}
          >
            <img src={img} alt={nameLevel} className="w-full h-full object-contain" />
          </button>
        </div>
      ))}
    </div>
  </div>
);

LevelSelector.propTypes = {
  level: PropTypes.string,
  setLevel: PropTypes.func.isRequired,
};

export default LevelSelector;

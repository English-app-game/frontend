import PropTypes from "prop-types"
import {levelOptions} from "./config";

const LevelSelector = ({ level, setLevel }) => (
    <div className="mb-6">
      <h1 className="text-lg font-extrabold mb-4 text-[#f5f5dc] uppercase">1. Choose Level</h1>
      <div className="flex justify-around">
        {Object.entries(levelOptions).map(([key, { nameLevel, img }]) => (
          <div key={key} className="flex flex-col items-center gap-1">
            <div className="text-md font-extrabold text-[#f5f5dc]">{nameLevel}</div>
            <button
              onClick={() => setLevel(level === key ? null : key)}
              className={`w-21 h-20 rounded-lg border-4 shadow-md transition hover:scale-105 ${level === key ? "border-teal-500" : "border-white"}`}>
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
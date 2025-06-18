import PropTypes from "prop-types";
import PrimaryButton from "../../../ui/components/PrimaryButton";
import { statusOptions } from "./config";

const StatusSelector = ({ status, setStatus }) => {
  return (
    <div className="mb-6 w-full">

      <div className="flex justify-center">
        <div className="relative flex bg-white rounded-full p-1 w-[200px] shadow-inner">
          <div
            className={`absolute top-1 left-1 w-[94px] h-8 rounded-full transition-all duration-300 ease-in-out z-0
              ${status === "private" ? "translate-x-[98px]" : "translate-x-0"}
              ${statusOptions[status]?.bgColor}
            `}
          ></div>

          {/* Tabs */}
          <div className="relative w-48 h-10 bg-white rounded-full flex items-center justify-between p-1">
            {Object.keys(statusOptions).map((key) => {
              const isSelected = status === key;
              return (
                <button
                  key={key}
                  onClick={() => setStatus(key)}
                  className={`w-1/2 h-full rounded-full font-bold transition-all duration-200 
          ${isSelected ? `${statusOptions[key].bgColor} text-white` : 'text-gray-600'}`}>
                  {statusOptions[key].type}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

StatusSelector.propTypes = {
  status: PropTypes.string,
  setStatus: PropTypes.func.isRequired,
};

export default StatusSelector;

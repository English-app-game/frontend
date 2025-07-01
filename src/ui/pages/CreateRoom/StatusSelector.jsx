import PropTypes from "prop-types";
import PrimaryButton from "../../../ui/components/PrimaryButton";
import { statusOptions } from "./config";

const StatusSelector = ({ status, setStatus }) => {
  return (
    <div className="mb-4 mt-8 sm:mb-6 w-full">

      <div className="flex justify-center">
        <div className="relative flex bg-white rounded-full p-1 w-[200px] sm:w-[200px] md:w-[240px] shadow-inner">
          <div className="relative w-full h-8 sm:h-8 md:h-10 bg-white rounded-full flex items-center justify-between p-0">
            {Object.keys(statusOptions).map((key) => {
              const isSelected = status === key;
              return (
                <button
                  key={key}
                  onClick={() => setStatus(key)}
                  className={`w-1/2 h-full rounded-full text-sm sm:text-sm md:text-base font-bold transition-all duration-200 
          ${isSelected ? `${statusOptions[key].bgColor} text-white` : 'text-gray-600 bg-transparent'}`}>
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

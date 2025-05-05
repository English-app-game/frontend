import PropTypes from "prop-types";
import PrimaryButton from "../../../ui/components/PrimaryButton";
import { statusOptions } from "./config";

const StatusSelector = ({ status, setStatus }) => (
  <div className="mb-6">
    <h1 className="text-lg font-extrabold mb-2 text-[#068E9E] uppercase">2. Choose Status</h1>
    <div className="flex justify-around">
      {Object.entries(statusOptions).map(([key, { type, bgColor, borderColor, hoverColor, ringColor }]) => (
        <PrimaryButton
          key={key} text={type} onClick={() => setStatus(status === key ? null : key)}
          className={`px-6 py-2 rounded-full font-extrabold text-white transition shadow-md ${bgColor} ${hoverColor} ${borderColor} border-4 ${
            status === key ? `ring-4 ${ringColor} scale-105` : ""
          }`}
        />
      ))}
    </div>
  </div>
);

StatusSelector.propTypes = {
  status: PropTypes.string,
  setStatus: PropTypes.func.isRequired,
};

export default StatusSelector;

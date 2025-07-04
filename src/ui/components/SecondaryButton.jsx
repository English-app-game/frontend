import ExitButton from "./ExitButton";

const SecondaryButton = ({ text, onclick, className }) => {
  return (
    <ExitButton
      className={`bg-rose-600 border-4 border-rose-400 hover:bg-rose-400 text-xs sm:text-base px-3 py-2 sm:px-5 sm:py-3 top-4 left-4 ${className}`}
      onClick={onclick}
    >
      {text}
    </ExitButton>
  );
};

export default SecondaryButton;
import ButtonGuessWord from "./ButtonGuessWord";

const KEY_ROWS = [
    "QWERTYUIOP".split(""),
    "ASDFGHJKL".split(""),
    "ZXCVBNM".split(""),
];

export default function VirtualKeyboard({ onClick, disabledKeys = [] }) {
    return (
  <div className="flex flex-col items-center gap-4 w-full px-4 pb-6">
    {KEY_ROWS.map((row, i) => (
      <div
        key={i}
        className={`flex justify-center gap-1 sm:gap-2 w-full ${
          i === 1 ? 'px-3' : i === 2 ? 'px-6' : ''
        }`}
      >
        {row.map((key) => (
          <ButtonGuessWord key={key} text={key} onClick={() => onClick(key)}
            disabled={disabledKeys.includes(key.toLowerCase())}
            className="
              flex items-center justify-center
              w-17 sm:w-10 md:w-16 h-12
              rounded-md sm:rounded-lg
              text-base sm:text-xl font-semibold
              bg-white/80 text-gray-600
              border border-gray-300
              hover:bg-blue-100 active:bg-blue-300
              disabled:bg-gray-200 disabled:cursor-not-allowed
              transition-all shadow-md"/>
        ))}
      </div>
    ))}
  </div>
);

}
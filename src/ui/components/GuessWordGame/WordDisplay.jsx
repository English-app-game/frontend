export default function WordDisplay({ word, missingIdxs, guesses }) {
    if (!word) return null;

   return (
    <div className="flex justify-center items-center w-full">
      <div className="flex gap-2 sm:gap-4 flex-nowrap overflow-x-auto max-w-full justify-center mt-10 sm:mt-16 md:mt-24">
        {[...word].map((ch, i) => {
          const lower = ch.toLowerCase();
          const missing = missingIdxs.includes(i);
          const revealed = guesses.includes(lower);

          return (
            <div
              key={i}
              className="w-14 h-16 sm:w-16 sm:h-20 flex items-center justify-center
                         text-2xl sm:text-3xl font-bold rounded-lg shadow
                         border-b-4 border-blue-400 bg-white text-sky-600"
            >
              {missing && !revealed ? "_" : ch}
            </div>
          );
        })}
      </div>
    </div>
  );
}

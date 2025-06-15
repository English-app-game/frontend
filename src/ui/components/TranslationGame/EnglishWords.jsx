export default function EnglishWords({ words }) {
  return (
    <div className="p-4 flex flex-wrap gap-4 justify-center items-center text-lg font-medium">
      {words.map(({ word, id }) => (
        <button
          key={id}
          onClick={() => {}}
          className="px-4 py-2 rounded-xl shadow transition"
        >
          {word}
        </button>
      ))}
    </div>
  );
}

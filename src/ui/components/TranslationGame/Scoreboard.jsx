import { useSelector } from "react-redux";

export default function ScoreBoard({ handleBack }) {
  const scoreboard = useSelector((store) => store.translationGame.scoreboard);
  const userId = useSelector((store) => store.user.id);

  const currentUser = scoreboard.find((e) => e.userId === userId);

  return (
    <aside className="flex w-full flex-wrap items-start justify-between gap-4 rounded-2xl bg-gradient-to-r p-4 backdrop-blur-md">
      {/* ───────── Leaderboard ───────── */}
      <div className="flex-1 min-w-[16rem]">
        <header className="mb-4 flex items-center gap-3">
          <h2
            className=" text-2xl font-extrabold tracking-tight text-sky-800"
            dir="rtl"
          >
            לוח תוצאות
          </h2>

          {currentUser && (
            <span
              dir="rtl"
              className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700 shadow-sm ring-1 ring-amber-300"
            >
              הציון שלך:&nbsp;
              <span className="font-black">{currentUser.score}</span>
            </span>
          )}
        </header>

        <ul className="flex flex-wrap gap-3">
          {scoreboard.map(({ userId: id, name, score, color }) => {
            const isCurrent = id === currentUser?.userId;
            return (
              <li
                key={id}
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium shadow-sm transition
                  ${
                    isCurrent
                      ? "bg-amber-50/80 ring-2 ring-amber-500"
                      : "bg-white/60 hover:bg-white/80"
                  }`}
                style={{ backgroundColor: color || undefined }}
              >
                <span className="max-w-[7rem] truncate">{name}</span>
                <span className="font-bold">{score}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ───────── Exit Button ───────── */}
      <button
        onClick={handleBack}
        className="h-fit rounded-lg bg-rose-500/90 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-rose-600 active:scale-95"
      >
        יציאה מהמשחק
      </button>
    </aside>
  );
}

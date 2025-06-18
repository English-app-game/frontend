import { useState, useEffect } from "react";
import StatisticBox from "../../components/StatisticBox";
import { fetchTop } from "../../../utils/handleStatistics";
import {
  GAMES_STATISTICS_PATH,
  PLAYERS_STATISTICS_PATH,
  SCORE_STATISTICS_PATH,
} from "../../../consts/consts";

export default function Main() {
  const [topScores, setTopScores] = useState([]);
  const [topPlayers, setTopPlayers] = useState([]);
  const [topGames, setTopGames] = useState([]);

  useEffect(() => {
    const loadStatistics = async () => {
      const scores = await fetchTop(SCORE_STATISTICS_PATH);
      const players = await fetchTop(PLAYERS_STATISTICS_PATH);
      const games = await fetchTop(GAMES_STATISTICS_PATH);

      if (scores) setTopScores(scores);
      if (players) setTopPlayers(players);
      if (games) setTopGames(games);
    };

    loadStatistics();
  }, []);

  return (
    <div className="bg-secondary flex flex-col md:flex-row gap-5 mt-8 items-center md:items-start justify-center">
      <StatisticBox
        title="Top Scores"
        data={topScores}
        units="Points"
        renderLeft={(player) => {
          const isLongName = player.name.length > 9;
          const displayName = isLongName
            ? player.name.slice(0, 9) + "..."
            : player.name;

          return (
            <div className="relative group flex items-center gap-2">
              <img
                className="w-8 h-8 border-white border rounded-xl"
                src={player.avatar}
                alt={player.name}
              />
              <span className="relative">
                {displayName}

                {isLongName && (
                  <span
                    className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#106c7f] text-white text-xs px-2 py-1 rounded 
                    shadow-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-10 whitespace-nowrap"
                  >
                    {player.name}
                  </span>
                )}
              </span>
            </div>
          );
        }}
      />

      <StatisticBox
        title="Top Players"
        data={topPlayers}
        units="Wins"
        renderLeft={(player) => {
          const isLongName = player.name.length > 9;
          const displayName = isLongName
            ? player.name.slice(0, 9) + "..."
            : player.name;

          return (
            <div className="relative group flex items-center gap-2">
              <img
                className="w-8 h-8 border-white border rounded-xl"
                src={player.avatar}
                alt={player.name}
              />
              <span className="relative">
                {displayName}
                {isLongName && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#106c7f] text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-10 whitespace-nowrap">
                    {player.name}
                  </span>
                )}
              </span>
            </div>
          );
        }}
      />
      <StatisticBox
        title="Top Games"
        data={topGames}
        renderLeft={(game) => <span className="font-medium">{game.name}</span>}
        renderRight={(item) => <span>{item.count} Matches</span>}
      />
    </div>
  );
}

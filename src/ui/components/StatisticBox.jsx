import BlueBox from "../components/BlueBox";
import Header from "../components/Header";

export default function StatisticBox({
  title,
  data = [],
  units = "",
  renderLeft,
  renderRight,
}) {
  return (
    <BlueBox className="w-90 h-110" size="small">
      <Header text={title} className="text-center" />
      <div className="mt-10">
        <ul className="text-white space-y-2">
          {data.map((item, index) => (
            <li key={index} className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <span className="w-4 text-center">
                  {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `${index + 1}.`}</span>{" "}
                {renderLeft(item)}
              </div>
              <span className="font-medium">
                {renderRight
                  ? renderRight(item)
                  : `${item.score ?? item.count ?? "?"} ${units}`}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </BlueBox>
  );
}

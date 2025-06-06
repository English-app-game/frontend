import BlueBox from "../components/BlueBox";
import Header from "../components/Header";
import TopList from "./TopList";

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
            <TopList
              key={index}
              index={index}
              item={item}
              renderLeft={renderLeft}
              renderRight={renderRight}
              units={units}
            />
          ))}
        </ul>
      </div>
    </BlueBox>
  );
}

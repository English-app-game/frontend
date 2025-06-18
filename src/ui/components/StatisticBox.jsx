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
      <div className="pt-10 max-h-[20rem] overflow-y-auto pr-1 custom-scrollbar">
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

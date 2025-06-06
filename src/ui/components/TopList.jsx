export default function TopList({index, item, renderLeft, renderRight, units}) {
  return (
    <li key={index} className="flex items-center justify-between px-2">
      <div className="flex items-center gap-3">
        <span className="w-4 text-center">
          {index === 0
            ? "🥇"
            : index === 1
            ? "🥈"
            : index === 2
            ? "🥉"
            : `${index + 1}.`}
        </span>
        {renderLeft(item)}
      </div>
      <span className="font-medium">
        {renderRight
          ? renderRight(item)
          : `${item.score ?? item.count ?? "?"} ${units ?? ""}`}
      </span>
    </li>
  );
}

import { Link } from "react-router";

export default function ButtonHeader({ navigateTo, text, isInsideSidebar = false }) {
  return (
    <div
      className={`${
        isInsideSidebar
          ? "bg-primary rounded-2xl p-2 px-4"
          : "absolute left-8 flex items-center gap-3 z-100 bg-primary rounded-2xl p-2 px-4"
      }`}
    >
      <Link
        to={navigateTo}
        className="text-white font-medium text-lg hover:cursor-pointer"
      >
        {text}
      </Link>
    </div>
  );
}

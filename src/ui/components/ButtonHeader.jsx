import { Link } from "react-router";

export default function ButtonHeader({ navigateTo, text }) {
  return (
    <div className="absolute top-4 left-8 flex items-center gap-3 z-100 bg-primary rounded-2xl p-2 px-4">
      <Link
        to={navigateTo}
        className="text-white font-medium text-lg hover:cursor-pointer"
      >
        {text}
      </Link>
    </div>
  );
}

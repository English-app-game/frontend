import { useNavigate } from "react-router-dom";

export default function ButtonHeader({ navigateTo, text }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(navigateTo);
  };

  return (
    <div className="absolute top-4 left-8 flex items-center gap-3 z-100 bg-primary rounded-2xl p-2 px-4">
      <a
        onClick={handleNavigate}
        className="text-white font-medium text-lg hover:cursor-pointer"
      >
        {text}
      </a>
    </div>
  );
}

import { IoGameControllerOutline } from "react-icons/io5";
import Header from "../../components/Header";

export default function Nav() {
  return (
    <header className="flex items-center justify-center gap-5 h-16 py-7 sm:py-10 bg-secondary z-50 shadow-md">
      <Header
        text="Join a game room"
        className="text-primary uppercase text-[1.5rem] sm:text-4xl"
      />
      <IoGameControllerOutline size={80} />
    </header>
  );
}

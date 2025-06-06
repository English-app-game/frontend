import Header from "../../components/Header";
import { TiClipboard } from "react-icons/ti";
import ButtonHeader from "../../components/ButtonHeader";
import { ROOMS_LIST } from "../../../routes/routes_consts";

export default function Nav() {
  return (
    <header className="flex items-center justify-center gap-5 h-16 py-7 sm:py-10 bg-secondary z-50 shadow-md">
      <Header
        text="STATISTICS BOARD"
        className="text-primary uppercase text-[1.5rem] sm:text-4xl"
      />
      <TiClipboard size={60}/>
      <ButtonHeader navigateTo={ROOMS_LIST} text={"Game Rooms"}/>
    </header>
  );
}
import { ROOMS_LIST } from "../../../routes/routes_consts";
import { Nav } from "../../components/Nav";
import Main from "./Main"
import { TiClipboard } from "react-icons/ti";

export default function Statistics() {
      return (
        <div className="flex flex-col h-screen bg-secondary relative">
          <Nav HeaderText={"STATISTICS BOARD"} HeaderIcon={TiClipboard} page={ROOMS_LIST} pageText={"Game Rooms"}/>
          <Main/>
        </div>
      );
}
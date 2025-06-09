import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import { ROOMS_LIST } from "../../routes/routes_consts";


export default function CreateRoom() {

  const navigate = useNavigate();

  function handleCreateRoom() {
    navigate(ROOMS_LIST);
  }

  return (
    <div>
      CreateRoom
      <PrimaryButton text="Back to rooms" onClick={handleCreateRoom} />
    </div>
  );
}

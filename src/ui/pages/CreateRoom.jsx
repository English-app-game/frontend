import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import { ROOMS_LIST } from "../../routes/routes_consts";


export default function CreateRoom() {

  const navigate = useNavigate();
  return <div>CreateRoom
    <PrimaryButton text='Back to rooms' onClick={(e) => navigate(ROOMS_LIST)} />
  </div>;
}

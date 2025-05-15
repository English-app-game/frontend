import useAuthRedirect from "@hooks/useAuthRedirect";
import { useNavigate } from "react-router-dom";

export default function ActiveRoom() {
  const navigate = useNavigate();
  useAuthRedirect();

  return <div>ActiveRoom</div>;
}

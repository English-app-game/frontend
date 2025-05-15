import useAuthRedirect from "../hooks/useAuthRedirect";

export default function ActiveRoom() {
  const navigate = useNavigate();

  useAuthRedirect();

  return <div>ActiveRoom</div>;
}

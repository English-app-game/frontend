import { useNavigate, useParams, useLocation } from "react-router-dom";
import { submitLogout, getStoredUser } from "../../hooks/useAuthRedirect";
import { useSocket } from "../../hooks/useSocket";
import { useDispatch } from "react-redux";
import TextButton from "./TextButton";
import AvatarImg from "./AvatarImg";

export default function UserInfoHeader({ isInsideSidebar = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const { socket } = useSocket();

  const user = getStoredUser();

  if (!user) return null;

  const isInWaitingRoom = location.pathname.includes('/rooms/') && params.id;
  const currentRoomKey = isInWaitingRoom ? params.id : null;

  return (
    <div
      className={`${
        isInsideSidebar
          ? "flex items-center gap-3 bg-primary rounded-2xl p-2 text-right"
          : "absolute top-2 right-8 flex items-center gap-3 z-100 bg-primary rounded-2xl p-2 px-4"
      }`}
    >
      <div className="flex flex-col">
        <span className="text-white font-medium text-lg">{user.name}</span>
        <TextButton
          onClick={submitLogout(navigate, socket, currentRoomKey, dispatch)}
          className="text-white hover:cursor-pointer hover:underline"
        >
          Logout
        </TextButton>
      </div>

      <AvatarImg
        src={user.avatarImg}
        alt="avatar"
        className="w-10 h-10 rounded-full border border-white"
      />
    </div>
  );
}

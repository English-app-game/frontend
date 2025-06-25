import { joinUserToRoom } from "../services/room/joinUserToRoom";
import { getStoredUser } from "../hooks/useAuthRedirect";
import { toast } from 'react-toastify';
import { ROOMS_LIST } from "../routes/routes_consts";
import { setUser } from "../store/slices/userSlice";

export async function handleJoinRoomClick({
  id,
  currentPlayers,
  capacity,
  onJoinAttempt,
  navigate,
  dispatch,
}) {
  const user = getStoredUser();

  if (!user || !user.id) {
    alert("User not found. Please log in.");
    return;
  }

  dispatch(setUser(user));

  if (currentPlayers >= capacity) {
    if (onJoinAttempt) {
      onJoinAttempt({ id, full: true });
    } else {
      toast.error("This room is full!");
    }
    return;
  }

  const isGuest = user.isGuest || (typeof user.id === 'string' && user.id.length !== 24);

  const handleJoinError = () => {
    navigate(ROOMS_LIST);
  };

  if (isGuest) {
    const guestData = {
      id: user.id,
      name: user.name,
      avatarImg: user.avatarImg
    };
    await joinUserToRoom(id, user.id, guestData, handleJoinError);
  } else {
    await joinUserToRoom(id, user.id, null, handleJoinError);
  }

  if (onJoinAttempt) {
    onJoinAttempt({ id, full: false });
  }

  navigate(`${ROOMS_LIST}/${id}`);
}

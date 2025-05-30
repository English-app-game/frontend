import ExitButton from "../../../components/ExitButton";
import { ROUTES } from "../../../../routes/routes_consts";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetRoom, setRoom } from "../../../../store/slices/roomSlice";

const RoomHeader = () => {
  const navigate = useNavigate();

  const { id: roomKey } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!roomKey) return;
    async function getRoom() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/rooms/${roomKey}`
        );
        if (!response.ok) {
          throw new Error("Room not found");
        }
        const room = await response.json();
        dispatch(setRoom(room));
      } catch (error) {
        console.error("Error fetching room:", error);
      }
    }

    if (roomKey) {
      getRoom();
    }
  }, [roomKey, dispatch]);

  const handleExit = async () => {
    const user =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user"));

    if (!user || !user.id || !roomKey) {
      console.warn("Missing user or room key");
      dispatch(resetRoom());
      return navigate(ROUTES.ROOMS_LIST);
    }

    try {
      await fetch("http://localhost:5000/api/rooms/players/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomKey,
          userId: user.id,
        }),
      });
    } catch (err) {
      console.error("❌ Failed to remove player from room:", err);
    }

    dispatch(resetRoom());
    navigate(ROUTES.ROOMS_LIST);
  };

  return (
    <>
      <div className="absolute top-4 left-4">
        <ExitButton
          onClick={handleExit}
          className="bg-rose-300 border-4 border-orange-600 hover:bg-rose-400"
        >
          EXIT ROOM
        </ExitButton>
      </div>
      <h1 className="text-4xl font-extrabold text-teal-600 mb-10 uppercase drop-shadow-md text-center">
        WAITING ROOM
      </h1>
    </>
  );
};

export default RoomHeader;

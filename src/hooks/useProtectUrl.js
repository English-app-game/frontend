import { useNavigate } from "react-router-dom";
import { enteredToGameFrom, waitingRoomS } from "../consts/strings";
import { useEffect, useState } from "react";
import { ROOMS_LIST } from "../routes/routes_consts";

export function useProtectUrl() {
  const [blocked, setBlocked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const enteredProperly = localStorage.getItem(enteredToGameFrom);
    if (enteredProperly !== waitingRoomS) {
      setBlocked(true);
      navigate(ROOMS_LIST);
      return;
    }
  }, [navigate]);

  return blocked;
}

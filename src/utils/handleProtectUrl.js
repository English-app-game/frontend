import { ROOMS_LIST } from "../routes/routes_consts";

export function handleProtectUrl(navigate) {
  const enteredProperly = localStorage.getItem("enteredFromWaitingRoom");
  if (enteredProperly !== "true") {
    navigate(ROOMS_LIST);
    return;
  }
}

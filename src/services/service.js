import { BASE_URL } from "../assets/consts";
import { REGISTER_PATH } from "../assets/consts";

export async function registerUser(userToSend) {
  const res = await fetch(`${BASE_URL}${REGISTER_PATH}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userToSend),
  });

  const result = await res.json();

  return { ok: res.ok, result };

}

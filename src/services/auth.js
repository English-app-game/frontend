import { BASE_URL, LOGIN_API } from "../constants/api";

export async function loginUser(email, password) {
  const res = await fetch(`${BASE_URL}${LOGIN_API}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  const data = await res.json();
  return { ok: res.ok, data };
}
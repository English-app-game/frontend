import { BASE_URL, LOGIN_API, GUEST_API } from "../constants/api";

async function postAndStore(endpoint, payload, isGuest = false) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "include",
  });

  const data = await res.json();

  if (res.ok) {
    const storage = isGuest ? sessionStorage : localStorage;
    storage.setItem("token", data.token);
    storage.setItem("user", JSON.stringify(data.user));
  }

  return { ok: res.ok, data };
}

export function loginUser(email, password) {
  return postAndStore(LOGIN_API, { email, password });
}

export function loginGuest(name, avatarImg) {
  return postAndStore(GUEST_API, { name, avatarImg }, true);
}

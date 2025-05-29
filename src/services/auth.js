import { BASE_URL, LOGIN_API, GUEST_API } from "../consts/api";

export async function postAndStore(endpoint, payload, storageType = "local") {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "include",
  });

  const data = await res.json();

  if (res.ok) {
    const storage = storageType === "session" ? sessionStorage : localStorage;
    storage.setItem("token", data.token);
    storage.setItem("user", JSON.stringify(data.user));
  }

  return { ok: res.ok, data };
}

export function loginUser(email, password) {
  return postAndStore(LOGIN_API, { email, password }, "local");
}

export function loginGuest(name, avatarImg) {
  return postAndStore(GUEST_API, { name, avatarImg }, "session");
}


import { BASE_URL, LOGIN_API, GUEST_API } from "../consts/consts";

// Helper function to create fetch with timeout
async function fetchWithTimeout(url, options = {}, timeout = 10000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - please try again');
    }
    throw error;
  }
}

export async function postAndStore(endpoint, payload, storageType = "local") {
  const res = await fetchWithTimeout(`${BASE_URL}${endpoint}`, {
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


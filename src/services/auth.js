import { BASE_URL, LOGIN_API, GUEST_LOGIN_API } from "../constants/api";

export async function loginUser(email, password) {
    const res = await fetch(`${BASE_URL}${LOGIN_API}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
  
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    return data;
  }
  
  export async function loginGuest(name, avatarImg) {
    const res = await fetch(`${BASE_URL}${GUEST_LOGIN_API}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, avatarImg })
    });
  
    const data = await res.json();
    if (res.ok) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(data.user));
      }
    return data;
  }
  
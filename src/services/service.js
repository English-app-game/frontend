export async function registerUser(userToSend) {
  const res = await fetch("http://localhost:5000/api/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userToSend),
  });

  const result = await res.json();

  return { ok: res.ok, result };

}

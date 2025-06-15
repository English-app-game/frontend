import useAuthRedirect from "@hooks/useAuthRedirect";

export default function Auth({ children }) {
  console.log("test from auth");
  useAuthRedirect({ mode: "loggedIn" });
  return <>{children}</>;
}

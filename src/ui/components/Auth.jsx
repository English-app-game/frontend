import useAuthRedirect from "@hooks/useAuthRedirect";

export default function Auth({ children }) {
  useAuthRedirect({ mode: "loggedIn" });
  return <>{children}</>;
}

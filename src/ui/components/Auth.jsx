import useAuthRedirect from "@hooks/useAuthRedirect";

export default function Auth({ children }) {
  useAuthRedirect();
  return <>{children}</>;
}

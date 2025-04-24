import TextButton from "../components/TextButton";

export default function Login() {
  const alert_after_clicking = () => {
    alert("moved to a modal")
  };

  return(
    <TextButton onClick={alert_after_clicking}>Forget Password?</TextButton>
  );
};

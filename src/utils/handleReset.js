import { handleReset } from "../services/service";
import { handleSubmitNewPassword } from "../services/service";

export const onSubmitReset =
  (email, setEmail, setErrors, setServerMessage) => () => {
    setEmail({ email: "" });
    return handleReset(email, setErrors, setServerMessage);
  };


export const onSubmitNewPassword =
  (password, confirmedPassword, setErrors, setServerMessage, token, navigate) =>
  () => {
    return handleSubmitNewPassword(
      password,
      confirmedPassword,
      setErrors,
      setServerMessage,
      token,
      navigate
    );
  };

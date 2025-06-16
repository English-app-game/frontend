import { handleReset } from "../services/service";

export const onSubmitReset =
  (email, setEmail, setErrors, setServerMessage) => () => {
    setEmail({ email: "" });
    return handleReset(email, setErrors, setServerMessage);
  };
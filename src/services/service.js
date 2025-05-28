import {
  BASE_URL,
  RESET_PASSWORD_PATH,
  SET_NEW_PASSWORD_PATH,
  REGISTER_PATH
} from "../assets/consts";
import { validateEmail, validatePassword } from "../utils/validateFields";



export async function registerUser(userToSend) {
  try{
    const res = await fetch(`${BASE_URL}${REGISTER_PATH}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userToSend),
  });
  
 

  const result = await res.json();
  return{ok: res.ok , result}
}catch(err){
  return { ok: false, result: {message:"Server error. Please try again later."} };
}
  

}
///////////////////////////////////////////////
export const handleReset = async (EmailInput, setErrors, setServerMessage) => {
  const errors = {};

  validateEmail(EmailInput.email, errors);
  setErrors(errors);
  setServerMessage(null);

  if (Object.keys(errors).length > 0) return;

  try {
    const res = await fetch(`${BASE_URL}${RESET_PASSWORD_PATH}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: EmailInput.email }),
    });

    const data = await res.json();

    if (res.ok) {
      setServerMessage(data.message);
    } else {
      setServerMessage(data.message);
      setErrors({ general: data.message || "Failed to send reset link." });
    }
  } catch (err) {
    setErrors({ general: "Server error. Please try again later." });
    setServerMessage("something went wrong");
  }
};
///////////////////////////////////////////////
export const handleSubmitNewPassword = async (
  PasswordInput,
  confirmedPasswordInput,
  setErrors,
  setServerMessage,
  token,
  navigate
) => {
  const errors = {};
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  validatePassword(PasswordInput.password, errors);

  if (PasswordInput.password !== confirmedPasswordInput.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (Object.keys(errors).length > 0) {
    setErrors(errors);
    return;
  }
  setErrors(errors);
  setServerMessage(null);

  try {
    const res = await fetch(`${BASE_URL}${SET_NEW_PASSWORD_PATH}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword: PasswordInput.password }),
    });

    const data = await res.json();
    setServerMessage(data.message);
    await sleep(2000);
    navigate("/login");
  } catch (err) {
    setErrors(err);
    console.log(err);
    setServerMessage("Something went wrong.");
  }
};

import { validateRegister } from "../utils/validateFields";
import { registerUser } from "../services/service.js";
import { LOGIN_API } from "../consts/consts.js";
import { postAndStore } from "../services/auth.js"
import { loginFailAfterRegister } from "./utilsStrings.js";
import {ROOMS_LIST} from "../routes/routes_consts.js";
import { serverError } from "../consts/strings.js";

export const handleRegister = async (dataform, setErrors, navigate) => {
  const validationErrors = validateRegister(dataform);
  setErrors(validationErrors);
  if (Object.keys(validationErrors).length > 0) {
    return;
  }

  try {
    const userToSend = {
      name: dataform.name,
      email: dataform.email,
      password: dataform.password,
      avatarImg: dataform.avatarImg,
      lastLogin: new Date(),
    };

    const { ok, result } = await registerUser(userToSend);

    if (!ok) {
      setErrors({ general: result.message });
      return;
    }

    const { ok: loginOk, data } = await postAndStore(LOGIN_API, {
      email: dataform.email,
      password: dataform.password,
    });

    if (!loginOk) {
      setErrors({ general: data.message || loginFailAfterRegister });
      return;
    }

    navigate(ROOMS_LIST);

  } catch (err) {
    setErrors({ general: serverError });
  }
};



export const handleInputChange = (field, dataform, setDataform) => (e) => {
    setDataform({ ...dataform, [field]: e.target.value });
  };
  
  export const handleAvatarClick = (src, dataform, setDataform) => {
    setDataform({ ...dataform, avatarImg: src });
  };
  
  export const onSubmitRegister = (dataform, setErrors, navigate) => {
    return handleRegister(dataform, setErrors, navigate);
  };
  
 export const toggleShowPassword = (showPassword, setShowPassword) => {
  setShowPassword(prev => !prev);
};

  
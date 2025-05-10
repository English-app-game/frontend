import { validateRegister } from "../utils/validateFields";

export const handleRegister = async (dataform, setErrors, navigate) => {
    const validationErrors = validateRegister(dataform);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {return;}

    try{
      const userToSend = {
        name: dataform.name,
        email: dataform.email,
        password: dataform.password,
        avatarImg: dataform.avatarImg,
        lastLogin: new Date(),
      };

      const res = await fetch("http://localhost:5000/api/users/register",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userToSend)
        
      })

      const result = await res.json();

      if (!res.ok) {
        setErrors({ general: result.message });
        console.log({ general: result.message });
        return;
      }

      navigate("/rooms");

    } catch(err){
      setErrors({ general: "Server error, please try again later." });
    }
  };


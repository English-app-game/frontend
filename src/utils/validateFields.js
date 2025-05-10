export function validateRegister(dataform) {
    const errors = {};
  
    if (!dataform.name.trim()) {
      errors.name = "Username is required";
    } else if (!/^[A-Za-z0-9]+$/.test(dataform.name)) {
      errors.name = "Only letters allowed";
    } else if (dataform.name.length > 10) {
      errors.name = "Username too long";
    }
  
    if (!dataform.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.com$/.test(dataform.email)) {
      errors.email = "Invalid Email";
    }
  
    if (!dataform.password.trim()) {
      errors.password = "Password is required";
    } else if (dataform.password.length < 8 || dataform.password.length > 16) {
      errors.password = "Password must be 8–16 characters";
    }

    if (!dataform.avatarImg.trim()) {
      errors.avatarImg = "Please select an avatar";
    }
  
    return errors;
  }
  
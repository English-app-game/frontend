import InputField from "../../components/InputField.jsx";

export default function LoginFormFields({
  email,
  setEmail,
  emailError,
  password,
  setPassword,
  passwordError,
  generalError,
}) {
  return (
    <div className="pt-5">
      <InputField
        id="email"
        text="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      {emailError && <p className="text-red-700 text-md mt-1 ml-1">{emailError}</p>}

      <InputField
        id="password"
        text="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />
      {passwordError && <p className="text-red-700 text-md mt-1 ml-1">{passwordError}</p>}
      {generalError && <p className="text-red-700 text-md mt-2 ml-1">{generalError}</p>}
    </div>
  );
}

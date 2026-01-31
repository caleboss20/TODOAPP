import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [isSaving, setIsSaving] = useState(false);
  // Validation functions
  const validateName = (nameValue) => {
    if (!nameValue.trim()) return "Name is required";
    if (nameValue.trim().length < 2) return "Name must be at least 2 characters";
    if (!/^[a-zA-Z\s'-]+$/.test(nameValue)) return "Name can only contain letters, spaces, hyphens, and apostrophes";
    return "";
  };
  const validateEmail = (emailValue) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValue.trim()) return "Email is required";
    if (!emailRegex.test(emailValue)) return "Invalid email format";
    return "";
  };
  const validatePassword = (passwordValue) => {
    if (!passwordValue.trim()) return "Password is required";
    if (passwordValue.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(passwordValue)) return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(passwordValue)) return "Password must contain at least one lowercase letter";
    if (!/[0-9]/.test(passwordValue)) return "Password must contain at least one number";
    return "";
  };
  const validateConfirmPassword = (confirmValue, passwordValue) => {
    if (!confirmValue.trim()) return "Please confirm your password";
    if (confirmValue !== passwordValue) return "Passwords do not match";
    return "";
  };
  // Update live errors as user types
  useEffect(() => {
    setErrors({
      name: validateName(name),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(confirmPassword, password),
    });
  }, [name, email, password, confirmPassword]);
  // Check if signup button should be disabled
  const isSignUpDisabled =
    !name.trim() ||
    !email.trim() ||
    !password.trim() ||
    !confirmPassword.trim() ||
    errors.name !== "" ||
    errors.email !== "" ||
    errors.password !== "" ||
    errors.confirmPassword !== "";
  const handleSignUp = (e) => {
    e.preventDefault();
    // Final validation
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword, password);
    if (nameError || emailError || passwordError || confirmPasswordError) {
      return;
    }
    // Start saving state
    setIsSaving(true);
    const userData = {
      name,
      email,
      password,
    };
    // Simulate save delay, then navigate to login
    setTimeout(() => {
      localStorage.setItem("userAccount", JSON.stringify(userData));
      setIsSaving(false);
      // Clear form
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      // Navigate to login
      navigate("/login");
    }, 2000);
  };
  return (
    <div>
      {/* Saving Overlay */}
      {isSaving && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-white border-t-violet-500 rounded-full animate-spin"></div>
            <p className="text-white text-sm font-medium">Creating account...</p>
          </div>
        </div>
      )}
      <div className="p-6 mt-10">
        <h2 className="font-medium text-2xl">Create an account</h2>
        <form onSubmit={handleSignUp} className="mt-10 flex flex-col gap-3">
          {/* Name */}
          <div className="flex flex-col gap-3 mb-5">
            <label className="text-black text-md font-small">Name</label>
            <input
              type="text"
              placeholder="Isaac Kwaw"
              className="w-full border-1 border-gray-300 rounded-full py-3 px-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
          </div>
          {/* Email */}
          <div className="flex flex-col gap-3 mb-5">
            <label className="text-black text-md font-small">Email Address</label>
            <input
              type="email"
              placeholder="mensah_4@st.knust.edu.gh"
              className="text-lg w-full border-1 border-gray-300 rounded-full py-3 px-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>
          {/* Password */}
          <div className="flex flex-col gap-3 mb-5">
            <label className="text-black text-md font-small">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full border-1 border-gray-300 rounded-full py-3 px-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>
          {/* Confirm Password */}
          <div className="flex flex-col gap-3 mb-5">
            <label className="text-black text-md font-small">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border-1 border-gray-300 rounded-full py-3 px-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
          </div>
          <div className="mt-5">
            <span className="text-[12px] text-gray-500">
              By continuing you agree to our <span className="text-violet-700">terms of service.</span>
            </span>
          </div>
          <button
            type="submit"
            className={`w-full mt-6 py-3 rounded-full text-white font-medium text-sm ${
              isSignUpDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-violet-700"
            }`}
            disabled={isSignUpDisabled}
          >
            Create Account
          </button>
          <div className="flex items-center my-4 mt-5">
            <hr className="flex-1 border-t border-gray-300" />
            <span className="mx-2 text-gray-400 font-small">or</span>
            <hr className="flex-1 border-t border-gray-300" />
          </div>
          <button
            type="button"
            className="w-full mt-0 py-3 bg-gray-200 rounded-full text-gray-500 font-medium text-sm"
          >
            Continue with Google
          </button>
          <h2 className="text-center text-md text-gray-500 mt-8">
            Already have an account?
            <a href="/login" className="text-violet-700 font-medium">
              {" "}
              Log in here
            </a>
          </h2>
        </form>
      </div>
    </div>
  );
}
export default SignUp;
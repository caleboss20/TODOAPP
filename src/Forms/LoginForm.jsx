import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "", login: "" });
  const [isLoading, setIsLoading] = useState(false);
  // Validate email format
  const validateEmail = (emailValue) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValue.trim()) return "Email is required";
    if (!emailRegex.test(emailValue)) return "Invalid email format";
    return "";
  };
  // Validate password
  const validatePassword = (passwordValue) => {
    if (!passwordValue.trim()) return "Password is required";
    return "";
  };
  // Update live errors as user types
  useEffect(() => {
    setErrors((prev) => ({
      ...prev,
      email: validateEmail(email),
      password: validatePassword(password),
      login: "",
    }));
  }, [email, password]);
  // Check if login button should be disabled
  const isLoginDisabled =
    !email.trim() ||
    !password.trim() ||
    errors.email !== "" ||
    errors.password !== "";
  const handleLogin = (e) => {
    e.preventDefault();
    // Final validation
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    if (emailError || passwordError) {
      return;
    }
    // Get stored account data
    const storedData = localStorage.getItem("userAccount");
   
    if (!storedData) {
      setErrors((prev) => ({
        ...prev,
        login: "Invalid login. Please create an account first.",
      }));
      return;
    }
    try {
      const accountData = JSON.parse(storedData);
      // Validate credentials
      if (accountData.email !== email || accountData.password !== password) {
        setErrors((prev) => ({
          ...prev,
          login: "Invalid email or password. Please try again.",
        }));
        return;
      }
      // Start loading state
      setIsLoading(true);
      // Simulate login delay
      setTimeout(() => {
        // Store login session
        const loginSession = {
          email: accountData.email,
          name: accountData.name,
          loggedInAt: new Date().toISOString(),
        };
        localStorage.setItem("loginSession", JSON.stringify(loginSession));
        // Store keep signed in preference
        if (keepSignedIn) {
          localStorage.setItem("keepSignedIn", "true");
        }
        setIsLoading(false);
        // Clear form
        setEmail("");
        setPassword("");
        // Navigate to home or dashboard
        navigate("/mainpage");
      }, 3000);
    } catch (e) {
      console.error("Login error", e);
      setErrors((prev) => ({
        ...prev,
        login: "An error occurred. Please try again.",
      }));
    }
  };
  return (
    <div>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
            <p className="text-white text-lg font-medium">Logging in...</p>
          </div>
        </div>
      )}
      <div className="p-6 mt-10">
        <h2 className="font-medium text-3xl">Login</h2>
        <p className="text-gray-700 text-md mt-4">Welcome back to Shuttle</p>
        <form onSubmit={handleLogin} className="mt-14">
          {/* Email */}
          <div className="flex flex-col gap-3 mb-5">
            <label className="text-black text-md font-small">Email Address</label>
            <input
              type="email"
              className="text-lg w-full border-1 border-gray-300 rounded-full py-3 px-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>
          {/* Password with Forgot Password */}
          <div className="flex flex-col gap-3 mb-5">
            <div className="flex justify-between items-center">
              <label className="text-black text-md font-small">Password</label>
              <a href="/forgotpassword" className="text-blue-700 text-sm font-medium">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              placeholder="Password"
              className="w-full border-1 border-gray-300 rounded-full py-3 px-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>
          {/* Login Error Message */}
          {errors.login && (
            <div className="bg-red-50 border-1 border-red-200 rounded-lg p-3 mb-5">
              <span className="text-red-600 text-sm">{errors.login}</span>
            </div>
          )}
          {/* Keep Signed In */}
          <div className="flex mt-8 ml-1 gap-3 items-center">
            <input
              type="checkbox"
              className="w-4 h-4 accent-blue-700"
              checked={keepSignedIn}
              onChange={(e) => setKeepSignedIn(e.target.checked)}
            />
            <span className="text-gray-700 text-sm">Keep me signed in</span>
          </div>
          {/* Login Button */}
          <button
            type="submit"
            className={`w-full mt-6 py-3 rounded-full text-white font-medium text-sm ${
              isLoginDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-blue-700"
            }`}
            disabled={isLoginDisabled}
          >
            Login
          </button>
          {/* Divider */}
          <div className="flex items-center my-4 mt-10">
            <hr className="flex-1 border-t border-gray-300" />
            <span className="mx-2 text-gray-400 font-small">or</span>
            <hr className="flex-1 border-t border-gray-300" />
          </div>
          {/* Google Login */}
          <button
            type="button"
            className="w-full mt-6 py-3 bg-gray-200 rounded-full text-gray-500 font-medium text-sm"
          >
            Continue with Google
          </button>
          {/* Sign Up Link */}
          <h2
            onClick={() => navigate("/signup")}
            className="text-center font-medium text-md text-blue-600 mt-8 cursor-pointer hover:text-blue-800"
          >
            Create an account
          </h2>
        </form>
      </div>
    </div>
  );
}
export default LoginForm;
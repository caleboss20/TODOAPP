import { ChevronLeftIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const validateEmail = (emailValue) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(emailValue);
    };
    const handleSendReset = async () => {
        setError("");
        setSuccess(false);
        if (!email.trim()) {
            setError("Email address is required");
            return;
        }
        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }
        setIsLoading(true);
       
        try {
            // Simulate API call (replace with your actual API endpoint)
            await new Promise(resolve => setTimeout(resolve, 2000));
           
            // Uncomment and use your actual API call:
            // const response = await fetch('/api/forgot-password', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ email })
            // });
            // if (!response.ok) throw new Error('Failed to send reset link');
            setSuccess(true);
            setEmail("");
        } catch (err) {
            setError(err.message || "Failed to send reset link. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !isLoading) {
            handleSendReset();
        }
    };
    return (
        <div>
            <div className="pr-6 p-4 flex justify-between items-center">
                <div
                    onClick={() => navigate("/login")}
                    className="p-2 text-gray-700 bg-gray-100 inline-flex rounded-full cursor-pointer hover:bg-gray-200 transition"
                >
                    <ChevronLeftIcon className="w-5 h-5" />
                </div>
                <h2 className="font-medium text-sm text-violet-600">RESET PASSWORD</h2>
            </div>
            <div className="p-6 flex flex-col gap-1">
                <h2 className="font-medium text-lg">Forgot your password?</h2>
                <span className="text-gray-600 font-small text-sm">
                    Enter your email address and we'll send you a link to reset your
                    password
                </span>
            </div>
            <div className="p-6 text-gray-800">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                    }}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading || success}
                    className="w-full py-3 mt-4 border-none bg-gray-100 rounded-full px-4 outline-none disabled:opacity-60 transition"
                    placeholder="you@example.com"
                />
                {/* Error Message */}
                {error && (
                    <p className="mt-3 text-red-500 text-sm font-medium">{error}</p>
                )}
                {/* Success Message with Checkmark */}
                {success && (
                    <>
                    <div className="mt-6 flex gap-2">
                        <CheckCircleIcon className="w-5 h-5 mt-1 text-green-500" />
                        <p className="text-green-600 text-sm font-medium">Email sent successfully!</p>
                        
                    </div>
                    <p className="text-gray-600 text-[12px] ml-7">please check your inbox for the reset link</p>
                    </>
                )}
                {/* Send Reset Button */}
                <button
                    onClick={handleSendReset}
                    disabled={isLoading || success}
                    className={`mt-20 font-medium py-3 text-white w-full rounded-full flex items-center justify-center gap-2 transition ${
                        isLoading || success
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-violet-600 hover:bg-violet-700 active:bg-violet-800"
                    }`}
                >
                    {isLoading && (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    )}
                    {isLoading ? "Sending..." : success ? "Email Sent" : "Send reset link"}
                </button>
                <p className="p-6 ml-5 flex gap-1 text-gray-600">
                    Remember password?
                    <span
                        onClick={() => navigate("/login")}
                        className="text-violet-700 font-small cursor-pointer hover:underline"
                    >
                        Go Back
                    </span>
                </p>
            </div>
        </div>
    );
}
export default ForgotPassword;
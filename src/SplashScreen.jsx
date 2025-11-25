import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
function SplashScreen({ name, setName }) {
  const navigate = useNavigate();
  // Navigate to TodoList
  const directIn = () => {
    navigate("/TodoList");
  };
  // Typing text settings
  const fullText = "Welcome to my Todo app",
    typingSpeed = 80,
    placeholder = "Enter your name...",
    onSubmitName = (name) => {
      console.log("Name submitted:", name);
    };
  // State
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState(""); //  Error state
  // Refs
  const timerRef = useRef(null);
  const inputRef = useRef(null);
  // Typing effect
  useEffect(() => {
    if (finished) return;
    if (index < fullText.length) {
      timerRef.current = setTimeout(() => {
        setDisplayed((prev) => prev + fullText[index]);
        setIndex((i) => i + 1);
      }, typingSpeed);
    } else {
      setFinished(true);
    }
    return () => clearTimeout(timerRef.current);
  }, [index, fullText, typingSpeed, finished]);
  // Focus input when typing finishes
  useEffect(() => {
    if (finished && inputRef.current) {
      inputRef.current.focus();
    }
  }, [finished]);
  // ✅ Real-world validation and submit
  const submit = () => {
    let trimmed = name.trim();
    // Validation rules
    if (!trimmed) {
      setError("Name is required");
      return;
    }
    if (trimmed.length < 3) {
      setError("Name must be at least 3 characters");
      return;
    }
    if (trimmed.length > 20) {
      setError("Name must be less than 20 characters");
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(trimmed)) {
      setError("Name can only contain letters and spaces");
      return;
    }
    if (/\s{2,}/.test(trimmed)) {
      setError("Remove extra spaces in your name");
      return;
    }
    // Passed validation
    setError("");
    // Capitalize each word
    trimmed = trimmed
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    localStorage.setItem("userName", trimmed);
    onSubmitName(trimmed);
    setName("");
    directIn();
  };
  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") submit();
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-violet-50 to-white p-6">
      <style>{`
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
        .splash-cursor {
          display: inline-block;
          width: 2px;
          height: 1.1em;
          margin-left: 2px;
          background: currentColor;
          vertical-align: middle;
          animation: blink 1s steps(2, start) infinite;
        }
      `}</style>
      <div className="max-w-xl w-full text-center p-8">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6">
          <span>{displayed}</span>
          <span
            className="splash-cursor"
            style={{ opacity: finished ? 0.7 : 1 }}
          />
        </h1>
        {/* Input section shows only after typing finishes */}
        <div
          className={`transition-all duration-300 ${
            finished
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="flex flex-col items-center gap-3">
           <div className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="w-full max-w-md px-4 py-3 rounded-lg border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
            />
            <button
              onClick={submit}
              className="px-4 py-3 text-lg bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700 transition"
            >
              Enjoy
            </button>
            </div>
            {/* ✅ Red error text */}
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
export default SplashScreen;
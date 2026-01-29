import { useEffect, useState } from "react";
export default function ToggleButton() {
  const [enabled, setEnabled] = useState(false);
  // Load saved state from localStorage when component mounts
  useEffect(() => {
    const saved = localStorage.getItem("push_notifications");
    if (saved !== null) {
      setEnabled(JSON.parse(saved));
    }
  }, []);
  // Save to localStorage whenever toggle changes
  useEffect(() => {
    localStorage.setItem("push_notifications", JSON.stringify(enabled));
  }, [enabled]);
  return (
    <div className="flex items-center space-x-2">
      
      <button
        onClick={() => setEnabled(!enabled)}
        className={`w-9 h-5 flex items-center rounded-full p-[2px] transition-colors duration-200 mr-2
          ${enabled ? "bg-green-500" : "bg-gray-300"}`}
      >
        <span
          className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200
            ${enabled ? "translate-x-4" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
}
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useState } from "react";
function AddTask({ addeditem, taskInput, handleInput, handleClick }) {
  const [error, setError] = useState("");
  // Convert time to minutes for comparison
  const parseTime = (t) => {
    const [hourMin, meridiem] = t.toLowerCase().split(/(am|pm)/).filter(Boolean);
    const [h, m] = hourMin.split(":").map(Number);
    let hour = h % 12;
    if (meridiem === "pm") hour += 12;
    return hour * 60 + m;
  };
  // Real-world validation
  const submit = () => {
    const task = taskInput.task.trim();
    const start = taskInput.start.trim();
    const end = taskInput.end.trim();
    const priority = taskInput.priority;
    const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9](am|pm)$/i;
    // Task checks
    const taskRegex = /^[a-zA-Z0-9\s.,!?'-]{3,100}$/; // allowed chars
    const vowelCheck = /[aeiouAEIOU]/; // at least one vowel
    const words = task.split(/\s+/); // at least 2 words
    const repeatCheck = /(.)\1{4,}/; // no repeated chars 5+ times
    // Validation sequence
    if (!task || !start || !end || !priority) {
      setError("All fields are required");
      return;
    }
    if (!taskRegex.test(task)) {
      setError("Task must use letters, numbers, and basic punctuation (3–100 chars)");
      return;
    }
    if (!vowelCheck.test(task)) {
      setError("Task must contain at least one vowel (real words only)");
      return;
    }
    if (words.length < 2) {
      setError("Task must contain at least two words");
      return;
    }
    if (repeatCheck.test(task)) {
      setError("Task contains repeated characters, please write a real task");
      return;
    }
    if (!timeRegex.test(start)) {
      setError("Start time must be valid (e.g., 6:00am)");
      return;
    }
    if (!timeRegex.test(end)) {
      setError("End time must be valid (e.g., 12:00pm)");
      return;
    }
    if (parseTime(end) <= parseTime(start)) {
      setError("End time must be after start time");
      return;
    }
    if (!["High", "Medium", "Low"].includes(priority)) {
      setError("Priority must be High, Medium, or Low");
      return;
    }
    // Passed all validation
    setError("");
    handleClick(); // only called if all checks pass
  };
  return (
    <div className="p-7 max-w-3xl mx-auto">
      {/* Navigation */}
      <nav>
        <Link to="/TodoList">
          <ArrowLeftIcon className="w-7 h-7" />
        </Link>
      </nav>
      {/* Form */}
      <div className="w-full mt-10">
        <h2 className="text-3xl font-medium">Add Task</h2>
        {/* Task Input */}
        <div className="mt-10 flex flex-col gap-5">
          <label className="text-xl font-medium">Task</label>
          <input
            type="text"
            onChange={handleInput}
            name="task"
            value={taskInput.task}
            placeholder="Code 9 hours today"
            className="w-full border-none text-xl pl-4 outline-none h-15 bg-gray-100 rounded-2xl"
          />
        </div>
        {/* Start / End */}
        <div className="mt-10 flex flex-col md:flex-row gap-5">
          <div className="flex-1">
            <label className="text-xl font-medium">Start</label>
            <input
              type="text"
              onChange={handleInput}
              name="start"
              value={taskInput.start}
              placeholder="6:00am"
              className="mt-6 w-full border-none text-xl pl-4 outline-none h-15 bg-gray-100 rounded-2xl"
            />
          </div>
          <div className="flex-1">
            <label className="text-xl font-medium">End</label>
            <input
              type="text"
              onChange={handleInput}
              name="end"
              value={taskInput.end}
              placeholder="12:00pm"
              className="mt-6 w-full border-none text-xl pl-4 outline-none h-15 bg-gray-100 rounded-2xl"
            />
          </div>
        </div>
        {/* Priority */}
        <div className="mt-10 gap-5">
          <label className="text-xl font-medium">Priority</label>
          <select
            name="priority"
            value={taskInput.priority || ""}
            onChange={handleInput}
            className="mt-6 w-full border-none text-xl outline-none h-15 bg-gray-100 rounded-2xl"
          >
            <option value="">Select priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        {/* Error Message */}
        {error && <p className="text-red-500 mt-3">{error}</p>}
      </div>
      {/* Submit Button */}
      <button
        onClick={submit}
        className={`cursor-pointer border-none outline-none flex justify-center gap-4 w-full py-5 text-white text-xl font-medium bg-violet-500 rounded-xl mt-10 md:mt-20`}
      >
        <span>{addeditem && !error ? "Task Added" : "Create task"}</span>
      </button>
    </div>
  );
}
export default AddTask;
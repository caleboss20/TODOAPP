import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { UseTodos } from "./TodoContext";
function AddTask() {
  // Hot reload safe destructuring
  const {
    taskInput = { task: "", start: "", end: "", priority: "" },
    handleInput = () => {},
    handleClick = () => {},
    addeditem = false,
    addeditem: addedItem
  } = UseTodos() || {};
  return (
    <div className="p-7">
      {/* Navigation */}
      <nav>
        <Link to="/Home">
          <ArrowLeftIcon className="w-7 h-7" />
        </Link>
      </nav>
      {/* Form */}
      <div className="w-full mt-10">
        <h2 className="text-3xl font-medium">Add Task</h2>
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
        <div className="mt-10 flex gap-5">
          <div>
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
          <div>
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
        <div className="mt-10 gap-5">
          <label className="text-xl font-medium">Priority</label>
          <select
            name="priority"
            value={taskInput.priority}
            onChange={handleInput}
            className="mt-6 w-full border-none text-xl outline-none h-15 bg-gray-100 rounded-2xl"
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
      </div>
      {/* Submit Button */}
      <button
        onClick={handleClick}
        className="cursor-pointer border-none outline-none flex justify-center gap-4 w-full py-5 text-white text-xl font-medium bg-violet-500 rounded-xl mt-56"
      >
        <span>{addeditem ? "Task Added" : "Create task"}</span>
      </button>
    </div>
  );
}
export default AddTask;
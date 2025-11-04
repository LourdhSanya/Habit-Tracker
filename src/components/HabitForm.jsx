import { useState } from "react";

export default function HabitForm({ onAddHabit }) {
  const [habit, setHabit] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!habit.trim()) return;
    onAddHabit(habit);
    setHabit("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={habit}
        onChange={(e) => setHabit(e.target.value)}
        placeholder="Add a new habit..."
        className="flex-1 p-2 rounded bg-gray-800 text-white outline-none"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 px-4 rounded font-semibold"
      >
        Add
      </button>
    </form>
  );
}

import { useState } from "react";

export default function App() {
  const [habit, setHabit] = useState("");
  const [time, setTime] = useState("");
  const [habits, setHabits] = useState([]);

  const addHabit = () => {
    if (!habit.trim() || !time.trim()) return;
    setHabits([...habits, { text: habit, time, done: false }]);
    setHabit("");
    setTime("");
  };

  const toggleDone = (index) => {
    const updated = [...habits];
    updated[index].done = !updated[index].done;
    setHabits(updated);
  };

  const deleteHabit = (index) => {
    setHabits(habits.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-300 to-pink-300 flex items-center justify-center p-4">
      <div className="bg-white/90 rounded-3xl shadow-2xl w-[90%] max-w-2xl p-8">
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2 text-center">
          Today's Schedule
        </h1>
        <p className="text-center text-yellow-600 font-semibold mb-6">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
          })}
        </p>

        {/* Input Section */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter your habit..."
            value={habit}
            onChange={(e) => setHabit(e.target.value)}
            className="flex-1 p-3 rounded-xl bg-gray-100 outline-none text-gray-800 w-full"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="p-3 rounded-xl bg-gray-100 outline-none text-gray-800"
          />
          <button
            onClick={addHabit}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl font-semibold transition-all"
          >
            Add
          </button>
        </div>

        {/* Habit List */}
        <div className="space-y-4">
          {habits.length === 0 ? (
            <p className="text-center text-gray-500 italic">
              No habits added yet 🌱
            </p>
          ) : (
            habits.map((h, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-4 rounded-2xl shadow-md transition-all ${
                  h.done
                    ? "bg-green-200 border-2 border-green-400"
                    : "bg-yellow-100 hover:bg-yellow-200"
                }`}
              >
                <div
                  className={`flex flex-col ${
                    h.done ? "text-gray-600 line-through" : "text-gray-800"
                  }`}
                >
                  <span className="font-semibold text-lg">{h.text}</span>
                  <span className="text-sm font-mono">{h.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleDone(i)}
                    className={`px-3 py-1 rounded-lg text-sm font-semibold transition ${
                      h.done
                        ? "bg-gray-300 text-gray-700"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {h.done ? "Undo" : "Done"}
                  </button>
                  <button
                    onClick={() => deleteHabit(i)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-semibold"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

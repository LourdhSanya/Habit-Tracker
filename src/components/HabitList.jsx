export default function HabitList({ habits, onToggleHabit }) {
  return (
    <ul className="w-full">
      {habits.map((habit, index) => (
        <li
          key={index}
          className="flex justify-between items-center bg-gray-800 p-3 mb-2 rounded-lg"
        >
          <span
            className={`text-lg ${
              habit.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {habit.name}
          </span>
          <button
            onClick={() => onToggleHabit(index)}
            className={`px-3 py-1 rounded ${
              habit.completed
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {habit.completed ? "Done ✅" : "Mark Done"}
          </button>
        </li>
      ))}
    </ul>
  );
}

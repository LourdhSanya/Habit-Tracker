document.addEventListener("DOMContentLoaded", () => {
  const habitInput = document.getElementById("habitInput");
  const habitTime = document.getElementById("habitTime");
  const addBtn = document.getElementById("addBtn");
  const habitList = document.getElementById("habitList");
  const dateDisplay = document.getElementById("date");
  const progressFill = document.getElementById("progressFill");
  const progressText = document.getElementById("progressText");
  const quoteEl = document.getElementById("quote");

  // 🌤️ Date
  const today = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  dateDisplay.textContent = today.toLocaleDateString('en-US', options);

  // 🌈 Quotes List
  const quotes = [
    "Small steps every day lead to big changes.",
    "Consistency beats motivation.",
    "Your future self will thank you.",
    "One day or day one — you decide.",
    "Discipline is choosing what you want most over what you want now.",
    "You are stronger than your excuses.",
    "Start where you are. Use what you have. Do what you can.",
  ];

  // Load habits
  let habits = JSON.parse(localStorage.getItem("habits")) || [];
  habits.forEach(addHabitToList);
  updateProgress();
  randomQuote();

  // Add new habit
  addBtn.addEventListener("click", () => {
    const text = habitInput.value.trim();
    const time = habitTime.value;

    if (text === "") {
      alert("Please enter a habit!");
      return;
    }

    const habit = { text, time, done: false };
    habits.push(habit);
    localStorage.setItem("habits", JSON.stringify(habits));
    addHabitToList(habit);
    updateProgress();
    randomQuote();

    habitInput.value = "";
    habitTime.value = "";
  });

  // Function to display habit
  function addHabitToList(habit) {
    const li = document.createElement("li");

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("habit-info");

    const span = document.createElement("span");
    span.textContent = habit.text;
    if (habit.done) span.classList.add("done");

    const small = document.createElement("small");
    small.textContent = habit.time || "--:--";

    infoDiv.appendChild(span);
    infoDiv.appendChild(small);

    const actions = document.createElement("div");
    actions.classList.add("action-buttons");

    const doneBtn = document.createElement("button");
    doneBtn.textContent = habit.done ? "Undo" : "Done";
    doneBtn.style.backgroundColor = habit.done ? "#f06292" : "#4caf50";

    doneBtn.addEventListener("click", () => {
      habit.done = !habit.done;
      span.classList.toggle("done");
      doneBtn.textContent = habit.done ? "Undo" : "Done";
      doneBtn.style.backgroundColor = habit.done ? "#f06292" : "#4caf50";
      localStorage.setItem("habits", JSON.stringify(habits));
      updateProgress();
      randomQuote();
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.style.backgroundColor = "#ef5350";

    delBtn.addEventListener("click", () => {
      habits = habits.filter((h) => h !== habit);
      localStorage.setItem("habits", JSON.stringify(habits));
      li.remove();
      updateProgress();
    });

    actions.appendChild(doneBtn);
    actions.appendChild(delBtn);

    li.appendChild(infoDiv);
    li.appendChild(actions);
    habitList.appendChild(li);
  }

  // 🎯 Progress updater
  function updateProgress() {
    const total = habits.length;
    const doneCount = habits.filter(h => h.done).length;
    const progress = total === 0 ? 0 : Math.round((doneCount / total) * 100);

    progressFill.style.width = progress + "%";
    progressText.textContent = `${progress}% Completed`;

    if (progress === 100 && total > 0) {
      quoteEl.textContent = "🔥 You crushed all your habits today! Keep it up!";
    }
  }

  // 💬 Random quote generator
  function randomQuote() {
    const random = Math.floor(Math.random() * quotes.length);
    quoteEl.textContent = `"${quotes[random]}"`;
  }
});

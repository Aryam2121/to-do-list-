
  document.addEventListener("DOMContentLoaded", () => {
    const inputTodo = document.querySelector(".input");
    const btnTodo = document.querySelector(".add");
    const blockTodo = document.querySelector(".list");

    // Load tasks from localStorage
    function loadTasks() {
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) {
        blockTodo.innerHTML = savedTasks;
        attachEventListeners();
      }
    }

    // Save tasks to localStorage
    function saveTasks() {
      localStorage.setItem("tasks", blockTodo.innerHTML);
    }

    // Create a new task
    function createTask(taskText) {
      const itemTodo = document.createElement("li");
      itemTodo.classList.add("item");

      const checkTodo = document.createElement("span");
      checkTodo.classList.add("check");
      checkTodo.setAttribute("role", "button");
      checkTodo.setAttribute("aria-label", "Mark as done");

      const taskContent = document.createElement("span");
      taskContent.textContent = taskText;

      const closeTodo = document.createElement("button");
      closeTodo.classList.add("done");
      closeTodo.innerHTML = "&times;";
      closeTodo.setAttribute("aria-label", "Delete task");

      itemTodo.appendChild(checkTodo);
      itemTodo.appendChild(taskContent);
      itemTodo.appendChild(closeTodo);

      blockTodo.appendChild(itemTodo);
      attachEventListeners(); // Attach events to new elements
      saveTasks();
    }

    // Add event listeners to tasks
    function attachEventListeners() {
      blockTodo.querySelectorAll(".check").forEach((check) => {
        check.addEventListener("click", (e) => {
          const item = e.target.closest(".item");
          item.classList.toggle("checked");
          saveTasks();
        });
      });

      blockTodo.querySelectorAll(".done").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const item = e.target.closest(".item");
          item.remove();
          saveTasks();
        });
      });
    }

    // Add task on button click
    btnTodo.addEventListener("click", () => {
      const taskText = inputTodo.value.trim();
      if (taskText) {
        createTask(taskText);
        inputTodo.value = "";
      } else {
        alert("Please enter a task!");
      }
    });

    // Add task on pressing Enter
    inputTodo.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        btnTodo.click();
      }
    });

    // Load tasks on page load
    loadTasks();
  });


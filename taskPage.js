window.onload = async function () {
  const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    
  if (!token || !userId || !userName) {
    // Redirect to login page if token or user ID is not found
    window.location.href = "./index.html";
    return;
  }
document.getElementById("user-name").textContent = `Welcome, ${userName}`;
  document
    .getElementById("add-task-link")
    .addEventListener("click", openAddTaskModal);
  document.getElementById("logout-link").addEventListener("click", logout);

  getTasks();
};

async function getTasks() {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  try {
    const response = await fetch(
      `https://task-mangement-backend-1.onrender.com/api/tasks?userId=${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    );

    const data = await response.json();
    if (data.status) {
      renderTasks(data.tasks);
    } else {
      console.error(data.msg);
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}

function renderTasks(tasks) {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = ""; // Clear previous tasks

  tasks.forEach((task) => {
    const taskItem = document.createElement("div");
    taskItem.id = `task-${task._id}`;
    taskItem.classList.add("task-item");

    const description = document.createElement("p");
    description.textContent = task.description;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => editTask(task));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(task._id));

    taskItem.appendChild(description);
    taskItem.appendChild(editBtn);
    taskItem.appendChild(deleteBtn);

    taskList.appendChild(taskItem);
  });
}

async function addTask(description) {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  try {
    const response = await fetch(
      `https://task-mangement-backend-1.onrender.com/api/tasks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ description }),
      }
    );

    const data = await response.json();
    if (data.status) {
      console.log("Task added successfully");
      getTasks(); // Refresh tasks after adding a new one
    } else {
      console.error(data.msg);
    }
  } catch (error) {
    console.error("Error adding task:", error);
  }
}

async function deleteTask(taskId) {
    // Implement delete task function
    
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://task-mangement-backend-1.onrender.com/api/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        }
      );

      const data = await response.json();
      if (data.status) {
        console.log("Task deleted successfully");
        getTasks(); // Refresh tasks after deleting
      } else {
        console.error(data.msg);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }

}
function cancelEdit(taskItem) {
  // Reload the page to discard changes
  window.location.reload();
}

function editTask(task) {
  
   
      const taskItem = document.createElement("div");
      taskItem.classList.add("task-item");

      const descriptionInput = document.createElement("input");
      descriptionInput.type = "text";
      descriptionInput.value = task.description;

      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.addEventListener("click", () =>
        saveTask(task._id, descriptionInput.value)
      );

      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.addEventListener("click", () => cancelEdit(taskItem));

      taskItem.appendChild(descriptionInput);
      taskItem.appendChild(saveBtn);
      taskItem.appendChild(cancelBtn);

      // Replace the existing task element with the editable taskItem
      const existingTaskElement = document.getElementById(`task-${task._id}`);
      existingTaskElement.replaceWith(taskItem);
    
}
async function saveTask(taskId, newDescription) {
  const token = localStorage.getItem("token");
  const updatedTask = { description: newDescription };

  try {
    const response = await fetch(
      `https://task-mangement-backend-1.onrender.com/api/tasks/${taskId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(updatedTask),
      }
    );

    const data = await response.json();
    if (data.status) {
      console.log("Task updated successfully");
      getTasks(); // Refresh tasks after editing
    } else {
      console.error(data.msg);
    }
  } catch (error) {
    console.error("Error updating task:", error);
  }
}

function openAddTaskModal() {
  const modal = document.getElementById("add-task-modal");
  modal.style.display = "block";

  const closeButton = modal.querySelector(".close");
  closeButton.onclick = function () {
    modal.style.display = "none";
  };

  const addTaskButton = document.getElementById("add-task-btn");
  addTaskButton.onclick = function () {
    const taskDescription = document.getElementById("task-description").value;
    if (taskDescription.trim() !== "") {
      addTask(taskDescription);
      modal.style.display = "none";
    } else {
      alert("Please enter a task description.");
    }
  };
}

function logout() {
 
  // Clear local storage values
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");

  // Redirect to login page
  window.location.href = "./index.html";
}

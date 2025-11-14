window.onload = () => {
    loadTasks();
};

// ADD TASK
function addTask() {
    let title = document.getElementById("titleInput").value;
    let desc = document.getElementById("descInput").value;
    let category = document.getElementById("categoryInput").value;

    if (title === "") {
        alert("Please enter a title");
        return;
    }

    let task = {
        title,
        desc,
        category,
        time: new Date().toLocaleString(),
        completed: false
    };

    saveTask(task);
    displayTask(task);

    document.getElementById("titleInput").value = "";
    document.getElementById("descInput").value = "";
}

// DISPLAY A TASK
function displayTask(task) {
    let li = document.createElement("li");

    li.innerHTML = `
        <div>
            <div class="task-title">${task.title}</div>
            <div class="task-desc">${task.desc}</div>
            <span class="tag">${task.category}</span>
            <small>${task.time}</small>
        </div>

        <div class="action-buttons">
            <button onclick="completeTask(this)">✔</button>
            <button onclick="editTask(this)">✎</button>
            <button onclick="deleteTask(this)">🗑</button>
        </div>
    `;

    if (task.completed) {
        document.getElementById("completedList").appendChild(li);
    } else {
        document.getElementById("pendingList").appendChild(li);
    }
}

// SAVE TASK
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// LOAD ALL TASKS
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(t => displayTask(t));
}

// UPDATE STORAGE
function updateStorage() {
    let tasks = [];

    document.querySelectorAll("#pendingList li").forEach(li => {
        tasks.push(extractTask(li, false));
    });

    document.querySelectorAll("#completedList li").forEach(li => {
        tasks.push(extractTask(li, true));
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Extract HTML into task object
function extractTask(li, completed) {
    return {
        title: li.querySelector(".task-title").textContent,
        desc: li.querySelector(".task-desc").textContent,
        category: li.querySelector(".tag").textContent,
        time: li.querySelector("small").textContent,
        completed
    };
}

// COMPLETE TASK
function completeTask(btn) {
    let li = btn.parentElement.parentElement;
    document.getElementById("completedList").appendChild(li);
    updateStorage();
}

// DELETE TASK
function deleteTask(btn) {
    btn.parentElement.parentElement.remove();
    updateStorage();
}

// EDIT TASK
function editTask(btn) {
    let li = btn.parentElement.parentElement;

    let newTitle = prompt("Edit title:", li.querySelector(".task-title").textContent);
    let newDesc = prompt("Edit description:", li.querySelector(".task-desc").textContent);

    if (newTitle) li.querySelector(".task-title").textContent = newTitle;
    if (newDesc) li.querySelector(".task-desc").textContent = newDesc;

    updateStorage();
}

// DARK MODE
document.getElementById("darkToggle").onclick = () => {
    document.body.classList.toggle("dark");
};

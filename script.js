let pendingTasks = [];
let completedTasks = [];

function addTask() {
    const title = document.getElementById("taskTitle").value;
    const description = document.getElementById("taskDescription").value;

    if (title === "" || description === "") {
        alert("Please fill out both the title and description fields.");
        return;
    }

    const task = {
        id: Date.now(),
        title,
        description,
        completed: false
    };

    pendingTasks.push(task);
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDescription").value = "";
    renderTasks();
}

function renderTasks() {
    const pendingTasksContainer = document.getElementById("pendingTasks");
    const completedTasksContainer = document.getElementById("completedTasks");

    pendingTasksContainer.innerHTML = "";
    completedTasksContainer.innerHTML = "";

    pendingTasks.forEach(task => {
        const taskElement = createTaskElement(task);
        pendingTasksContainer.appendChild(taskElement);
    });

    completedTasks.forEach(task => {
        const taskElement = createTaskElement(task);
        taskElement.classList.add("completed");
        completedTasksContainer.appendChild(taskElement);
    });
}

function createTaskElement(task) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    const taskContent = document.createElement("div");
    taskContent.innerHTML = `<strong>${task.title}</strong><p>${task.description}</p>`;
    taskElement.appendChild(taskContent);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.onclick = () => deleteTask(task.id, task.completed);
    taskElement.appendChild(deleteButton);

    if (!task.completed) {
        const completeButton = document.createElement("button");
        completeButton.innerText = "Complete";
        completeButton.onclick = () => completeTask(task.id);
        taskElement.appendChild(completeButton);
    }

    return taskElement;
}

function completeTask(taskId) {
    const taskIndex = pendingTasks.findIndex(task => task.id === taskId);
    if (taskIndex > -1) {
        const task = pendingTasks[taskIndex];
        task.completed = true;
        completedTasks.push(task);
        pendingTasks.splice(taskIndex, 1);
        renderTasks();
    }
}

function deleteTask(taskId, isCompleted) {
    if (isCompleted) {
        completedTasks = completedTasks.filter(task => task.id !== taskId);
    } else {
        pendingTasks = pendingTasks.filter(task => task.id !== taskId);
    }
    renderTasks();
}

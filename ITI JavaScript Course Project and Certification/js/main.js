// Defining Vriables
const data = new Date();
const taskInputField = document.querySelector(".tasks-input input");
filtersSpan = document.querySelectorAll(".filters span");
clearAll = document.querySelector(".clear-btn");
taskBox = document.querySelector(".tasks-box");
const timeElapsed = Date.now();
const today = new Date(timeElapsed);
document.getElementById("date").innerHTML = today.toDateString();

// Function for time and history
let time = () => {
    const data = new Date();
    let h = data.getHours();
    let m = data.getMinutes();
    let s = data.getSeconds();
    if (h < 10) h = "0" + h;
    if (m < 10) m = "0" + m;
    if (s < 10) s = "0" + s;
    document.getElementById("hour").innerHTML = h + ":" + m + ":" + s;
    setTimeout("time()", 500);
}

// Getting element from the local storagw
let editId,
    iseditNewTask = false,
    todos = JSON.parse(localStorage.getItem("todo-list"));

// Adding and removing active classlist 
filtersSpan.forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodoApp(btn.id);
    });
});

// Function for todo app
let showTodoApp = (filter) => {
    let liTag = "";
    if (todos) {
        todos.forEach((todo, id) => {
            let completed = todo.status == "completed" ? "checked" : "";
            if (filter == todo.status || filter == "all") {
                liTag += `<li class="task">
                            <label for="${id}">
                                <input onclick="updateCurrentStatus(this)" type="checkbox" id="${id}" ${completed}>
                                <p class="${completed}">${todo.name}</p>
                            </label>
                            <div class="settings">
                                <ul class="task-menu">
                                    <li onclick='editNewTask(${id}, "${todo.name}")'><i class="fas fa-pencil-alt"></i></li>
                                    <li onclick='deleteCurrentTask(${id}, "${filter}")'><i class="far fa-trash-alt"></i></li>
                                </ul>
                            </div>
                        </li>`;
            }
        });
    }
    taskBox.innerHTML = liTag || `<span>You didn't add any task here</span>`;
    let checkTask = taskBox.querySelectorAll(".task");
    !checkTask.length
        ? clearAll.classList.remove("active")
        : clearAll.classList.add("active");
    taskBox.offsetHeight >= 300
        ? taskBox.classList.add("overflow")
        : taskBox.classList.remove("overflow");
}
showTodoApp("all");

// Function for update current status
let updateCurrentStatus = (selectedTask) => {
    let taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
}

// Function for edit new task
let editNewTask = (taskId, textName) => {
    editId = taskId;
    iseditNewTask = true;
    taskInputField.value = textName;
    taskInputField.focus();
    taskInputField.classList.add("active");
}

// Function for delete current task
let deleteCurrentTask = (deleteId, filter) => {
    iseditNewTask = false;
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodoApp(filter);
}

// Event for clear all tasks
clearAll.addEventListener("click", () => {
    iseditNewTask = false;
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodoApp();
});

// Event for enter new task
taskInputField.addEventListener("keyup", (e) => {
    let userTask = taskInputField.value.trim();
    if (e.key == "Enter" && userTask) {
        if (!iseditNewTask) {
            todos = !todos ? [] : todos;
            let taskInfo = { name: userTask, status: "pending" };
            todos.push(taskInfo);
        } else {
            iseditNewTask = false;
            todos[editId].name = userTask;
        }
        taskInputField.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodoApp(document.querySelector("span.active").id);
    }
});

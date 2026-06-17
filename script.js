const input = document.getElementById("in");
const addBtn = document.getElementById("add-btn");
const tasks = document.getElementById("tasks");

let todoList = JSON.parse(localStorage.getItem("todos")) || [];

function saveData(){
    localStorage.setItem("todos", JSON.stringify(todoList));
}

function displayTasks(){

    tasks.innerHTML = "";

    for(let i = 0; i < todoList.length; i++){

        const taskDiv = document.createElement("div");
        taskDiv.className = "task";

        const text = document.createElement("span");
        text.textContent = todoList[i].text;

        if(todoList[i].completed){
            text.classList.add("completed");
        }

        const actions = document.createElement("div");
        actions.className = "actions";

        const check = document.createElement("input");
        check.type = "checkbox";
        check.checked = todoList[i].completed;

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        check.onclick = function(){
            todoList[i].completed = check.checked;
            saveData();
            displayTasks();
        };

        editBtn.onclick = function(){

            const value = prompt(
                "Edit task",
                todoList[i].text
            );

            if(value){
                todoList[i].text = value;
                saveData();
                displayTasks();
            }
        };

        deleteBtn.onclick = function(){
            todoList.splice(i,1);
            saveData();
            displayTasks();
        };

        actions.append(
            check,
            editBtn,
            deleteBtn
        );

        taskDiv.append(
            text,
            actions
        );

        tasks.appendChild(taskDiv);
    }
}

function addTask(){

    const text = input.value.trim();

    if(text === ""){
        return;
    }

    todoList.push({
        text:text,
        completed:false
    });

    saveData();
    displayTasks();

    input.value = "";
}

addBtn.onclick = addTask;

input.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addTask();
    }
});

displayTasks();
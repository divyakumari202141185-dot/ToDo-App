//load saved tasks or start with empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//show all tasks by default
let filter = "all";

//run on the page load
displayTasks();

function addTask(){
    //get inputs
    let textInput = document.getElementById("taskInput");
    let dateInput = document.getElementById("dateInput");

    let text = textInput.value.trim();
    let date = dateInput.value;

    //stop if input is empty
    if(text === ""){
        alert("Please enter a task");
        return;
    }

    //add new task to the list
    tasks.push({
        text:text,
        date:date,
        done:false
    });

    saveData();
    displayTasks();

    textInput.value="";
    dateInput.value="";
}

function displayTasks(){
    let list = document.getElementById("taskList");
    list.innerHTML="";

    for(let i=0;i<tasks.length;i++){

        let task = tasks[i];

        //skip tasks that don't match the filter
        if(filter==="pending" && task.done) continue;
        if(filter==="completed" && !task.done) continue;

        let li = document.createElement("li");

        let left = document.createElement("div");

        //show task text
        let text = document.createElement("span");
        text.innerText = task.text;
        
        //strike if task done
        if(task.done){
            text.classList.add("completed");
        }

        //click to toggle done/undone
        text.onclick=function(){
            task.done = !task.done;
            saveData();
            displayTasks();
        };

        left.appendChild(text);

        //show date
        if(task.date){
            let date = document.createElement("div");
            date.className="date";
            date.innerText=task.date;
            left.appendChild(date);
        }

        let right = document.createElement("div");
        right.className="actions";

        //edit button
        let editBtn = document.createElement("button");
        editBtn.innerText="Edit";
        editBtn.onclick=function(){
            let newText = prompt("Edit task", task.text);
            if(newText && newText.trim()!==""){
                task.text=newText.trim();
                saveData();
                displayTasks();
            }
        };

        //delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.innerText="Delete";
        deleteBtn.className="delete";
        deleteBtn.onclick=function(){
            tasks.splice(i,1);
            saveData();
            displayTasks();
        };

        right.appendChild(editBtn);
        right.appendChild(deleteBtn);

        li.appendChild(left);
        li.appendChild(right);

        list.appendChild(li);
    }
}

//change the filter and refresh list
function filterTasks(type){
    filter = type;
    displayTasks();
}

//save tasks to localStorage
function saveData(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//switch dark/light mode
function toggleMode(){
    document.body.classList.toggle("dark");
}
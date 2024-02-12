import { toDo } from "./script.js";
import { inProgress } from "./script.js";
import { complete } from "./script.js";
import { exportArrays } from "./script.js";
export {populateAll};

const toDoSec = document.getElementById("toDoSec");
const progressSec = document.getElementById("progressSec");
const completeSec = document.getElementById("completeSec");

populateAll();

function populateAll(){
    populateToDo();
    populateProgress();
    populateComplete();
}

function populateToDo(){
    toDoSec.innerHTML = '';
    toDo.forEach(element => {
        createTaskDisplay(element, toDoSec)
    });
}

function populateProgress(){
    progressSec.innerHTML = '';
    inProgress.forEach(element => {
        createTaskDisplay(element, progressSec)
    });
}

function populateComplete(){
    completeSec.innerHTML = '';
    complete.forEach(element => {
        createTaskDisplay(element, completeSec)
    });
}

function createTaskDisplay(task, parent){
    let container = document.createElement("div");
    container.className = "task-class";
    parent.appendChild(container);

    let name = document.createElement("h2");
    name.innerText = task.name;
    container.appendChild(name);

    let priori = document.createElement("h5");
    priori.innerText = "Priority: " + task.priority;
    priori.className = task.priority;
    container.appendChild(priori);

    let desc = document.createElement("p");
    desc.innerText = task.description;
    container.appendChild(desc);

    let button = document.createElement("button");
    button.className = "button-class";

    if(task.status == "toDo"){
        button.innerText = "Begin Task"
        button.addEventListener('click', function(e){
            toDo.splice(toDo.indexOf(task), toDo.indexOf(task)+1);
            inProgress.push(task);
            task.status = "inProgress"
            exportArrays();
            populateAll();
        });
    }
    else if(task.status == "inProgress"){
        button.innerText = "Complete Task"
        button.addEventListener('click', function(e){
            inProgress.splice(inProgress.indexOf(task), inProgress.indexOf(task)+1);
            complete.push(task);
            task.status = "complete"
            exportArrays();
            populateAll();
        });
    }
    else
    {
        button.innerText = "Remove Task"
        button.addEventListener('click', function(e){
            complete.splice(complete.indexOf(task), complete.indexOf(task)+1);
            exportArrays();
            populateAll();
        })
    }
    container.appendChild(button);

    let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.className = "edit-btn"
    container.appendChild(editBtn);
    editBtn.setAttribute('data-bs-toggle', "modal");
    editBtn.setAttribute('data-bs-target', "#editModal");
    editBtn.addEventListener('click', function(e){
        edit(task);
    });
}

const changeTask = document.getElementById("changeTask");
const deleteTask = document.getElementById("deleteTask");
const listEdit = document.getElementById("listEdit");
const taskNameEdit = document.getElementById("taskNameEdit");
const taskDescEdit = document.getElementById("taskDescEdit");
const myModal = new bootstrap.Modal('#editModal')

function edit(task){
    taskNameEdit.value = task.name;
    taskDescEdit.value = task.description;
    listEdit.value = task.priority;

    console.log("Edit mode");

    deleteTask.addEventListener('click', function(e){
        switch(task.status){
            case "toDo": 
                toDo.splice(toDo.indexOf(task), toDo.indexOf(task)+1);
            break;
            case "inProgress": 
                inProgress.splice(toDo.indexOf(task), inProgress.indexOf(task)+1);
            break;
                case "complete": 
                complete.splice(complete.indexOf(task), complete.indexOf(task)+1);
            break;
        }
        exportArrays();
        populateAll();
    })
    changeTask.addEventListener('click', function(e){
        task.name = taskNameEdit.value;
        task.description = taskDescEdit.value;
        task.priority = listEdit.value;
        exportArrays();
        populateAll();
        myModal.hide();
    });
}
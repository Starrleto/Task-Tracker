export {toDo};
export {inProgress};
export {complete};
export {exportArrays};
import { populateAll } from "./populate.js";

class Task{
    priority;
    name;
    description;
    status;

    constructor(t, n, d ,s){
        this.priority = t;
        this.name = n;
        this.description = d;
        this.status = s;
        console.log(this);
    }
}

const addTaskBtn = document.getElementById("addTask");
const taskName = document.getElementById("taskName");
const taskDesc = document.getElementById("taskDesc");
const list = document.getElementById("list");
const warning = document.getElementById("warning");
const myModal = new bootstrap.Modal('#myModal')

let toDo = [];
let inProgress = [];
let complete = [];

//reset();
getArrays();

addTaskBtn.addEventListener('click', () => {
    if(taskName.value == "" || taskDesc.value == ""){
        warning.innerText = "Please fill out all the fields.";
    }
    else{
        toDo.push(new Task(list.value, taskName.value, taskDesc.value, "toDo"));
        myModal.hide();
        exportArrays();
        populateAll();
    }
});

function exportArrays(){
    localStorage.setItem("toDo", JSON.stringify(toDo));
    localStorage.setItem("inProgress", JSON.stringify(inProgress));
    localStorage.setItem("complete", JSON.stringify(complete));
}

function reset(){
    toDo = [];
    inProgress = [];
    complete = [];
    exportArrays();
}

function getArrays(){
    toDo = JSON.parse(localStorage.getItem("toDo"));
    inProgress = JSON.parse(localStorage.getItem("inProgress"));
    complete = JSON.parse(localStorage.getItem("complete"));
    console.log(toDo);
    console.log(inProgress);
    console.log(complete);
}
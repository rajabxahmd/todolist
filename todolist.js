const newtaskbutton=document.getElementById("newtaskbutton");
const modalbox=document.getElementById("modalbox");
const closebutton=document.getElementById("closebutton");

newtaskbutton.addEventListener("click", () => {
    modalbox.style.display = "flex";
})

closebutton.addEventListener("click", () => {
    modalbox.style.display = "none";
})

const today = new Date().toISOString().split("T")[0];
document.getElementById("inputdate").min = today;

document.addEventListener('DOMContentLoaded', () => {
    
    const retrievedArray = JSON.parse(localStorage.getItem('inputdata')) || [];
    retrievedArray.forEach(task => {
        addTaskToList(task);
    });
});

const form= document.querySelector('form');
form.addEventListener("submit", (event) =>{
    
event.preventDefault(); 
const inputtask = document.getElementById("inputtask").value;
const inputdate = document.getElementById("inputdate").value;


const inputitems={
    task: inputtask,
    date: inputdate,
    isChecked: false

};
let retrievedarray= JSON.parse(localStorage.getItem('inputdata')) || [];
retrievedarray.push(inputitems);


localStorage.setItem('inputdata',JSON.stringify(retrievedarray));
addTaskToList(inputitems);
form.reset();
modalbox.style.display = 'none';
})


function addTaskToList(inputitems) {  
    
    const li = document.createElement('li');
    li.classList.add('taskbox');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const taskText = document.createElement('p');
    taskText.textContent = inputitems.task;  

    const taskDate = document.createElement('p');
    taskDate.textContent = inputitems.date;  

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('removebtn');
    removeBtn.textContent = 'remove';

    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(taskDate);
    li.appendChild(removeBtn);

    if(inputitems.isChecked){
        taskText.classList.add('finished'); 
        taskDate.classList.add('finished');
        checkbox.checked=true;
    }

    checkbox.addEventListener('change', () => {
        const isChecked = checkbox.checked;
            if (isChecked) {
                taskText.classList.add('finished');
                taskDate.classList.add('finished');
            } else {
                taskText.classList.remove('finished');
                taskDate.classList.remove('finished');
            }
            
                toggleTaskStatus(inputitems, isChecked);
        });

    
    document.getElementById('todo-list').appendChild(li);
    
    removeBtn.addEventListener('click', () => {
        li.remove();
        removeTaskFromLocalStorage(inputitems);
        
    });
}


function removeTaskFromLocalStorage(taskToRemove) {
    
    let retrievedArray = JSON.parse(localStorage.getItem('inputdata')) || [];
    
    
    retrievedArray = retrievedArray.filter(task => 
        task.task !== taskToRemove.task || 
        task.date !== taskToRemove.date || 
        task.comments !== taskToRemove.comments
    );

    
    localStorage.setItem('inputdata', JSON.stringify(retrievedArray));
}

function toggleTaskStatus(task, isChecked) {
    let tasks = JSON.parse(localStorage.getItem('inputdata')) || [];
    
    tasks = tasks.map(storedTask => {
        if (storedTask.task === task.task && storedTask.date === task.date) {
            storedTask.isChecked = isChecked;
        }
        return storedTask;
    });

    localStorage.setItem('inputdata', JSON.stringify(tasks));
}

const SectionButtonA = document.getElementById('section-buttona'); //all tasks
const SectionButtonB = document.getElementById('section-buttonb'); //pending tasks
const SectionButtonC = document.getElementById('section-buttonc'); //finished tasks


SectionButtonA.addEventListener('click',()=>{
    resetStyles();
    SectionButtonA.style.backgroundColor = 'blanchedalmond' ;
    showAllTasks();
});
SectionButtonB.addEventListener('click',()=>{
    resetStyles();
    SectionButtonB.style.backgroundColor = 'blanchedalmond' ;
    showPendingTasks();
});
SectionButtonC.addEventListener('click',()=>{
    showFinishedTasks();
    resetStyles();
    SectionButtonC.style.backgroundColor = 'blanchedalmond' ;
});

function resetStyles(){
    SectionButtonA.style.backgroundColor = '' ;
    SectionButtonB.style.backgroundColor = '' ;
    SectionButtonC.style.backgroundColor = '' ;
}

function showAllTasks() {
    const tasks = document.querySelectorAll('#todo-list .taskbox');
    tasks.forEach(task => {
        task.style.display = 'flex'; 
    });
}

function showPendingTasks(){
    const tasks = document.querySelectorAll('#todo-list .taskbox');
    tasks.forEach(task=> {
        const checkbox = task.querySelector('input[type="checkbox"]');
        if(checkbox.checked){
            task.style.display='none';
        }
        else{
            task.style.display='flex';
        }
    })
}

function showFinishedTasks() {
    const tasks = document.querySelectorAll('#todo-list .taskbox'); 
    tasks.forEach(task => {
        const checkbox = task.querySelector('input[type="checkbox"]'); 
        if (checkbox.checked) {
            task.style.display = 'flex'; 
        } else {
            task.style.display = 'none'; 
        }
    });
}



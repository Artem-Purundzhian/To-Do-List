'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const addForm = document.querySelector('form.add'),
        taskInput = document.querySelector('#taskInput'),
        itemList = document.querySelector('.itemList');
    let taskArr = [];
    let serializeTasks;
    if(localStorage.getItem('tasks')){
        taskArr = JSON.parse(localStorage.getItem('tasks'));
    }else{
        addTask('You will see your tasks here');
    }
    show();
    function inputLog() {
        console.log(taskArr);
    }
    function addTask(value) {
        if(value != '' && value != ' '){
            taskArr.push(value);
            show();
        }
    }
    function show() {
        itemList.innerHTML = '';
        taskArr.forEach((element) => {
            const newTask = document.createElement('div');
            newTask.innerHTML = `
                <div class="item">
                <h5 class="itemName">${element}</h5>
                <div class="itemIcons">
                    <button class = "completeBtn">done</button>
                    <button class = "deleteBtn">delete</button>
                </div>
                </div>
            `;
            itemList.append(newTask);
        });
        document.querySelectorAll('.completeBtn').forEach((element, index) => {
            element.addEventListener('click', event => {
                event.preventDefault();
                event.target.parentNode.parentNode.style.color = 'green';
                setTimeout(() => event.target.parentNode.parentNode.remove(), 1000);
                taskArr.splice(index, 1);
                serializeTasks = JSON.stringify(taskArr);
                localStorage.setItem('tasks', serializeTasks);
            });
        });
        document.querySelectorAll('.deleteBtn').forEach((element, index) => {
            element.addEventListener('click', event => {
                event.preventDefault();
                event.target.parentNode.parentNode.remove();
                taskArr.splice(index, 1);
                inputLog();
                show();
                serializeTasks = JSON.stringify(taskArr);
                localStorage.setItem('tasks', serializeTasks);
            });
        });
        serializeTasks = JSON.stringify(taskArr);
        localStorage.setItem('tasks', serializeTasks);
    }
    addForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addTask(taskInput.value);
        inputLog();
        taskInput.value = '';
    });
});
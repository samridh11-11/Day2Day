
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

document.addEventListener('DOMContentLoaded', () => {

    const taskForm = document.querySelector('.form form');
    const taskInputs = document.querySelectorAll('.taskform');
    const taskList = document.querySelector('.tasklist-main');
    const buttons = document.querySelectorAll('.button3');
    

    const newTaskBtn = buttons[0];
    const submitBtn = buttons[1];
    const taskListBtn = buttons[2];


    function addTask(taskName, taskTime, taskDeadline, taskImportance) {
        const task = {
            id: Date.now(),
            name: taskName,
            time: taskTime,
            deadline: taskDeadline,
            importance: taskImportance
        };
        
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    }

    function displayTasks() {
        if (!taskList) return; // Guard clause if taskList element doesn't exist
        
        taskList.innerHTML = ''; // Clear current task list
        
        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = 'tasklist-body';
            taskElement.innerHTML = `
                <div class="tasklist-task">${task.name}</div>
                <div class="tasklist-time">${task.time}</div>
                <div class="tasklist-deadline">${task.deadline}</div>
                <div class="tasklist-importance">${task.importance}</div>
            `;
            
            taskList.appendChild(taskElement);
        });
    }


    function handleSubmit(e) {
        e.preventDefault();
        
        const taskName = document.querySelector('.taskform[placeholder="What task do you want to do?"]').value;
        const taskTime = document.querySelector('.taskform[placeholder="How much time do you want to spend on it?"]').value;
        const taskDeadline = document.querySelector('.taskform[placeholder="What is the deadline for this task?"]').value;
        const taskImportance = document.querySelector('.taskform[placeholder="How important is this task?(on a 1-10 scale)"]').value;
        
        if (taskName && taskTime && taskDeadline && taskImportance) {
            addTask(taskName, taskTime, taskDeadline, taskImportance);

            document.querySelectorAll('.taskform').forEach(input => input.value = '');
        } else {
            alert('Please fill in all fields');
        }
    }

    function clearTasks() {
        tasks = [];
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    }

    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    }


    function sortByImportance() {
        tasks.sort((a, b) => b.importance - a.importance);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    }

    function sortByDeadline() {
        tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    }


    if (submitBtn) {
        submitBtn.addEventListener('click', handleSubmit);
    }

    if (newTaskBtn) {
        newTaskBtn.addEventListener('click', () => {
            document.querySelectorAll('.taskform').forEach(input => input.value = '');
        });
    }


    if (taskForm) {
        taskForm.addEventListener('submit', handleSubmit);
    }


    displayTasks();
});
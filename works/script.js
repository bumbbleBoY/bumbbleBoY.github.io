document.getElementById('inputTask').addEventListener('submit', saveTask);


function saveTask(e) {
    var taskId = chance.guid();
    var taskContent = document.getElementById("contentInput").value;
    console.log(taskContent);
    var task = {
        id: taskId,
        content: taskContent
    }
    console.log(task);

    if (localStorage.getItem('tasks') == null) {
    var tasks = [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    document.getElementById('inputTask').reset();

    fetchTasks();

    e.preventDefault();
}
function finishedTask(id) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks[i].content = "<del>"+tasks[i].content+"</del>";
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));

    fetchTasks();
} 
function deleteTask(id) {
    var tasks = JSON.parse(localStorage.getItem('tasks'));

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks.splice(i, 1);
        }   
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));

    fetchTasks();
}
function fetchTasks() {
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    var taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    for (let i = 0; i < tasks.length;i++) {
        var id = tasks[i].id;
        var cont = tasks[i].content;

        taskList.innerHTML += "<div class='card task'><div class='card-body'>" +
        "<button class='btn todolistitem' id='todolistitem'>"+ 
        cont + 
        "</button>" +  
        '<button onclick="deleteTask(\''+id+'\');" class="btn btn-danger float-right">Delete</button>' + 
        "</div></div>" +
        '<br>';
    }
    

}
document.getElementById('inputTask').addEventListener('submit', function(e) {
    saveTask(e, 'contentInput', 'tasks', 'inputTask', 'taskList');
});
document.getElementById('salaryTask').addEventListener('submit', function(e) {
    saveTask(e, 'salaryInput', 'salarytasks', 'salaryTask', 'salaryList');
});
document.getElementById('householdTask').addEventListener('submit', function(e) {
    saveTask(e, 'householdInput', 'householdtasks', 'householdTask', 'householdList');
});
document.getElementById('collectionTask').addEventListener('submit', function(e) {
    saveTask(e, 'collectionInput', 'collectiontasks', 'collectionTask', 'collectionList');
});
document.getElementById('paymentTask').addEventListener('submit', function(e) {
    saveTask(e, 'paymentInput', 'paymenttasks', 'paymentTask', 'paymentList');
});
document.getElementById('otherTask').addEventListener('submit', function(e) {
    saveTask(e, 'otherInput', 'othertasks', 'otherTask', 'otherList');
});
document.getElementById('endbutton').addEventListener('click', function() {
    closework();
});



function saveTask(e, contentInput, taskin, inputTask, listoftask) {
    var taskId = chance.guid();
    var taskContent = document.getElementById(contentInput).value;
    console.log(taskContent);
    var task = {
        id: taskId,
        content: taskContent
    }
    console.log(task);

    if (localStorage.getItem(taskin) == null) {
    var tasks = [];
    tasks.push(task);
    localStorage.setItem(taskin, JSON.stringify(tasks));
    } else {
    var tasks = JSON.parse(localStorage.getItem(taskin));
    tasks.push(task);
    localStorage.setItem(taskin, JSON.stringify(tasks));
    }

    document.getElementById(inputTask).reset();

    fetchTasks(taskin, listoftask);

    e.preventDefault();
}
function deleteTask(id, taskin, listoftask) {
    var tasks = JSON.parse(localStorage.getItem(taskin));

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks.splice(i, 1);
        }   
    }

    localStorage.setItem(taskin, JSON.stringify(tasks));

    fetchTasks(taskin, listoftask);
}


function closework(e){
    let allvariables = ["taskList", "salaryList", "householdList", "collectionList", "paymentList", "otherList"];
    let text = [];
    for (let x = 0; x < allvariables.length; x++) {
        for (let i = 0; i < document.getElementsByName(allvariables[x]).length; i++) {
            let text1 = document.getElementsByName(allvariables[x]).item(i).textContent;
            if (x==0){
                text2=document.getElementsByName('staffselection').item(i).value;
                text.push(text1 + " " + text2.split(" ")[0]);
            } else {
                text.push(text1);
            }
        }
    }
    alert(text);
}

function repairtask(){
    fetchTasks("tasks", "taskList");
    fetchTasks("salarytasks", "salaryList");
    fetchTasks("householdtasks", "householdList");
    fetchTasks("collectiontasks", "collectionList");
    fetchTasks("paymenttasks", "paymentList");
    fetchTasks("othertasks", "otherList");
}
function fetchTasks(taskin, listoftask) {
    var tasks = JSON.parse(localStorage.getItem(taskin));
    var taskList = document.getElementById(listoftask);
    if (taskin =="tasks"){
        var select = '<select id="hourchoice" name="staffselection"><option>1 час</option><option>2 часа</option><option>3 часа</option><option>4 часа</option><option>5 часов</option><option>6 часов</option><option>7 часов</option><option>8 часов</option><option>9 часов</option><option>10 часов</option><option>11 часов</option></select>' 
    } else {
        var select = ''
    }
    taskList.innerHTML = "";
    
    for (let i = 0; i < tasks.length;i++) {
        var id = tasks[i].id;
        var cont = tasks[i].content;

        taskList.innerHTML += "<div class='card task' style='width: 90%; max-width: 540px; margin-left: auto; margin-right: auto'><div class='card_body'>" +
        '<button class="btn todolistitem" id="todolistitem" name=\''+listoftask+'\' >'+ 
        cont + 
        "</button>" + 
        select+
        '<button onclick="deleteTask(\''+id+'\', \''+taskin+'\', \''+listoftask+'\');" class="btn btn-danger float-right">Delete</button>' + 
        "</div></div>" +
        '<br>';
    }

}

document.getElementById('expenseschoice').addEventListener('change', function() {
    if (document.getElementById('expenseschoice').value == 'Нет') {
        setdisplays('none', 'none', 'none', 'none', 'none');
    }
    else if (document.getElementById('expenseschoice').value == 'Выдача з/пл.') {
        setdisplays('block', 'none', 'none', 'none', 'none');
    } else if (document.getElementById('expenseschoice').value == 'Хозяйственные расходы') {
        setdisplays('none', 'block', 'none', 'none', 'none');
    } else if (document.getElementById('expenseschoice').value == 'Инкассация') {
        setdisplays('none', 'none', 'block', 'none', 'none');
    } else if (document.getElementById('expenseschoice').value == 'Оплата поставщику') {
        setdisplays('none', 'none', 'none', 'block', 'none');
    } else if (document.getElementById('expenseschoice').value == 'Прочее') {
        setdisplays('none', 'none', 'none', 'none', 'block');
    }
})


function setdisplays(salary, household, collection, payment, other){
    document.getElementById('salary').style.display = salary;
    document.getElementById('household').style.display = household;
    document.getElementById('collection').style.display = collection;
    document.getElementById('payment').style.display = payment;
    document.getElementById('other').style.display = other;
}


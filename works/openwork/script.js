document.getElementById('inputTask').addEventListener('submit', saveTask);
let tg = window.Telegram.WebApp;
tg.expand();

function saveTask(e) {
    data = {
        theamountstartday: document.getElementById("contentInput").value
    }
    if ((data['theamountstartday'].length < 3)){
        return document.getElementById("error").style.display = "block";
    }
    tg.sendData(JSON.stringify(data));
    tg.close();
}

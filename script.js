let tg = window.Telegram.WebApp;
let order = document.getElementById("order");
let next = document.getElementById("next");
let checkbox = document.getElementById("checkbox");
tg.expand();

checkbox.addEventListener("change", () => {
    if (document.getElementById("checkbox").checked) {
        document.getElementById("next").style.display = "flex";
    } else {
        document.getElementById("next").style.display = "none";
    }
})

next.addEventListener("click", () => {
    if (document.getElementById("checkbox").checked) {
        document.getElementById("main").style.display = "none";
        document.getElementById("form").style.display = "block";
    }
});

order.addEventListener("click", () => {
    let data = {
        name: document.getElementById("user_name").value,
        surname: document.getElementById("user_surname").value,
        patronymic: document.getElementById("user_patronymic").value,
        birthday: document.getElementById("user_birthday").value,
        phone: document.getElementById("user_phone").value,
        email: document.getElementById("user_email").value,
        vk: document.getElementById("user_vk").value,
        registration: document.getElementById("user_registration").value,
        residence: document.getElementById("user_residence").value,
        seriesandnumber: document.getElementById("user_seriesandnumber").value,
        dateofissue: document.getElementById("user_dateofissue").value,
        issuedbywhom: document.getElementById("user_issuedbywhom").value,
        division: document.getElementById("user_division").value,
        inn: document.getElementById("user_inn").value,
        snils: document.getElementById("user_snils").value
    };

    if ((data['name'].length < 3) 
        || (data['surname'].length < 3) 
        || (data['patronymic'].length < 3) 
        || (data['birthday'].length < 6)   
        || (data['phone'].length < 8) 
        || (data['email'].length < 10) 
        || (data['registration'].length < 15) 
        || (data['residence'].length < 15) 
        || (data['seriesandnumber'].length < 5) 
        || (data['dateofissue'].length < 4) 
        || (data['issuedbywhom'].length < 4) 
        || (data['division'].length < 4) 
        || (data['inn'].length < 5) 
        || (data['snils'].length < 5)) {
        document.getElementById("error").innerText = "Заполните все обязательные поля";
        return;
    }
    tg.sendData(JSON.stringify(data));
    tg.close();
});
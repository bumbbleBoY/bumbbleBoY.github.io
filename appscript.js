let tg = window.Telegram.WebApp;
let order = document.getElementById("order");
tg.expand();

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
    }
    
    for ((key, value) in userdictionary) {
        if (userdictionary[key].length < 5) {
            if (key != "vk") {
                document.getElementById("error").innerText = "Заполните все обязательные поля";
            }
            return;

        }
    }


    tg.sendData(JSON.stringify(data));
    tg.close();
});
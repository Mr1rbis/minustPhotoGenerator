// styleSwitcher.js

// Функция для установки куки с атрибутом SameSite=None
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    // Добавлены атрибуты SameSite=None и Secure
    document.cookie = name + "=" + value + expires + "; path=/; SameSite=None; Secure";
}

// Функция для получения значения куки
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Функция для добавления/удаления класса трансформации
function toggleTransformClass(add) {
    var contentElement = document.querySelector(".content");
    contentElement.classList[add ? 'add' : 'remove']("transform-slide");
}

// Функция для изменения стиля
function changeStyle() {
    var styleSelector = document.getElementById("styleSelector");
    var selectedStyle = styleSelector.value;

    // Добавление класса трансформации при смене стиля
    toggleTransformClass(true);

    // Установка выбранного стиля в куки
    setCookie("selectedStyle", selectedStyle, 365);

    // Получение ссылки на стиль
    var linkElement = document.getElementById("styleLink");

    // Применение выбранного стиля к странице
    linkElement.setAttribute("href", "./assets/css/auto/" + selectedStyle + ".css");

    // Удаление класса трансформации после завершения трансформации
    setTimeout(function() {
        toggleTransformClass(false);
    }, 1000); // Замените 1000 на длительность вашей трансформации в миллисекундах
}

// Загрузка стиля из куки при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
    var savedStyle = getCookie("selectedStyle");
    if (savedStyle) {
        var styleSelector = document.getElementById("styleSelector");
        styleSelector.value = savedStyle;
        changeStyle();
    }
});

// Прямое получение ссылки на стиль при загрузке страницы
var linkElement = document.getElementById("styleLink");




// Ваш основной файл, например, main.js

// Вызов функции загрузки стилей при загрузке страницы
loadStyles();

// Прямое получение ссылки на стиль при загрузке страницы
var linkElement = document.getElementById("styleLink");

// Загрузка стиля из куки при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
    var savedStyle = getCookie("selectedStyle");
    if (savedStyle) {
        var styleSelector = document.getElementById("styleSelector");
        styleSelector.value = savedStyle;
        changeStyle();
    }
});


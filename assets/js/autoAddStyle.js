// Ваш файл, например, jsonStyles.js

// Функция для загрузки JSON и генерации option элементов
function loadStyles() {
    var styles = [
        {
            "fileName": "zbt.css",
            "name": "Стандартная Тёмная"
        },
        {
            "fileName": "zbt_white.css",
            "name": "Стандартная Светлая"
        },
        {
            "fileName": "Furrc.css",
            "name": "FURRC EDITION"
        }
        // Добавьте остальные стили
    ];

    var styleSelector = document.getElementById("styleSelector");

    // Очистка существующих элементов внутри <select>
    styleSelector.innerHTML = "";

    // Генерация option элементов из JSON
    styles.forEach(function(style) {
        var option = document.createElement("option");
        option.value = style.fileName.replace(".css", ""); // Убираем расширение .css
        option.textContent = style.name;
        styleSelector.appendChild(option);
    });
}

// Вызов функции при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
    loadStyles();
    var savedStyle = getCookie("selectedStyle");
    if (savedStyle) {
        var styleSelector = document.getElementById("styleSelector");
        styleSelector.value = savedStyle;
        changeStyle();
    }
});
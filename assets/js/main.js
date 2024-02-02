
function generateBookCover() {
    var nickname = document.getElementById('minecraftNickname').value;

    // Проверка наличия ника
    if (!nickname) {
        alert('Пожалуйста, введите ник в Minecraft.');
        return;
    }

    var imageUrl = `https://minotar.net/helm/${nickname}/8.png`;

    // Создание изображения
    var img = new Image();
    img.crossOrigin = 'Anonymous'; // Разрешение загрузки изображения с другого домена
    img.src = imageUrl;

    // Обработка загрузки изображения
    img.onload = function() {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);

        // Получение данных пикселей изображения
        var imageData = ctx.getImageData(0, 0, img.width, img.height).data;

        // Преобразование пикселей в разнообразные квадратные смайлики с переносом после каждого 8-го символа
        var outputText = '';
        for (var i = 0; i < imageData.length; i += 4) {
            // Преобразование цвета в разнообразный квадратный символ
            var symbol = getSymbolFromColor(imageData[i]);
            outputText += symbol;

            // Добавление переноса строки после каждого 8-го символа
            if ((i / 4 + 1) % 8 === 0) {
                outputText += '\n';
            }
        }

        // Отображение символов на странице
        document.getElementById('output').innerText = outputText;
    };
}

function getSymbolFromColor(color) {
    // Включаем все похожие на █ символы
    var symbols = ['█', '▓', '▒', '░'];

    // Преобразование цвета в индекс символа
    var index = Math.floor((color / 255) * (symbols.length - 1));
    return symbols[index];
}

function copyToClipboard() {
    var outputText = document.getElementById('output');
    var range = document.createRange();
    range.selectNode(outputText);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    alert('Текст скопирован!');
}

document.getElementById('minecraftNickname').addEventListener('input', function() {
    var inputText = this.value.toLowerCase();
    var designText = document.getElementById('designText');

    if (inputText === 'setvar') {
        designText.innerHTML += ' ❤️';
    } else {
        designText.innerHTML = 'design by ***** + scripts by MrIrbis';
    }
});
// СТИЛИ
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function changeStyle() {
    var styleSelector = document.getElementById("styleSelector");
    var selectedStyle = styleSelector.options[styleSelector.selectedIndex].value;
    var currentStyleSheet = document.getElementById("styleSheet");

    // Создаем новый элемент стиля
    var newStyleSheet = document.createElement("link");
    newStyleSheet.rel = "stylesheet";
    newStyleSheet.href = "./assets/css/" + selectedStyle + ".css";
    newStyleSheet.id = "styleSheet";

    // Заменяем текущий стиль новым
    currentStyleSheet.parentNode.replaceChild(newStyleSheet, currentStyleSheet);

    // Добавляем анимацию для body (замените на свои стили)
    document.body.style.backgroundColor = getComputedStyle(document.body).backgroundColor;
    setTimeout(function () {
        document.body.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--background-color');
    }, 0);

    // Сохраняем выбранный стиль в куки на 7 дней
    setCookie("selectedStyle", selectedStyle, 7);
}

window.onload = function () {
    var selectedStyleCookie = getCookie("selectedStyle");
    if (selectedStyleCookie) {
        var styleSelector = document.getElementById("styleSelector");
        styleSelector.value = selectedStyleCookie;
        changeStyle();
    }
};
$("#minecraftNickname").keyup(function(event) {
    if (event.keyCode === 13) {
        $(".create-passport").click();
    }
});

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + value + expires + "; path=/; SameSite=None; Secure";
}

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

function changeStyle() {
    var styleSelector = document.getElementById("styleSelector");
    var selectedStyle = styleSelector.value;

    setCookie("selectedStyle", selectedStyle, 365);

    var linkElement = document.getElementById("styleLink");

    linkElement.setAttribute("href", "./assets/css/auto/" + selectedStyle + ".css");
    
}

document.addEventListener("DOMContentLoaded", function () {
    var savedStyle = getCookie("selectedStyle");
    if (savedStyle) {
        var styleSelector = document.getElementById("styleSelector");
        setTimeout(() => {
        styleSelector.value = savedStyle;
        changeStyle();
  }, 300);


    }
});

 var linkElement = document.getElementById("styleLink");

loadStyles();

var linkElement = document.getElementById("styleLink");



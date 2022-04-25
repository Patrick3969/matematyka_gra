function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    let cookie = getCookie("score");
    if (cookie == "" || cookie < 0) {
        setCookie("score", 0, 365)
    }
}

function checkOutput() {
    if (FormOutput.value == outputResult) {
        setCookie("score", ++cookie, 365)
    } else {
        setCookie("score", --cookie, 365)
    }
}

let number = 5

function countdown() {
    const timeScreen = document.getElementById("timeScreen")
    if (number < 0) {
        checkOutput()
        document.location.reload(false)
    } else {
        FormOutput.focus()
        timeScreen.innerHTML = "czas: " + number
        number = number - 1
    }
    setTimeout("countdown()", 1000)
}


let colors = ["#B4FF9F", "#417D7A", "#F55353", "#00AFC1", "#FFD93D", "E4AEC5", "C3E5AE"]
let body = document.querySelector("body")
body.style.backgroundColor = colors[getRandomNumber(0, 3)]

checkCookie()
let cookie = getCookie("score")

const operation = document.getElementById("operation")
const FormOutput = document.getElementById("FormOutput")
FormOutput.value = ""
const scoreScreen = document.getElementById("scoreScreen")



let arr = ["/", "*", "-", "+"]
let firstNumber = getRandomNumber(1, 4)
let secondNumber = getRandomNumber(1, 4)
let character = arr[getRandomNumber(0, 3)]
let outputOperation = firstNumber + " " + character + " " + secondNumber
switch (character) {
    case ("/"):
        outputResult = firstNumber / secondNumber
        break;

    case ("*"):
        outputResult = firstNumber * secondNumber
        break;

    case ("-"):
        outputResult = firstNumber - secondNumber
        break;

    case ("+"):
        outputResult = firstNumber + secondNumber
        break;
}


operation.innerHTML = outputOperation + " ="
console.log(outputOperation + " = " + outputResult)
scoreScreen.innerHTML = "wynik: " + cookie


countdown()
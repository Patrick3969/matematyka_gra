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

function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkOutput() {
    if (FormOutput.value == outputResult) {
        setCookie("score", ++cookie, 365)
    } else {
        setCookie("score", --cookie, 365)
    }
}


let colors = ["#54d3de", "#C6FF67", "#FF876B", "#A486FF", "#e6607f", "#E4AEC5", "#2ac783"]
let elements = document.querySelectorAll("section")
let shape = document.querySelectorAll("path")
let color1 = colors[getRandomNumber(0, 6)]
let color2 = colors[getRandomNumber(0, 6)]
let color3 = colors[getRandomNumber(0, 6)]
while (color2 == color1 || color2 == color3) {
    color2 = colors[getRandomNumber(0, 6)]
}
while (color3 == color1 || color3 == color2) {
    color3 = colors[getRandomNumber(0, 6)]
}

elements[0].style.backgroundColor = color1
shape[0].style.fill = color2
elements[1].style.backgroundColor = color2
shape[1].style.fill = color3
elements[2].style.backgroundColor = color3


checkCookie()
let cookie = getCookie("score")
const operation = document.getElementById("operation")
const FormOutput = document.getElementById("FormOutput")
FormOutput.value = ""
FormOutput.focus()
const scoreScreen = document.getElementById("scoreScreen")

let arr = ["/", "*", "-", "+"]
let firstNumber = getRandomNumber(1, 10)
let secondNumber = getRandomNumber(1, 10)
let character = arr[getRandomNumber(0, 3)]

switch (character) {
    case ("/"):
        while (firstNumber % secondNumber != 0) {
            firstNumber = getRandomNumber(1, 10)
            secondNumber = getRandomNumber(1, 10)
        }
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

let outputOperation = firstNumber + " " + character + " " + secondNumber
operation.innerHTML = outputOperation + " ="
console.log(outputOperation + " = " + outputResult)
scoreScreen.innerHTML = "wynik: " + cookie
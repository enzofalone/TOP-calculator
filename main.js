let displayValue;
let intValue;
let isEmpty = true;

let firstOperand = "";
let secondOperand = "";
let desiredOperator = null;
let display = document.querySelector(".display");

function displayNew(val) {
    if (display.innerHTML === "0") {
        isEmpty = false;
        display.innerHTML = val;
    } else {
        display.innerHTML += val;
    }
}

function resetDisplay() {
    firstOperand = "";
    secondOperand = "";
    desiredOperator = null;
    display.innerHTML = "0";
    isEmpty = true;
}

function displayResult(val) {
    firstOperand = val; //let the first operand be the result so the user can keep inputting more operations
    secondOperand = "";
    desiredOperator = null;
    display.innerHTML = val;
}

numbers = document.querySelectorAll(".number");

numbers.forEach(e => {
    e.addEventListener("click", (i) => {
        if (desiredOperator === null) {
            if ((firstOperand === "") && (e.innerHTML === "0")) { } //do nothing. this would just be an insignificant number and its the shortest way to fix this input
            else {
                firstOperand += e.innerHTML;
                console.log("first operand: " + firstOperand);
            }
        } else {
            secondOperand += e.innerHTML;
            console.log("second operand: " + secondOperand);
        }

        displayNew(e.innerHTML);
    });
});

//all clear button
let ac = document.querySelector("#ac").addEventListener("click", (e) => {
    resetDisplay();
});

//operators button
let operators = document.querySelectorAll(".operator");
operators.forEach(e => {
    e.addEventListener("click", () => {
        console.log(isEmpty);
        if (!isEmpty) {
            desiredOperator = e.id;
            displayNew(e.innerHTML);
        }
    });
});

//reverse button
let reverseButton = document.querySelector("#reverse").addEventListener("click", (e) => {
    operate(display.innerHTML, -1, "multiply");
}) 

//equal button
let equalButton = document.querySelector("#equal").addEventListener("click", (e) => {
    if((firstOperand !== "") && (secondOperand !== "")) {
        operate(firstOperand, secondOperand, desiredOperator);
    }
});

function operate(operand1, operand2, operator) {
    let floatOperand1 = parseFloat(operand1);
    let floatOperand2 = parseFloat(operand2);

    if (operator == "add") {
        displayResult(floatOperand1 + floatOperand2);
    }
    if (operator == "subtract") {
        displayResult(floatOperand1 - floatOperand2);
    }
    if (operator == "divide") {
        displayResult(floatOperand1 / floatOperand2);
    }
    if (operator == "multiply") {
        displayResult(floatOperand1 * floatOperand2);
    }
}
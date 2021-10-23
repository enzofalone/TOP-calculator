let displayValue;
let intValue;

let firstOperand = "";
let secondOperand = "";
let desiredOperator = null;
let display = document.querySelector(".display");

function displayNew(val) {
if(display.innerHTML === "0"){
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
}

function displayResult(val) {
    firstOperand = "";
    secondOperand = "";
    desiredOperator = null;
    display.innerHTML = val;    
}

numbers = document.querySelectorAll(".number");

numbers.forEach(e => {
    e.addEventListener("click", (i) => {
       if(desiredOperator === null) {
           if((firstOperand === "") && (e.innerHTML === "0")){} //do nothing. this would just be an insignificant number and its the shortest way to fix this input
           else{
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
    e.addEventListener("click", () =>{
        desiredOperator = e.id;
        displayNew(e.innerHTML);
    });
});
//equal button
let equalButton = document.querySelector("#equal").addEventListener("click", (e) => {
    operate(firstOperand,secondOperand,desiredOperator);
});

function operate(operand1, operand2, operator) {
    let floatOperand1 = parseInt(operand1);
    let floatOperand2 = parseInt(operand2);

    if(operator == "add") {
        displayResult(floatOperand1+floatOperand2);
    }
    if(operator == "subtract") {
        return operand1-operand2
    }
    if(operator == "divide") {
        return operand1/operand2
    }
    if(operator == "multiply") {
        return operand1*operand2
    }
}
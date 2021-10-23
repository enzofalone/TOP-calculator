let displayValue;
let intValue;
//isEmpty works to remove the initial 0 calculators have. Only used on AC frequently and at startup
let isEmpty = true;

//placeholder variable in order to know whether or not the user has already asked for a result in order to keep 
//going with new calculations keeping the previous ones
let firstResultDisplay = false;

let display = document.querySelector(".display");

//placeholder
let resultVal = "";

//main variables used for calculations
let firstOperand = "";
let secondOperand = "";
let desiredOperator = "";

let desiredOperatorPrevious //placeholder variable to check last operator in order to manage animations

let desiredOperatorElement;


//this variable is going to control whether or not the screen should be cleared in order to input the second operand
let afterOperator = false;

//elements
let ac = document.querySelector("#ac");

function displayNew(val) {
    if (!afterOperator) {
        if (display.innerHTML === "0") {
            isEmpty = false;
            display.innerHTML = val;
        } else {
            if (firstResultDisplay) {
                display.innerHTML = val;
                firstResultDisplay = false;
            } else {
                display.innerHTML += val;
            }
        }
    } else {
        afterOperator = false;

        display.innerHTML = val;
    }

    ac.innerHTML = "C";
}

//Function in charge of clearing the display and variables
function resetDisplay() {
    if(desiredOperatorElement !== undefined) {
        desiredOperatorElement = document.querySelector("#" + desiredOperator);
        desiredOperatorElement.style.backgroundColor = "gray";
    }

    firstOperand = "";
    secondOperand = "";
    desiredOperator = "";
    display.innerHTML = "0";
    isEmpty = true;

    ac.innerHTML = "AC";
}

function displayResult(val) {
    firstOperand = val; //let the first operand be the result so the user can keep inputting more operations
    secondOperand = "";
    //desiredOperator = "";
    display.innerHTML = val;

    resultVal = val;
    firstResultDisplay = true;
}

//numbers button
numbers = document.querySelectorAll(".number");

numbers.forEach(e => {
    e.addEventListener("click", (i) => {
        //e.classList.add("button-click")
        if (desiredOperator === "") {
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



//operators button
let operators = document.querySelectorAll(".operator");
operators.forEach(e => {
    e.addEventListener("click", () => {
        console.log(isEmpty);
        if (!isEmpty) {
            desiredOperator = e.id;

            desiredOperatorElement = document.querySelector("#" + e.id);
            desiredOperatorElement.style.backgroundColor = "indigo";//placeholder color (no palette atm)
            
            afterOperator = true; //variable set true in order to clear the display just when inputting the second operand
        }

    });
});

//all clear button
ac.addEventListener("click", (e) => {

    resetDisplay();

});

//reverse button
let reverseButton = document.querySelector("#reverse").addEventListener("click", (e) => {
    operate(display.innerHTML, -1, "multiply");
});

//equal button
let equalButton = document.querySelector("#equal").addEventListener("click", (e) => {
    if ((firstOperand !== "") && (secondOperand !== "")) {
        operate(firstOperand, secondOperand, desiredOperator);
    }

    //keep using old second operand if equal button is used without any new input
    if (firstResultDisplay) {
        operate()
    }
});

//percentage button
let percentageButton = document.querySelector("#percentage").addEventListener("click", (e) => {
    if (firstOperand !== 0 && desiredOperator == "") {
        operate(firstOperand, 100, "divide");
    }
});

//dot/decimal button
let dotButton = document.querySelector("#dot").addEventListener("click", (e) => {
    if (desiredOperator !== "") {
        secondOperand += ".";
    } else {
        firstOperand += ".";
    }
    displayNew(".");
    console.log("dot");
});

//function that is in charge of sending different parameters to the displayResult function with the desired calculations
function operate(operand1, operand2, operator) {
    let floatOperand1 = parseFloat(operand1);
    let floatOperand2 = parseFloat(operand2);

    if (operator === "add") {
        displayResult(floatOperand1 + floatOperand2);
    }
    if (operator === "subtract") {
        displayResult(floatOperand1 - floatOperand2);
    }
    if (operator === "divide") {
        displayResult(floatOperand1 / floatOperand2);
    }
    if (operator === "multiply") {
        displayResult(floatOperand1 * floatOperand2);
    }

    if (operator === "percentage") {
        displayResult((floatOperand1 / floatOperand2) * 100);
    }
}
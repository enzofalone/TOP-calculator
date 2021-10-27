//style constants
const BUTTON_INACTIVE_COLOR = "gray";
const BUTTON_ACTIVE_COLOR = "indigo";

let displayValue;
let intValue;
//isEmpty works to remove the initial 0 calculators have. Only used on AC frequently and at startup
let isEmpty = true;

//placeholder variable in order to know whether or not the user has already asked for a result in order to keep 
//going with new calculations keeping the previous ones
let firstResultDisplay = false;

let display = document.querySelector(".display");

//main variables used for calculations
let firstOperand = "";
let secondOperand = "";

//equal button feature 
let secondOperandPrevious = "";

//desired operator variables
let desiredOperator = "";
let desiredOperatorPrevious //placeholder variable to check last operator in order to manage animations
let desiredOperatorElement;

//dot control
let dotExistOpOne = false;
let dotExistOpTwo = false;

//this variable is going to control whether or not the screen should be cleared in order to input the second operand
let afterOperator = false;

//variable that helps us check if the equal button was pressed(necessary as pressing an operator triggers the displayResult function)
let eqButtonPressed = false;

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
                display.innerHTML = val;
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
    if (desiredOperatorElement !== undefined) {
        desiredOperatorElement = document.querySelector("#" + desiredOperator);
        desiredOperatorElement.style.backgroundColor = BUTTON_INACTIVE_COLOR;
        desiredOperatorElement = undefined;
    }

    firstOperand = "";
    secondOperand = "";
    desiredOperator = "";
    desiredOperatorPrevious = undefined;
    display.innerHTML = "0";
    isEmpty = true;
    dotExistOpOne = false;
    dotExistOpTwo = false;
    ac.innerHTML = "AC";
}

function displayResult(val) {
    firstOperand = val; //let the first operand be the result so the user can keep inputting more operations

    display.innerHTML = val;

    firstResultDisplay = true;
    console.log("result!");
}

//numbers button
numbers = document.querySelectorAll(".number");

numbers.forEach(e => {
    e.addEventListener("click", (i) => {
        eqButtonPressed = false;
        //e.classList.add("button-click")
        if (desiredOperator === "") {
            if ((firstOperand === "") && (e.innerHTML === "0")) {} //do nothing. this would just be an insignificant number and its the shortest way to fix this input
            else {
                isEmpty = false;
                firstOperand += e.innerHTML;
                console.log("first operand: " + firstOperand);
                displayNew(firstOperand);
            }
        } else {
            if (firstResultDisplay) {
                firstResultDisplay = false;
                secondOperand = "";
                dotExistOpTwo = false;
                //horrible fix
                display.innerHTML = "";
            }
            secondOperand += e.innerHTML;
            console.log("second operand: " + secondOperand);
            displayNew(secondOperand);
        }


    });
});

//operators button
let operators = document.querySelectorAll(".operator");
operators.forEach(e => {
    e.addEventListener("click", () => {
        console.log(isEmpty);
        if (!isEmpty) {
            desiredOperator = e.id;

            //If last operator exists, lets get it back to its original color
            if (desiredOperatorPrevious !== undefined) {
                let desOpElement = document.querySelector("#" + desiredOperatorPrevious);
                desOpElement.style.backgroundColor = BUTTON_INACTIVE_COLOR;
            }

            //If there is still a second operand and previously the equal button was not pressed, calculate the input
            if ((secondOperand !== "") && (eqButtonPressed === false)) {
                operate(firstOperand, secondOperand, desiredOperatorPrevious);
            }

            secondOperand = "";
            dotExistOpTwo = false;

            desiredOperatorElement = document.querySelector("#" + e.id);
            desiredOperatorElement.style.backgroundColor = BUTTON_ACTIVE_COLOR; //placeholder color (no palette atm)

            desiredOperatorPrevious = desiredOperator;

            afterOperator = true; //variable set true in order to clear the display when inputting the second operand
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
    eqButtonPressed = true;
});

//percentage button
let percentageButton = document.querySelector("#percentage").addEventListener("click", (e) => {
    if (firstOperand !== 0 && desiredOperator == "") {
        operate(firstOperand, 100, "divide");
    }
});

//dot/decimal button
let dotButton = document.querySelector("#dot").addEventListener("click", (e) => {
    if ((desiredOperator !== "") && (dotExistOpTwo === false)) { //If the desired operator does exist, this means that the second operand is being inputted
        if (firstResultDisplay) { //Check if a result was already displayed so we know the dot is the first character that will be inputted
            secondOperand = ".";
            firstResultDisplay = false;
        } else {
            secondOperand += ".";
        }
        dotExistOpTwo = true;
        console.log("dot2");

        displayNew(secondOperand);
    } else if (dotExistOpOne === false) {
        firstOperand += ".";
        dotExistOpOne = true;
        console.log("dot1");

        displayNew(firstOperand);
    }
    //displayNew(".");
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
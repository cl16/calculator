
// Math functions:
function add (a, b) {
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    return a / b;
}

// Back-end consts and variables:
const displayMaxChars = 13;
var operator = undefined;
var overwrite = true;


var operand1 = {
    name: "operand1",
    value: undefined,
    set: function (val) {
        this.value = val;
    },
    get: function () {
        return this.value;
    },
    reset: function () {
        this.value = undefined;
    },
}

var operand2 = {
    name: "operand2:",
    value: undefined,
    set: function (val) {
        this.value = val;
    },
    get: function () {
        return this.value;
    },
    reset: function () {
        this.value = undefined;
    },
}

const operatorMap = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide,
    "=": equals,
}

// Back-end functions:
function operate(func, a, b) {
    return func(a, b);
}

function updateDisplay(val) {
    let valAsString = val.toString();
    display.textContent = valAsString;
}

function setOperator(symbol) {
    // we are done with setting the first operand:
    operator = operatorMap[symbol];
}

function stringToNum(s) {
    if (s.indexOf(".") == -1) {
        return parseInt(s);
    }
    else {
        return parseFloat(s);
    }
}

function numToString(n) {
    // ensure decimal numbers are rounded, and can add test for max digits (string length) display handles
    
    // if float
    if (n % 1 != 0) {
        nAsString = n.toString();
        if (nAsString.length < displayMaxChars) {
            return nAsString;
        }
        else {
            // get # of quotient chars before decimal
            let quotientChars = Math.floor(n / 1).toString().length;
            let decimalPlaces = displayMaxChars - quotientChars - 1;    // -1 for the actual "." place
            let rounded = n.toFixed(decimalPlaces)
            if (rounded % 1 == 0) {
                roundedString = (rounded / 1).toString();
            }
            else {
                roundedString = rounded.toString();
            }
            return roundedString;
        }
    }
    else {
        return n.toString();
    }
}

function functionClick (funcSymbol) {
    
    if (operator != undefined) {
        
        // if overwrite == true, an operand2 hasn't been input yet, so operator just changes...
        if (overwrite == true) {
            if (funcSymbol != "=") {
                // set operator as funcSymbol input on this function call
                setOperator(funcSymbol);
                return undefined;
            }
            else {
                setOperator(undefined);
                return undefined;
            }
        }
        
        // pull operand2 from display
        operand2.set(stringToNum(display.textContent));        // just turn parseInt into custom func handling int/float for float support

        // divide by zero error, reset on operand2 input after "/" selected...
        if (operator == divide && operand2.get() == 0) {
            operand2.set(undefined);
            display.textContent = "/0 Error"
            overwrite = true;
            return undefined; // break
        }
        
        // perform operate function
        let result = operate(operator, operand1.get(), operand2.get());

        // set operand1 as result (operand1 = result)
        operand1.set(result);

        // set overwrite to true
        overwrite = true;
        
        // updat display on result
        updateDisplay(result);
        overwrite = true; // overwrite again for next numbers

        // set operand2 as undefined
        operand2.set(undefined);

        if (funcSymbol != "=") {
            // set operator as funcSymbol input on this function call
            setOperator(funcSymbol);
        }
        else {
            setOperator(undefined);
        }
    }
    else if (funcSymbol != "=") {
        // pull operand 1 from display
        operand1.set(stringToNum(display.textContent));
        
        // set operator to input symbol
        setOperator(funcSymbol);

        // set display to overwrite
        overwrite = true;
    }
    else {
        // pass: do nothing on an = symbol with undefined operator
    }
}

// DOM variables and functions:
const display = document.querySelector("#display");

function updateDisplay(val) {
    let valAsString = numToString(val);

    // overwrite if overwrite global var set to true or display leads with 0:
    if (overwrite == false && display.textContent != "0") {
        
        if (valAsString == "." && display.textContent.indexOf(".") != -1) {
            // do not take action on the "." button click
        }

        else if ((display.textContent.length + valAsString.length + 1) < 13) {   // +1 for next char added below
            display.textContent = display.textContent + valAsString;
        }
        else {
            display.textContent = "# Limit -> AC";
        }
        
    }
    else {
        if (valAsString == ".") {

        }
        
        if (valAsString.length <= 13) {
            display.textContent = valAsString;
            overwrite = false;
        }
        else {
            display.textContent = "# Limit -> AC";
        }
    }
}

// Event Listeners:
const numberButtons = document.querySelectorAll(".number-button");
numberButtons.forEach((btn) => {
    btn.addEventListener('click', function(e) {
        let btnValue = e.target.dataset.value;
        
        // update display using func that considers overwrite
        updateDisplay(btnValue);
    })
})

const functionButtons = document.querySelectorAll(".function-button");
functionButtons.forEach((btn) => {
    btn.addEventListener('click', function(e) {
        let btnValue = e.target.dataset.value;
        functionClick(btnValue);
    })
})

function clearAll() {
    operand1.reset();
    operand2.reset();
    setOperator(undefined);
    updateDisplay(0);
}
const clearButton = document.querySelector("#ac");
clearButton.addEventListener('click', clearAll);

// Retrieve argument passed in the command line
let userInput = process.argv[2];

// if find in a expression a sin or cos, replace it with Math.sin and Math.cos
userInput = userInput.replace(/sin/g, "Math.sin");
userInput = userInput.replace(/cos/g, "Math.cos");

// split the expression in two parts (before and after ')
let expressionParts = userInput.split('=');
let calcExpression = expressionParts[0];
let resultExpression = expressionParts[1];

let value = (function() {
    let val

    // catch a syntax error from wrong expression and return undefined instead an error
    try {
        val = Function("return " + calcExpression)();
    } catch (e) {
        val = undefined
    }
    return val
})();

if (value === undefined) {
    console.log('Expression is not valid');
} else {
    if(value == resultExpression) {
        console.log('Expression is valid and result is right');
    } else {
        console.log('Expression is valid and result is wrong');
    }
}





   
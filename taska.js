// Retrieve argument passed in the command line
let userInput = process.argv[2];

// if find in a expression a sin or cos, replace it with Math.sin and Math.cos
userInput = userInput.replace(/sin/g, "Math.sin");
userInput = userInput.replace(/cos/g, "Math.cos");

// Evaluate the string as a JavaScript expression and return the result (With IIFE)
let value = (function() {
    let val

    // catch a syntax error from wrong expression and return undefined instead an error
    try {
        val = Function("return " + userInput)();
    } catch (e) {
        val = undefined
    }
    return val
})();

// if value is undefined, then the expression is not valid
result = (value === undefined) ? "FALSE" : "TRUE";

console.log('Expression is valid: ',result)
function eval() {
    // Do not use eval!!!
    return;
}


function expressionCalculator(expr) {
    expr = expr.replace(/\s/g, '').replace(/(\*|\/|\+|\-)/g, ' $& ');
    //   expr.replace(/\s/g, '') - remove all found white spaces in expression
    //   .replace(/(\*|\/|\+|\-)/g, ' $& ') - add white spaces around math signs
    let openBrackets = 0,
        closeBrackets = 0;

    for (let i = 0; i < expr.length; i++) {
        if (expr[i] === '(') {
            openBrackets += 1;
        }
        if (expr[i] == ')') {
            closeBrackets += 1;
        }
    }
    if (openBrackets !== closeBrackets) {
        throw new Error("ExpressionError: Brackets must be paired.");
    }

    let expressionWithBrackets;

    while (openBrackets > 0) {
        if ((expressionWithBrackets = expr.match(/(\([0-9\+\/\*\-. ]+\))/g)) !== null) { 

            for (let i = 0; i < expressionWithBrackets.length; i++) {
                let exprInBrackets = expressionWithBrackets[i].replace('(', '').replace(')', '');
                expr = expr.replace(expressionWithBrackets[i], calc(exprInBrackets));
            }
        }
        openBrackets -= 1;
    }
    return calc(expr);
}

function calc(expr) {
    let arr = expr.split(' ');

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "*") {
            arr[i] = arr[i - 1] * arr[i + 1];
            arr.splice(i - 1, 1);
            arr.splice(i, 1);
            i--;
        }
        if (arr[i] === "/") {
            if (arr[i + 1] === '0'){
                throw new TypeError('TypeError: Division by zero.');
            } 
            arr[i] = arr[i - 1] / arr[i + 1];
            arr.splice(i - 1, 1);
            arr.splice(i, 1);
            i--;
        }
    }
    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "+") {
            arr[i] = Number(arr[i - 1]) + Number(arr[i + 1]);
            arr.splice(i - 1, 1);
            arr.splice(i, 1);
            i--;
        }
        if (arr[i] === "-") {
            arr[i] = arr[i - 1] - arr[i + 1];
            arr.splice(i - 1, 1);
            arr.splice(i, 1);
            i--;
        }
    }
    return Number(arr);
}

module.exports = {
    expressionCalculator
}
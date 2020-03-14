function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let bracketCount = 0;
    
    // brackets counter
    for(let i = 0; i < expr.length; i++){
        if(expr[i] == '('){
            bracketCount++;
        }
        else if(expr[i] == ')'){
            bracketCount--;
        }
    }
    if(bracketCount !== 0) throw new Error ('ExpressionError: Brackets must be paired');


    
    for(let j = 0; j < expr.length; j++){
        // simple addition
        if(expr[j] == '+'){
	        let numbersString = expr.split('+');
	        let numbers = numbersString.map(a => Number(a));
	        let reducer = (accumulator, currentValue) => accumulator + currentValue;
            let result = numbers.reduce(reducer);
	        return result;
        } 
        // simple subtraction
        else if(expr[j] == '-'){
            let numbersString = expr.split('-');
	        let numbers = numbersString.map(a => Number(a));
	        let reducer = (accumulator, currentValue) => accumulator - currentValue;
            let result = numbers.reduce(reducer);
	        return result;
        }
        // simple division
        else if(expr[j] == '/'){
            let numbersString = expr.split('/');
	        let numbers = numbersString.map(a => Number(a));
	        let reducer = (accumulator, currentValue) => accumulator / currentValue;
            let result = numbers.reduce(reducer);
            // division by zero
            if(result === Infinity){
                throw new Error("TypeError: Division by zero.");
              }
	        return result;
        }
        // simple multiplication
        else if(expr[j] == '*'){
            let numbersString = expr.split('*');
	        let numbers = numbersString.map(a => Number(a));
	        let reducer = (accumulator, currentValue) => accumulator * currentValue;
            let result = numbers.reduce(reducer);
	        return result;
        }
    }
}

module.exports = {
    expressionCalculator
}
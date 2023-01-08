function calculate(expression){
    let convertedPosfixExpression = getPosfixEquivalence(expression);
    let st = [];
    for (let element of convertedPosfixExpression){
        if (!isOperator(element)){
            st.push(element);
        }
        else{
            let n1 = Number(st.pop());
            let n2 = Number(st.pop());
            switch (element){
                case '+':
                    st.push('' + (n1 + n2));
                    break;
                case '-':
                    st.push('' + (n2 - n1));
                    break;
                case '*':
                    st.push('' + (n2 * n1));
                    break;
                case '/':
                    st.push('' + (n2/n1));
                    break;
            }
        }
    }

    return st.pop();
    

}

function getPosfixEquivalence(expression){
    let expressionArr = expression.split(' ');
    let posfixArr = [];
    let opStack = [];
    for (let element of expressionArr){
        if (!isOperator(element)){
            posfixArr.push(element);
        }
        else{
            updatePosfixArr(opStack,posfixArr,element);
        }
    }
    while (opStack.length > 0){
        posfixArr.push(opStack.pop());
    }
    return posfixArr;
}

function updatePosfixArr(opStack,posfixArr,operator){
    if (opStack.length === 0){
        opStack.push(operator);
        return;
    }
    let peakOp = opStack[opStack.length-1];
    if (isHigherPrecedence(peakOp,operator)){
        posfixArr.push(opStack.pop());
    }
    opStack.push(operator);

}

function isHigherPrecedence(op1, op2){
    if (op1 === '+' || op1 === '-'){
        return (op2 === '+' || op2 === '-') ? true : false;
    }
    
    return true;
}

function isOperator(element){
    return ("+-*/").includes(element);
}

let expression = '1 * 2 + 3 / 6';
console.log(calculate(expression));








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
    let posfixArr = [];
    let opStack = [];
    for (let element of expression){
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

let expression = ['1','*','2','+','3','/','6'];
console.log(calculate(expression));

// testing out some regex patterns. 
const numWithDotPattern = /^([0-9]+)(\.{1})([0-9]+)$/gm;
const numWithoutDotPattern =/^([0-9]+)([^\.]{0})([0-9]*)$/gm;
let match = numWithDotPattern.test('.0..0.2');
console.log(match);
const operatorPattern = '+/x-';

const btnContainer = document.querySelector('.button-container');
const displayResScreen = document.querySelector('.screen');

let userInput = [];

btnContainer.addEventListener('click', (e)=>{
    if (e.target.classList.contains('num')){
        handleNumText(e.target.textContent);
        console.log(userInput);
        displayResScreen.textContent = userInput.join(' ');
    }
    else if (e.target.classList.contains('op')){
        handleOpText(e.target.textContent);
        displayResScreen.textContent = userInput.join(' ');
    }
    else if (e.target.classList.contains('dot')){
        handleDotText(e.target.textContent);
        displayResScreen.textContent = userInput.join(' ');
    }
    else if (e.target.classList.contains('eq')){
        handleCalOp();
    }
});

function handleNumText(text){
    if (userInput.length === 0){
        userInput.push(text);
        return;
    }
    let lastElem = userInput[userInput.length-1];
    if (!operatorPattern.includes(lastElem)){
        lastElem+=text;
        userInput.pop();
        userInput.push(lastElem);
    }
    else{
        userInput.push(text);
    }
}

function handleOpText(text){
    userInput.push(text);
}

function handleDotText(text){
    if (userInput.length === 0){
        userInput.push(text);
        return;
    }
    let lastSeenElem = userInput[userInput.length-1];
    if (operatorPattern.includes(lastSeenElem)){
        userInput.push(text);
        return;
    }
    if (!lastSeenElem.includes('.')){
        lastSeenElem+=text;
        userInput.pop();
        userInput.push(lastSeenElem);
    }
}

function handleCalOp(){
    if (!isValidExp(userInput)){
        displayResScreen.textContent = 'Invalid';
        userInput.length = 0;
    }
    else{
        displayResScreen.textContent = ''+calculate(userInput);
        console.log(userInput);
    }
}

function isValidExp(userInput){
    if (userInput.length === 0){
        return false;
    }

    if (isOperator(userInput[0]) || isOperator(userInput[userInput.length-1])){
        return false;
    }

    let opCounter = 0;
    let numCounter = 0;
    for (const element of userInput){
        if (isOperator(element)){
            opCounter++;
        }
        else if (element === '.'){
            return false;
        }
        else{
            numCounter++;
        }
    }

    return (numCounter - opCounter) === 1;
    
}


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
                case 'x':
                    st.push('' + (n2 * n1));
                    break;
                case '/':
                    st.push('' + (n2/n1));
                    break;
            }
        }
    }

    userInput.length = 0;
    userInput[0] = st.pop();
    return userInput[0];
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
    return operatorPattern.includes(element);
}
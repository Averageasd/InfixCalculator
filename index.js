const operatorPattern = '+/x-';

const btnContainer = document.querySelector('.button-container');
const displayResScreen = document.querySelector('.screen');

let userInput = [];

// handle button clicks
btnContainer.addEventListener('click', (e)=>{

    // handle buttons with digits (0-9)
    if (e.target.classList.contains('num')){
        handleNumText(e.target.textContent);
        console.log(userInput);
        displayResScreen.textContent = userInput.join(' ');
    }

    // handle operator buttons (+ / x -)
    else if (e.target.classList.contains('op')){
        handleOpText(e.target.textContent);
        displayResScreen.textContent = userInput.join(' ');
    }

    // handle dot button (.)
    else if (e.target.classList.contains('dot')){
        handleDotText(e.target.textContent);
        displayResScreen.textContent = userInput.join(' ');
    }

    // calculate exression when equal sign is clicked
    else if (e.target.classList.contains('eq')){
        handleCalOp();
    }

    // clear everything when clear button is clicked
    else if (e.target.classList.contains('clear')){
        handleClear();
    }

    // remove 1 character from the expression from the end.
    else if (e.target.classList.contains('back')){
        handleRemoveFromEnd();
        displayResScreen.textContent = userInput.join(' ');
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

function handleRemoveFromEnd(){
    if (userInput.length === 0){
        return;
    }
    let lastSeen = userInput[userInput.length-1];
    if (lastSeen.length === 1){
        userInput.pop();
        return;
    }
    lastSeen = lastSeen.substr(0,lastSeen.length-1);
    userInput.pop();
    userInput.push(lastSeen);
}

function handleClear(){
    userInput.length = 0;
    displayResScreen.textContent = '';
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
        calculate(userInput);
        displayResScreen.textContent = userInput[0];
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
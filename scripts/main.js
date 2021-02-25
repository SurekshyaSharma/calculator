$( document ).ready(function() {
   
    const calculator = {
        //To construct a valid arithmetic expression, we need to keep track of a few things: the first operand (5), the operator (+) and the second operand (5).
        //calculator object keeps track of the operand and operators
        displayValue: '0',
        firstOperand: null,
        waitingForSecondOperand: false,
        operator: null,
      };

      function inputDigit(digit) {
        const { displayValue, waitingForSecondOperand } = calculator;
      
        if (waitingForSecondOperand === true) {
          //If the waitingForSecondOperand property is set to true, the displayValue property is overwritten with the digit that was clicked
          calculator.displayValue = digit;
          calculator.waitingForSecondOperand = false;
        } else {
          calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
        }
      
        console.log(calculator);
      }
      
      // input decimal with the digit------------------------------------------------------------------------------------------------------
      function inputDecimal(dot) {

        if (calculator.waitingForSecondOperand === true) {
      
          calculator.displayValue = '0.'
      
          calculator.waitingForSecondOperand = false;
      
          return
      
        }
      
      
        if (!calculator.displayValue.includes(dot)) {
          calculator.displayValue += dot;
        }
      }
      

       //operator handling--------------------------------------------------------------------------------------------------------------------
       
       function handleOperator(nextOperator) {
        const { firstOperand, displayValue, operator } = calculator
        const inputValue = parseFloat(displayValue);
      
        if (firstOperand == null && !isNaN(inputValue)) {
          calculator.firstOperand = inputValue;
      
        } else if (operator) {
      
          const result = calculate(firstOperand, inputValue, operator);

          calculator.displayValue = String(result);
          calculator.firstOperand = result;
      
        }
      
        calculator.waitingForSecondOperand = true;
        calculator.operator = nextOperator;
        console.log(calculator);
      }
      
    //calculation-----------------------------------------------------------------------------------------------
      function calculate(firstOperand, secondOperand, operator) {
        if (operator === '+') {
          return firstOperand + secondOperand;
        } else if (operator === '-') {
          return firstOperand - secondOperand;
        } else if (operator === '*') {
          return firstOperand * secondOperand;
        } else if (operator === '/') {
          return firstOperand / secondOperand;
        }
      
        return secondOperand;
      }
      //updating dispaly-----------------------------------------------------------------------------------------------
      function updateDisplay() {
        // select the element with class of `calculator-screen`
        const display = document.querySelector('.calculator-screen');
        // update the value of the element with the contents of `displayValue`
        display.value = calculator.displayValue;
      }
      
      updateDisplay();
      
      //  Handle key presses-----------------------------------------------------------------------------------------------------------------
 
      const keys = document.querySelector('.calculator-keys');
          keys.addEventListener('click', (event) => { //This example uses the addEventListener() method to attach a click event to a button
            const { target } = event;
            //const target = event.target;
            if (!target.matches('button')) { // Check if the clicked element is a button.If not, exit from the function
              return;
            }

            if (target.classList.contains('operator')) { // Check if the clicked element is a operator
              console.log('operator', target.value);
              handleOperator(target.value);
              updateDisplay();
              return;
            }
            //connecting dot to the number
            if (target.classList.contains('decimal')) { 
              console.log('decimal', target.value);
              inputDecimal(target.value);
              updateDisplay();
              return;
            }

            if (target.classList.contains('all-clear')) {
              console.log('clear', target.value);
              return;
            }
           
            // console.log('digit', target.value); //event listener callback function
            inputDigit(target.value);
            updateDisplay();
          
          
          });
});
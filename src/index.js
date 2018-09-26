class SmartCalculator {
  constructor(initialValue) {
    this.expressionStore = [];
    this.expressionStore.push(initialValue);
  }

  add(number) {
    this.expressionStore.push('+');
    this.expressionStore.push(number);
    return this;
  }
  
  subtract(number) {
    this.expressionStore.push('-');
    this.expressionStore.push(number);
    return this;
  }

  multiply(number) {
    this.expressionStore.push('*');
    this.expressionStore.push(number);
    return this;
  }

  devide(number) {
    this.expressionStore.push('/');
    this.expressionStore.push(number);
    return this;
  }

  pow(number) {
    this.expressionStore.push('^');
    this.expressionStore.push(number);
    return this;
  }

  getResultExression(expression) {
    const operations =  [
                          {'^': (a, b) => Math.pow(a, b)},
                          {'*': (a, b) => a * b, '/': (a, b) => a / b},
                          {'+': (a, b) => a + b, '-': (a, b) => a - b}    // Array contain all posible operations
                        ];
    let tmpExpression = [],                                               // For tmp expression
        curOperation;                                                     // Variable wich contain current operation

    // This part for  pow() action
    for (let j = expression.length - 1; j >= 0 ; j--) {
      if (operations[0][expression[j]]) {
          curOperation = operations[0][expression[j]];
      } else if (curOperation) {
          tmpExpression[tmpExpression.length - 1] = curOperation (expression[j],tmpExpression[tmpExpression.length - 1]);
          curOperation = null;
      } else {
          tmpExpression.push(expression[j]);
      }
    }
    expression = tmpExpression.reverse();
    tmpExpression = [];

    // This part for all others operations
    for (let i = 1, len = operations.length; i < len; i++) {
        for (let j = 0, lenExpr = expression.length; j < lenExpr; j++) {
            if (operations[i][expression[j]]) {                           // Check if current element expression is operator
                curOperation = operations[i][expression[j]];              // Set current operator if true
            } else if (curOperation) {                                    // If false and current operation exists -> calculate
                tmpExpression[tmpExpression.length - 1] = curOperation(tmpExpression[tmpExpression.length - 1], expression[j]);
                curOperation = null;
            } else {
                tmpExpression.push(expression[j]);                        // Else just push element to tmpArray
            }
        }
        expression = tmpExpression;
        tmpExpression = [];
    }

    return expression[0];
  }

  // Override method toString
  toString() {
    return this.getResultExression(this.expressionStore);
  }
}

module.exports = SmartCalculator;

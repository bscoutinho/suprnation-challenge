import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface IData {
  expression: string;
  result: string;
  answer: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  isValid: boolean = false;
  expression: string = '';
  expressionParts: string[] = [];
  evaluateResult: string;
  tableData: IData[] = [];
  randomNumber: number
  msgAlert: boolean = false;

  constructor(private http: HttpClient) { }

  // validate expression
  validateExpression(ev) {
    this.expression = ev

    this.expression = this.expression.replace(/(?<!\.)sin/g, "Math.sin");
    this.expression = this.expression.replace(/(?<!\.)cos/g, "Math.cos");

    let calcExpression: string

    // if a string contains a '=' sign, split the string into two parts
    if (this.expression.indexOf('=') !== -1) {
      this.expressionParts = this.expression.split('=');
      calcExpression = this.expressionParts[0];
    } else {
      calcExpression = this.expression;
    }

    // function that evaluate expression
    this.evaluateResult = (function() {
      let val;
      // catch a syntax error from wrong expression and return undefined instead an error
      try {
          val = Function("return " + calcExpression)();
      } catch (e) {
          val = undefined
      }

      //check if number has decimals and if has round to 10 decimals
      if (val !== undefined && val % 1 !== 0) {
        val = val.toFixed(10);
      }

      return val
    })();

    // check if expresion is valid~
    this.isValid = (this.evaluateResult === undefined) ? false : true;
  }

  submitExpression() {;

    // check if expression contains a result
    if (!this.expressionParts[1]) {
      this.msgAlert = true;
      return;
    }

    let resultExpression = this.expressionParts[1];
    let checkResult: string;
  
    if (this.evaluateResult !== undefined) {
      checkResult = (this.evaluateResult == resultExpression.trim()) ? 'Correct' : 'Wrong';
    } else {
      alert('Wrong expression!');
    }
    
    // create a data object
    let row: IData = { 
      expression: this.expression,
      result: checkResult,
      answer: this.evaluateResult
    }

    this.tableData.push(row)
    // keep only 5 elements in array
    if (this.tableData.length > 5) {
      this.tableData.shift(); 
    }

    this.msgAlert = false;
  }

  // task: generate random number from API
  generateRandomNumber() {
    this.http.get<any>('https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new').subscribe({
    next: data => {
        this.randomNumber = data;
    },
    error: error => {
        console.error('There was an error!', error);
    }
   });
  }

  addString(str: string) {
    this.expression = this.expression + str;
    this.validateExpression(this.expression)
  }

  clearString() {
    this.expression = '';
  }
}



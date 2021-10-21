//get the values from the user
function getValues(){

    //get the user values
    let loanAmount = parseFloat(document.getElementById("loanAmount").value);
    let payments = parseFloat(document.getElementById("payments").value);
    let rate = parseFloat(document.getElementById("rate").value);
    
    //if user doesn't enter float values/integers alert them
    if (!Number.isNaN(loanAmount) && !Number.isNaN(payments) && !Number.isNaN(rate)) {
        
        //calculate values
        returnObj = calculateValues(loanAmount, payments, rate);

        //display the calculated values
        displayData(loanAmount,returnObj);
    }else {
        alert("You must enter integer or decimal values.");
    }
   
}

//calculate the necessary values
//an array of objects will be returned. 
//Each object represents a row in the table and the each of the object's properties represents the column value of the row
function calculateValues(loanAmount, payments, rate){
    let returnObjArray = [];
    let remainingBalance = loanAmount;
    let totalInterestPayment = 0;
    

    for (let index = 0; index < payments; index++) {
        let obj = {};

        //month
        obj.month = index+1;

        //add the total monthly payment property to the object
        obj.totalMonthlyPayment = (loanAmount)*(rate/1200)/(1-Math.pow((1+rate/1200),(-payments)));

        //add the interest payment property to the object
        obj.interestPayment = remainingBalance * rate / 1200;

        //add the principal payment property to the object
        obj.principalPayment = obj.totalMonthlyPayment - obj.interestPayment;

        remainingBalance -= obj.principalPayment;                                                                                                                                                                                                           

        //add the remaining balance property to the object
        obj.remainingBalance = remainingBalance;

        totalInterestPayment += obj.interestPayment;

        //add the total interest payment property to the object
        obj.totalInterestPayment = totalInterestPayment;

        returnObjArray[index] = obj;
    }    

    return returnObjArray;
}

//Display all the calculated values to the user
function displayData(loanAmount, returnObjArray){
    //regex used to add commas to to large numbers
    let regexAddCommas = /\B(?=(\d{3})+(?!\d))/g;

    //get the table body, where the resulting table will be displayed
    let tableBody = document.getElementById("tableBody");

    //get the table row template with 6 tds (table datas) to be used to build the table
    let templateRow = document.getElementById("tableRowTemplate");
    tableBody.innerHTML = "";

    //for each of the object in the array of objects
    for (let index = 0; index < returnObjArray.length; index++) {

        let tableRow = document.importNode(templateRow.content, true);
        
        //get all the table data
        let rowCols = tableRow.querySelectorAll("td");

        //add each of the calculated values to its corresponding table data column
        rowCols[0].textContent = (returnObjArray[index].month);
        rowCols[1].textContent = "$"+(returnObjArray[index].totalMonthlyPayment).toFixed(2).toString().replace(regexAddCommas, ',');
        rowCols[2].textContent = "$"+(returnObjArray[index].principalPayment).toFixed(2).toString().replace(regexAddCommas, ',');
        rowCols[3].textContent = "$"+(returnObjArray[index].interestPayment).toFixed(2).toString().replace(regexAddCommas, ',');
        rowCols[4].textContent = (returnObjArray[index].totalInterestPayment);
        rowCols[5].textContent = "$"+(returnObjArray[index].remainingBalance).toFixed(2).toString().replace(regexAddCommas, ',');

        //if its the last row calculate the values that require aggregation and display them to the screen
        if (index == returnObjArray.length -1){
            let tempTotalInterest = Number(rowCols[4].textContent);
            let totalCost = "$"+(tempTotalInterest + loanAmount).toFixed(2).toString().replace(regexAddCommas, ',');
            rowCols[4].textContent = "$"+(Number(tempTotalInterest).toFixed(2).toString().replace(regexAddCommas, ','));
            loanAmount = "$"+(Number(loanAmount).toFixed(2).toString().replace(regexAddCommas, ','));
            
            document.getElementById("monthlyPayment").innerText =  `${rowCols[1].textContent}`;
            document.getElementById("totalPrincipal").innerText =  `${loanAmount}`;            
            document.getElementById("totalInterest").innerText =  `${rowCols[4].textContent}`;
            document.getElementById("totalCost").innerText =  `${totalCost}`;
        }else {
            rowCols[4].textContent = "$"+(Number(rowCols[4].textContent).toFixed(2).toString().replace(regexAddCommas, ','));
        }

        //display the table
        tableBody.appendChild(tableRow);
    }


}
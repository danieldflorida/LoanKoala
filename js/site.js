//get the values
function getValues(){
    let loanAmount = parseInt(document.getElementById("loanAmount").value);
    let payments = parseInt(document.getElementById("payments").value);
    let rate = parseInt(document.getElementById("rate").value);

    //make sure you disable the previously calculated data
    
    if (Number.isInteger(loanAmount) && Number.isInteger(payments) && Number.isInteger(rate)) {
        //call calculateValues
        returnObj = calculateValues(loanAmount, payments, rate);
        //call displayData
        displayData(loanAmount,returnObj, payments);
    }else {
        alert("You must enter integers");
    }
   
}

function calculateValues(loanAmount, payments, rate){
    let returnObjArray = [];
    let remainingBalance = loanAmount;
    let totalInterestPayment = 0;
    

    for (let index = 0; index < payments; index++) {
        let obj = {};

        //month
        obj.month = index+1;

        //total monthly payment
        obj.totalMonthlyPayment = Number((loanAmount)*(rate/1200)/(1-Math.pow((1+rate/1200),(-payments))));

        //interest payment
        obj.interestPayment = Number(remainingBalance * rate / 1200);

        //principal payment
        obj.principalPayment = Number(obj.totalMonthlyPayment - obj.interestPayment);

        remainingBalance -= Number(obj.principalPayment);                                                                                                                                                                                                           
        //remaining balance
        obj.remainingBalance = Number(remainingBalance);

        totalInterestPayment += Number(obj.interestPayment);
        //total interest payment
        obj.totalInterestPayment = Number(totalInterestPayment);

        returnObjArray[index] = obj;
    }    

    return returnObjArray;
}

function displayData(loanAmount, returnObjArray, payments){
    let tableBody = document.getElementById("tableBody");
    let templateRow = document.getElementById("tableRowTemplate");
    tableBody.innerHTML = "";

    for (let index = 0; index < returnObjArray.length; index++) {
        let tableRow = document.importNode(templateRow.content, true);
        let rowCols = tableRow.querySelectorAll("td");

        rowCols[0].textContent = (returnObjArray[index].month);
        rowCols[1].textContent = (returnObjArray[index].totalMonthlyPayment).toFixed(2);
        rowCols[2].textContent = (returnObjArray[index].principalPayment).toFixed(2);
        rowCols[3].textContent = (returnObjArray[index].interestPayment).toFixed(2);
        rowCols[4].textContent = (returnObjArray[index].totalInterestPayment).toFixed(2);
        rowCols[5].textContent = (returnObjArray[index].remainingBalance).toFixed(2);

        if (index == returnObjArray.length -1){
            document.getElementById("monthlyPayment").innerText =  `$${rowCols[1].textContent}`;
            document.getElementById("totalPrincipal").innerText =  `$${loanAmount}`;
            document.getElementById("totalInterest").innerText =  `$${rowCols[4].textContent}`;
            let totalCost = Number(rowCols[4].textContent) + loanAmount;
            document.getElementById("totalCost").innerText =  `$${totalCost}`;
        }

        tableBody.appendChild(tableRow);
    }


}
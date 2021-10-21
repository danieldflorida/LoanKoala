//get the values
function getValues(){
    //let loanAmount = parseInt(document.getElementById("loanAmount").value);
    //let payments = parseInt(document.getElementById("payments").value);
    //let rate = parseInt(document.getElementById("rate").value);

    let loanAmount = parseFloat(document.getElementById("loanAmount").value);
    let payments = parseFloat(document.getElementById("payments").value);
    let rate = parseFloat(document.getElementById("rate").value);

    //make sure you disable the previously calculated data
    
    //if (Number.isInteger(loanAmount) && Number.isInteger(payments) && Number.isInteger(rate)) {
    if (!Number.isNaN(loanAmount) && !Number.isNaN(payments) && !Number.isNaN(rate)) {
        //call calculateValues
        returnObj = calculateValues(loanAmount, payments, rate);
        //call displayData
        displayData(loanAmount,returnObj, payments);
    }else {
        alert("You must enter integer or decimal values.");
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
        //obj.totalMonthlyPayment = Number((loanAmount)*(rate/1200)/(1-Math.pow((1+rate/1200),(-payments))));
        obj.totalMonthlyPayment = ((loanAmount)*(rate/1200)/(1-Math.pow((1+rate/1200),(-payments))));


        //interest payment
        //obj.interestPayment = Number(remainingBalance * rate / 1200);
        obj.interestPayment = (remainingBalance * rate / 1200);


        //principal payment
        //obj.principalPayment = Number(obj.totalMonthlyPayment - obj.interestPayment);
        obj.principalPayment = (obj.totalMonthlyPayment - obj.interestPayment);


        //remainingBalance -= Number(obj.principalPayment);
        remainingBalance -= (obj.principalPayment);                                                                                                                                                                                                           

        //remaining balance
        //obj.remainingBalance = Number(remainingBalance);
        obj.remainingBalance = (remainingBalance);


        //totalInterestPayment += Number(obj.interestPayment);
        totalInterestPayment += (obj.interestPayment);


        //total interest payment
        //obj.totalInterestPayment = Number(totalInterestPayment);
        obj.totalInterestPayment = (totalInterestPayment);


        returnObjArray[index] = obj;
    }    

    return returnObjArray;
}

function displayData(loanAmount, returnObjArray, payments){
    let regexAddCommas = /\B(?=(\d{3})+(?!\d))/g;
    let tableBody = document.getElementById("tableBody");
    let templateRow = document.getElementById("tableRowTemplate");
    tableBody.innerHTML = "";

    for (let index = 0; index < returnObjArray.length; index++) {
        let tableRow = document.importNode(templateRow.content, true);
        let rowCols = tableRow.querySelectorAll("td");

        rowCols[0].textContent = (returnObjArray[index].month);
        rowCols[1].textContent = "$"+(returnObjArray[index].totalMonthlyPayment).toFixed(2).toString().replace(regexAddCommas, ',');
        rowCols[2].textContent = "$"+(returnObjArray[index].principalPayment).toFixed(2).toString().replace(regexAddCommas, ',');
        rowCols[3].textContent = "$"+(returnObjArray[index].interestPayment).toFixed(2).toString().replace(regexAddCommas, ',');
        //rowCols[4].textContent = (returnObjArray[index].totalInterestPayment).toFixed(2);
        rowCols[4].textContent = (returnObjArray[index].totalInterestPayment);
        rowCols[5].textContent = "$"+(returnObjArray[index].remainingBalance).toFixed(2).toString().replace(regexAddCommas, ',');

        if (index == returnObjArray.length -1){
            let tempTotalInterest = Number(rowCols[4].textContent);
            let totalCost = "$"+(tempTotalInterest + loanAmount).toFixed(2).toString().replace(regexAddCommas, ',');
            //totalCost = totalCost.toFixed(2);

            //change to 2 decimal places when printing to screen
            rowCols[4].textContent = "$"+(Number(tempTotalInterest).toFixed(2).toString().replace(regexAddCommas, ','));
            loanAmount = "$"+(Number(loanAmount).toFixed(2).toString().replace(regexAddCommas, ','));
            document.getElementById("monthlyPayment").innerText =  `${rowCols[1].textContent}`;
            document.getElementById("totalPrincipal").innerText =  `${loanAmount}`;            
            document.getElementById("totalInterest").innerText =  `${rowCols[4].textContent}`;
            document.getElementById("totalCost").innerText =  `${totalCost}`;
        }else {
            //change to 2 decimal places when printing to screen
            rowCols[4].textContent = "$"+(Number(rowCols[4].textContent).toFixed(2).toString().replace(regexAddCommas, ','));
        }



        tableBody.appendChild(tableRow);
    }


}
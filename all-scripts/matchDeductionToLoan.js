import { toNairaCurrency, getFromLocalStorage, changeColor } from './manager.js';


// Retrieve stored data or use defaults
let allMonthlyDeduction = getFromLocalStorage("deduction") || [];
let getOutstanding = getFromLocalStorage("members") || [];

document.getElementById("members-deduction").addEventListener("click", () => {
document.getElementById("match-deduction").addEventListener("click", () =>{
    
 changeColor("match-deduction","green", "white");
 changeColor("confirm-deductions","white", "green");
 changeColor("monthly-savings","white", "green");

 let deductionNewHTML ="";
allMonthlyDeduction.forEach((record) => {
    let lpNumber = record["STAFF ID"];
    let savingDeduction = record.SAVINGS;
    let LoanDeduction = record.LOAN;
console.log("LP",lpNumber)
    // Ensure `findLP` is defined before accessing its properties
    let findLP = getOutstanding.find((data) => String(data.lpNumber) === String(lpNumber));
console.log(findLP)
    if (findLP) {
        
        findLP.totalSavings += savingDeduction; 

        let ValidOutstandingLoan = parseFloat(findLP.normalLoan);
        
        if (findLP.lpNumber === lpNumber && !isNaN(ValidOutstandingLoan) && ValidOutstandingLoan > 0) {
            console.log("should work")
            deductionNewHTML += `
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-8 col-lg-6">
                        <div class="matChDeductionToLoan p-3 shadow-sm" id="${lpNumber}">
                            <div class="matchDeductionLp">
                                <span>LP${lpNumber}</span>
                                <span>${findLP.name}</span>
                            </div>
                            <div class="outstandinLoan">
                                Outstanding Normal Loan: ${toNairaCurrency(ValidOutstandingLoan)}
                            </div>
                            <dialog id="pay-dialog" class="paydialog">
                                <p>Are you sure you want to confirm payment for this member?</p>
                                <div class="payButtons">
                                    <button class="cancelPayment" id="cancel-payment">Cancel</button>
                                    <button class="confirmPayment" id="confirm-payment">Confirm</button>
                                </div>
                            </dialog>
                            <div class="amountToPay">
                                Amount to Pay: ${toNairaCurrency(LoanDeduction)}
                                <button type="button" class="pay btn btn-danger" data-user-lp="${lpNumber}">Pay</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        }
       
    } 
    localStorage.setItem("members", JSON.stringify(getOutstanding));
    let matchNewDeductionEl = document.getElementById("try-it");
    matchNewDeductionEl.innerHTML = "";
    matchNewDeductionEl.innerHTML = deductionNewHTML; 
    
 });

document.querySelectorAll(".pay").forEach((payButton) => {
    console.log("log check 2")
    payButton.addEventListener("click", () => {
        // Temporarily disable the button
        payButton.disabled = true;
        
        // Get dialog elements
        const dialogEl = document.getElementById("pay-dialog");
        const cancelPaymentEl = document.getElementById("cancel-payment");
        const confirmPaymentEl = document.getElementById("confirm-payment");
        // Dispaly dialog box
        dialogEl.showModal();
        // Close dialog box if not approving the payment
        cancelPaymentEl.onclick = () => {
            dialogEl.close();  
            setTimeout(() => (payButton.disabled = false), 50);
        }
        // Procede with payment
        confirmPaymentEl.onclick = () => {
        // Close dialog
        dialogEl.close(); 

        // Extract the userLp from the dataset
        const userLp = payButton.dataset.userLp;

        // Retrieve the localStorage data
        allMonthlyDeduction = getFromLocalStorage("deduction") || [];
        getOutstanding = getFromLocalStorage("members") || [];;

        // Find the matching member and payable amount
        const memberToPay = allMonthlyDeduction.find((match) => match["STAFF ID"] === userLp);
        const payableAmount = getOutstanding.find((value) => value.lpNumber === userLp);

        if (memberToPay && payableAmount) {
            // Update the normal loan balance
            payableAmount.normalLoan = parseFloat(payableAmount.normalLoan) - parseFloat(memberToPay.LOAN);

            // Remove the member from the `allMonthlyDeduction` array
            allMonthlyDeduction = allMonthlyDeduction.filter((match) => match["STAFF ID"] !== userLp);

            // Save updated arrays back to localStorage
            localStorage.setItem("deduction", JSON.stringify(allMonthlyDeduction));
            localStorage.setItem("members", JSON.stringify(getOutstanding));


            // Remove the corresponding HTML element
            const elementToRemove = document.getElementById(userLp);
            if (elementToRemove) {
                elementToRemove.remove();
            } else {
                console.warn(`Element with ID "${userLp}" not found.`);
            }
        } else {
            console.warn(`No matching member or payable amount found for userLp: ${userLp}`);
        }

        // Re-enable the button after 500ms
        setTimeout(() => (payButton.disabled = false), 500);
    }
    });

});

})

})
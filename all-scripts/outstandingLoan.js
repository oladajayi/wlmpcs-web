import { toNairaCurrency, getFromLocalStorage, changeColor } from './manager.js';


// Function to display all outstanding Loans
export const displayAllOutstandingLoan = () => {


document.getElementById("outstanding-loans").addEventListener("click", () => {

changeColor("loan-applications","white", "green");
changeColor("outstanding-loans","green","white");
changeColor("granted-loans","white", "green");
changeColor("loan-repayment","white", "green");



let alloutstandingLoans = document.getElementById("loan-type");
let alloustandinLoanHTML ="";


let getOutstandingLoans = getFromLocalStorage('members');

getOutstandingLoans.forEach((outstandingrecord) => {
    let normalLoanAmount = parseFloat(outstandingrecord.normalLoan);
    let specialLoanAmount = parseFloat(outstandingrecord.specialLoan);
    
    alloustandinLoanHTML += `
        <div class="outstanding-container mt-3 w-90">
            <div class="row justify-content-center">
                <div class="col-12">
                    <div class="outstandings p-3 shadow-sm">
                        <div class="outstanding-profile">
                            <span id="${outstandingrecord.lpNumber}">LP${outstandingrecord.lpNumber}</span>
                            <span>${outstandingrecord.name}</span>
                        </div>
                        <div class="outstanding">Outstanding Normal Loan:  ${toNairaCurrency(normalLoanAmount)}</div>
                        <div class="outstanding">Outstanding Special Loan:  ${toNairaCurrency(specialLoanAmount)}</div>
                    </div>
                </div>
            </div>
        </div>`;
});

alloutstandingLoans.innerHTML = alloustandinLoanHTML;

})
}
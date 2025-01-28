import { toNairaCurrency, getFromLocalStorage, changeColor } from './manager.js';


// Function to display all outstanding Loans
export const displayAllOutstandingLoan = () => {


document.getElementById("outstanding-loans").addEventListener("click", () => {

changeColor("loan-applications","white", "green");
changeColor("outstanding-loans","green","white");
changeColor("granted-loans","white", "green");
changeColor("loan-rpayment","white", "green");



let alloutstandingLoans = document.getElementById("loan-type");
let alloustandinLoanHTML ="";


let getOutstandingLoans = getFromLocalStorage('members');

getOutstandingLoans.forEach((outstandingrecord) => {

let normalLoanAmount = parseFloat(outstandingrecord.normalLoan);
let specialLoanAmount = parseFloat(outstandingrecord.specialLoan);
alloustandinLoanHTML += `<div class="outstandings">
                <div class="outstanding-profile"><span id="${outstandingrecord.lpNumber}">LP${outstandingrecord.lpNumber}</span><span >${outstandingrecord.name}</span></div>
                <div class="outstanding">Outstanding Normal Loan: ${toNairaCurrency(normalLoanAmount)}</div>
                <div class="outstanding">Outstanding Special Loan: ${toNairaCurrency(specialLoanAmount)}</div>
            </div>`;
});


alloutstandingLoans.innerHTML = alloustandinLoanHTML;

})
}
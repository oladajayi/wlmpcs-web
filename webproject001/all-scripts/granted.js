import { toNairaCurrency, getFromLocalStorage, changeColor } from './manager.js';


// Function to display all granted Loans
export const displayAllGrantedLoan = () => {


document.getElementById("granted-loans").addEventListener("click", () => {

changeColor("loan-applications","white", "green");
changeColor("granted-loans","green","white");
changeColor("outstanding-loans","white", "green");
changeColor("loan-repayment","white", "green");

const loanGrantedEl = document.getElementById("loan-type");
let loanGrantedHTML = "";

let grantedLoans = getFromLocalStorage("allApprovedLoan");

console.log(grantedLoans);
grantedLoans.forEach((grantedLoan) => {
    let loanType = grantedLoan.hasOwnProperty("normalLoan") ? "Normal Loan" : "Special Loan";
    let loanAmount = grantedLoan.hasOwnProperty("normalLoan") ? grantedLoan.normalLoan : grantedLoan.specialLoan;

    loanGrantedHTML += `
        <div class="loanGrantedtProfile card p-3 mb-3 mt-4 shadow-sm w-90" data-removed-id="${grantedLoan.lpNumber}">
            <div class="loanGranted row">
                <span class="col-6">Lp${grantedLoan.lpNumber}</span>
                <span class="col-6 text-start">${grantedLoan.name}</span>
            </div>
            <div class="loanGranted row">
                <span class="col-6">Loan: ${toNairaCurrency(loanAmount)}</span>
                <span class="col-6 text-start">Interest: ${toNairaCurrency(grantedLoan.interest)}</span>
            </div>
            <div class="loanGranted row">
                <span class="col-6">Total: ${toNairaCurrency(grantedLoan.total)}</span>
                <span class="col-6 text-start">${loanType}</span>
            </div>
            <div class="loanGrantedGuarantor row d-flex align-items-center">
                    <div class="col-1">
                        <input type="checkbox" class="me-2" name="${grantedLoan.firstGuarantorId}">
                    </div>
                    <div class="col-10">
                        <label>${grantedLoan.firstGuarantorId || "N/A"}</label>
                    </div>
            </div>
            <div class="loanGrantedGuarantor row d-flex align-items-center">
                <div class="col-1">
                    <input type="checkbox" class="me-2" name="${grantedLoan.secondGuarantorId}">
                </div>
                <div class="col-10">
                    <label>${grantedLoan.secondGuarantorId || "N/A"}</label>
                </div>
            </div>
            <div class="loanGranted mt-2">Date Applied: ${grantedLoan.dateApplied}</div>
        </div>`;
});

loanGrantedEl.innerHTML = loanGrantedHTML;

}) // End of the main event Listener
} // End of the main Function
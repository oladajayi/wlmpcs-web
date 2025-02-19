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
        <div class="loanGrantedtProfile card p-3 mb-3 mt-4 shadow-sm" data-removed-id="${grantedLoan.lpNumber}">
            <div class="loanGranted d-flex justify-content-between">
                <span>Lp${grantedLoan.lpNumber}</span>
                <span>${grantedLoan.name}</span>
            </div>
            <div class="loanGranted d-flex justify-content-between">
                <span>Loan: ${toNairaCurrency(loanAmount)}</span>
                <span>Interest: ${toNairaCurrency(grantedLoan.interest)}</span>
            </div>
            <div class="loanGranted d-flex justify-content-between">
                <span>Total: ${toNairaCurrency(grantedLoan.total)}</span>
                <span>${loanType}</span>
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
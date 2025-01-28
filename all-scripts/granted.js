import { toNairaCurrency, getFromLocalStorage, changeColor } from './manager.js';


// Function to display all granted Loans
export const displayAllGrantedLoan = () => {


document.getElementById("granted-loans").addEventListener("click", () => {

changeColor("loan-applications","white", "green");
changeColor("granted-loans","green","white");
changeColor("outstanding-loans","white", "green");
changeColor("loan-rpayment","white", "green");

const loanGrantedEl = document.getElementById("loan-type");
let loanGrantedHTML = "";

let grantedLoans = getFromLocalStorage("allApprovedLoan");

console.log(grantedLoans);
grantedLoans.forEach((grantedLoan) => {

    if (grantedLoan.hasOwnProperty("normalLoan")) {
    loanGrantedHTML += `<div class="loanGrantedtProfile" data-removed-id="${grantedLoan.lpNumber}">
                <div class="loanGranted">
                    <span>Lp${grantedLoan.lpNumber}</span>
                    <span>${grantedLoan.name}</span>
                </div>
                <div class="loanGranted">
                    <span>Loan: ${toNairaCurrency(grantedLoan.normalLoan)}</span>
                    <span>Interest: ${toNairaCurrency(grantedLoan.interest)}</span>
                </div>
                <div class="loanGranted">
                    <span>Total: ${toNairaCurrency(grantedLoan.total)}</span>
                    <span>Normal Loan</span>
                </div>
                <div class="loanGrantedGuarantor">
                    <input type="checkbox" name="${grantedLoan.firstGuarantorId}">
                    <label for="firstGuarantoeProfile">${grantedLoan.firstGuarantorId || "N/A"}</label>
                </div>
                <div class="loanGrantedGuarantor">
                    <input type="checkbox" name="${grantedLoan.secondGuarantorId}">
                    <label for="secondGuarantoeProfile">${grantedLoan.secondGuarantorId || "N/A"}</label>
                </div>
                <div class="loanGranted">Date Applied: ${grantedLoan.dateApplied}</div>
                
            </div>`
    } else{
        loanGrantedHTML += `<div class="loanGrantedtProfile" data-removed-id="${grantedLoan.lpNumber}">
        <div class="loanGranted">
            <span>Lp${grantedLoan.lpNumber}</span>
            <span>${grantedLoan.name}</span>
        </div>
        <div class="loanGranted">
            <span>Loan: ${toNairaCurrency(grantedLoan.specialLoan)}</span>
            <span>Interest: ${toNairaCurrency(grantedLoan.interest)}</span>
        </div>
        <div class="loanGranted">
            <span>Total: ${toNairaCurrency(grantedLoan.total)}</span>
            <span>Special Loan</span>
        </div>
        <div class="loanGrantedGuarantor">
            <input type="checkbox" name="${grantedLoan.firstGuarantorId}">
            <label for="firstGuarantoeProfile">${grantedLoan.firstGuarantorId || "N/A"}</label>
        </div>
        <div class="loanGrantedGuarantor">
            <input type="checkbox" name="${grantedLoan.secondGuarantorId}">
            <label for="secondGuarantoeProfile">${grantedLoan.secondGuarantorId || "N/A"}</label>
        </div>
        <div class="loanGranted">Date Applied: ${grantedLoan.dateApplied}</div>
        
    </div>`
    }
});

loanGrantedEl.innerHTML = loanGrantedHTML;



}) // End of the main event Listener
} // End of the main Function
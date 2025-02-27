import {loanApplication } from "./loan-not-yet-approved.js";
import {displayAllGrantedLoan} from "./granted.js";
import {displayAllOutstandingLoan} from "./outstandingLoan.js";
import {generateDepositorInput} from "./repayment.js";

// Function to retrieve data from LocalStorage
export const getFromLocalStorage = (nameInStorageKey) => {
    try {
        const storedValue = localStorage.getItem(nameInStorageKey);
        return storedValue ? JSON.parse(storedValue) : null; // Convert JSON string back to object
    } catch (error) {
        console.error("Error retrieving from local storage:", error);
        return null;
    }
};

// Function to save data to Localstorage
export function setItemInLocalStorage(key, value) {
    try {
      // Convert value to JSON string if it's an object or array
      const stringValue = JSON.stringify(value);
  
      // Store the key-value pair in local storage
      localStorage.setItem(key, stringValue);
  
      console.log(`Successfully stored: ${key} = ${stringValue}`);
    } catch (error) {
      console.error(`Error storing item in localStorage: ${error.message}`);
    }
  };
  

export function toNairaCurrency(value) {
    if (isNaN(value)) {
        throw new Error("Invalid number input");
    }
    return `₦${Number(value).toLocaleString("en-NG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
};

// function to change bacgroundcolor and text color
export const changeColor = (ElId, textColor,backgrColor) => {
    const elToColor = document.getElementById(ElId);
    elToColor.style.backgroundColor = backgrColor;
    elToColor.style.color = textColor;
    }

// Retrieve data from local storage
const allCooperatorsData = getFromLocalStorage("members");

// Log the data to ensure it's being retrieved correctly
console.log(allCooperatorsData);

// Check if data exists before processing
if (allCooperatorsData) {
    let totalMemberSavings = 0;
    let totalOutstandingNormalLoan = 0;
    let totalOutstandingSpecialLoan = 0;
    const savings = document.getElementById("total-member-savings");
    const normalBalance = document.getElementById("total-normal-loan");
    const specialBalance = document.getElementById("total-special-loan");

    // Process each cooperators' data
    allCooperatorsData.forEach((data) => {
        const { totalSavings = 0, normalLoan = 0, specialLoan = 0 } = data;
        totalMemberSavings += parseFloat(totalSavings);
        totalOutstandingNormalLoan += parseFloat(normalLoan);
        totalOutstandingSpecialLoan += parseFloat(specialLoan);
    });

     savings.textContent = toNairaCurrency(totalMemberSavings);
     normalBalance.textContent = toNairaCurrency(totalOutstandingNormalLoan);
     specialBalance.textContent = toNairaCurrency(totalOutstandingSpecialLoan);
    // Log the totals
    console.log("Total Member Savings:", totalMemberSavings);
    console.log("Total Outstanding Normal Loan:", totalOutstandingNormalLoan);
    console.log("Total Outstanding Special Loan:", totalOutstandingSpecialLoan);
} else {
    console.log("No cooperators data available.");
}

document.getElementById("allMembers-loan").addEventListener("click", () => {
    changeColor("membersList","white", "green");
    changeColor("allMembers-loan","blue","white");
    changeColor("members-deduction","white", "green");
    changeColor("upload", "white", "green");

document.getElementById("manager-container").classList.add("shift-up");

const displayLoanEl = document.getElementById("members-container");
displayLoanEl.innerHTML = `<div id="allLoans" class="all-loan">
                    <div class="loan-group w-90 d-flex mx-auto justify-content-between">
                        <span id="loan-applications">Application</span>
                        <span id="granted-loans">Granted</span>
                        <span id="outstanding-loans">Outstanding</span>
                        <span id="loan-repayment">Repayment</span>
                    </div>
                    <div id="loan-type" class="loanType"></div>
                      </div>`;
                     
                      document.getElementById("members-container").classList.add("adjust-margin-up");    

                      loanApplication();
                      displayAllGrantedLoan();  
                      displayAllOutstandingLoan();  
                      generateDepositorInput(changeColor); // implement loan repayment button               
})

document.getElementById("members-deduction").addEventListener("click", () => {
    changeColor("membersList","white", "green");
    changeColor("allMembers-loan","white", "green");
    changeColor("members-deduction","blue", "white");
    changeColor("upload", "white", "green");


    document.getElementById("manager-container").classList.add("shift-up");

    const displayLoanEl = document.getElementById("members-container");
    displayLoanEl.innerHTML = `<div id="allSavingsFromDeduction" class="savingsFromDeduction w-90">
            <div class="deduction-group d-flex w-100 justify-content-between mx-auto">
                <span id="monthly-savings">Monthly Savings</span>
                <span id="match-deduction">Match Deductions</span>
                <span id="confirm-deductions">Confirm Deductions</span>
            </div>
            <div id="try-it"></div>`;    

            document.getElementById("members-container").classList.add("adjust-margin-up");         
    })

    
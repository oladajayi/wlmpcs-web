import { toNairaCurrency, getFromLocalStorage,setItemInLocalStorage, changeColor } from './manager.js';

// Set current date
export const dateSavingUploaded = new Date().toLocaleDateString("en-NG", {
    timeZone: "Africa/Lagos",
    weekday: "short", 
    day: "numeric",   
    month: "short",   
    year: "numeric",  
});


// Retrieve stored data or use defaults
const allMonthlyDeduction = getFromLocalStorage("deduction") || [];
const getOutstanding = getFromLocalStorage("members") || [];

// Main event listener for "mebers-deduction" button
document.getElementById("members-deduction").addEventListener("click", () => {

    const displayDeducEl = document.getElementById("members-container");
    displayDeducEl.innerHTML = `<div id="allSavingsFromDeduction" class="savingsFromDeduction">
                <div class="deduction-group">
                    <span id="monthly-savings">Monthly Savings</span>
                    <span id="match-deduction">Match Deductions</span>
                    <span id="confirm-deductions">Confirm Deductions</span>
                </div>
                <div id="try-it"></div>
            </div>`;
            const reDisplayEl = document.getElementById("allSavingsFromDeduction");
            reDisplayEl.style.display ="block"
   
    changeColor("members-deduction","blue","white");
    changeColor("membersList","white", "green");
    changeColor("allMembers-loan","white", "green");
    changeColor("upload","white", "green");
   
    const savingRecordEl = document.getElementById("try-it");
    

    // Attach event listener to dynamically added "monthly-savings" element
    const confirmDeductionEl = document.getElementById("monthly-savings");
    if (confirmDeductionEl) {
        confirmDeductionEl.addEventListener("click", () => {
            changeColor("monthly-savings", "green", "white");
            changeColor("match-deduction", "white","green");
            changeColor("confirm-deductions", "white", "green");

            let savingRecordHTML = "";

            // Process and display monthly deductions
            allMonthlyDeduction.forEach((record) => {
                let lpNumber = record["STAFF ID"];
                let savingAmount = record.SAVINGS;
                let memberName = record["STAFF NAME"];

                if (savingAmount > 0) {
                    savingRecordHTML += `<div class="monthlySavings" id="Lp-${lpNumber}">
                        <div id="member-saving" class="memberSaving">
                            <span>LP${lpNumber}</span>
                            <span class="name-of-member">${memberName}</span>
                        </div>
                        <span class="formatedSaving">${toNairaCurrency(savingAmount)}</span>
                        <div id="unconfirm-deduction" class="memberSaving">
                            <span id="${lpNumber}" class="confirm">Confirm</span>
                            <span>${dateSavingUploaded}</span>
                        </div>
                        <dialog id="savings-dialog" class="savingsdialog">
                            <p>Are you sure you want to confirm savings for this member</p>
                            <div class="savingsButtons"><button class="cancelSavings" id="cancel-savings">Cancel</button><button class="confirmSavings" id="confirm-savings">Confirm</button></div>
                        </dialog>
                    </div>`;
                }
                
            });

            // Append the generated HTML
            savingRecordEl.innerHTML = savingRecordHTML;
            confirmMonthlySavings();
        });
    } else {
        console.error("Element with ID 'monthly-savings' not found.");
    }
    
});



// Function to confirm monthly savings payment

const confirmMonthlySavings = () => {
    
    document.querySelectorAll(".confirm").forEach((eachConfirm) => {
        eachConfirm.addEventListener("click", () => {
        // Get dialog elements
        const dialogEl = document.getElementById("savings-dialog");
        const cancelSavingstEl = document.getElementById("cancel-savings");
        const confirmSavingstEl = document.getElementById("confirm-savings");
        // Dispaly dialog box
        dialogEl.showModal();
        // Close dialog box if not approving the payment
        cancelSavingstEl.onclick = () => {
            dialogEl.close();  
            setTimeout(() => (payButton.disabled = false), 50);
        }
        // Procede with payment
        confirmSavingstEl.onclick = () => {
        // Close dialog
        dialogEl.close(); 

        addSavingToMember(eachConfirm); // Calling the addSavingToMember function

        }
        })
    })
}




// Function to add savings to members record
const addSavingToMember = (eachConfirm) => {
const findDeduction = allMonthlyDeduction.find(
    (eachRecord) => eachRecord["STAFF ID"] === eachConfirm.id
);
const findMember = getOutstanding.find(
    (eachMember) => eachMember.lpNumber === eachConfirm.id
);

if (findDeduction && findMember) {
    // Update total savings
    findMember.totalSavings =
        parseFloat(findMember.totalSavings) + parseFloat(findDeduction.SAVINGS);

    // Save the updated data to localStorage
    setItemInLocalStorage("members", getOutstanding);

    // Remove the element associated with `Lp-eachConfirm.id`
    const removeEl = document.getElementById(`Lp-${eachConfirm.id}`);
        removeEl.remove();
    
} else {
    console.error("Unable to find matching deduction or member record.");
}

}

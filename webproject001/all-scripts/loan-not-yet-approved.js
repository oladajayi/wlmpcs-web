import { toNairaCurrency, getFromLocalStorage, changeColor } from './manager.js';

// fuction to display all applied Loans
export const loanApplication = () =>{

document.getElementById("loan-applications").addEventListener("click", () => {

    changeColor("loan-applications","green","white");
    changeColor("granted-loans","white", "green");
    changeColor("outstanding-loans","white", "green");
    changeColor("loan-repayment","white", "green");

let loanToAppeoveEl = document.getElementById('loan-type');
let allLoanToApproveHTML = "";

const allLoanInstorage = getFromLocalStorage("loanrequest");
console.log(allLoanInstorage);

allLoanInstorage.forEach((eachLoan) => {
            
                let loanType = eachLoan.normalLoan? "Normal Loan" : "Special Loan";
                let loanAmount = eachLoan.normalLoan? eachLoan.normalLoan : eachLoan.specialLoan;

                allLoanToApproveHTML += `
                    <div class="loanRequestProfile w-90" data-removed-id="${eachLoan.lpNumber}">
                        <div class="loanAwaitingApproval row">
                            <span class="col-6">LP${eachLoan.lpNumber}</span>
                            <span class="col-6 text-start">${eachLoan.name}</span>
                        </div>
                        <div class="loanAwaitingApproval row">
                            <span class="col-6">Loan: ${toNairaCurrency(loanAmount)}</span>
                            <span class="col-6 text-start">Interest: ${toNairaCurrency(eachLoan.interest)}</span>
                        </div>
                        <div class="loanAwaitingApproval row">
                            <span class="col-6">Total: ${toNairaCurrency(eachLoan.total)}</span>
                            <span class="col-6 text-start">${loanType}</span>
                        </div>
                        <div class="guarantorDetails row align-items-center">
                            <div class="col-2">
                                <input type="checkbox" name="${eachLoan.firstGuarantorId}">
                            </div>
                            <div class="col-10">
                                <label>${eachLoan.firstGuarantorId || "N/A"}</label>
                            </div>
                        </div>
                        <div class="guarantorDetails row align-items-center">
                            <div class="col-2">
                                <input type="checkbox" name="${eachLoan.secondGuarantorId}">
                            </div>
                            <div class="col-10">
                                <label>${eachLoan.secondGuarantorId || "N/A"}</label>
                            </div>
                        </div>
                        <div class="loanAwaitingApproval">Date Applied: ${eachLoan.dateApplied}</div>
                        <div class="loanButtons d-flex gap-2">
                            <button type="button" class="reject" data-reject-id="${eachLoan.lpNumber}">Decline</button>
                            <button type="button" class="approve" data-approval-id="${eachLoan.lpNumber}">Approve</button>
                        </div>
                </div>`; 
        });

        loanToAppeoveEl.innerHTML = allLoanToApproveHTML;

        

const approveButtonEl = document.querySelectorAll('.approve');
const rejectButtonEl = document.querySelectorAll('.reject');
const loanRequestProfileEl = document.querySelectorAll('.loanRequestProfile'); 
let approvedLoans = "";

approveButtonEl.forEach((approveButton) => {
    approveButton.addEventListener("click", () => {
        const userConfirmed = confirm("Are you sure you want to approve the loan?");
        if (userConfirmed) {
        const approvalId = approveButton.dataset.approvalId; // Get the approval ID from the clicked button.
        updateMemberSatement();
        removeApprovedLoan(approvalId); // Pass the approval ID.
        removeLoanElement(approvalId); // Immediately remove the corresponding element.
        }
    });
});


rejectButtonEl.forEach((rejectButton) => {
    rejectButton.addEventListener("click", () => {
        const userConfirmed = confirm("Are you sure you want to Reject this loan?");
        if (userConfirmed) {
        const rejectId = rejectButton.dataset.rejectId; // Get the approval ID from the clicked button.
        removeApprovedLoan(rejectId); // Pass the approval ID.
        removeLoanElement(rejectId); // Immediately remove the corresponding element.
        }
    });
});

const removeApprovedLoan = (approvalId) => {
    // Use approvalId to find the loan
    let loanIndex = allLoanInstorage.findIndex((item) => item.lpNumber === approvalId);
    if (loanIndex !== -1) {
        approvedLoans = allLoanInstorage.splice(loanIndex, 1);

        // Update localStorage
    localStorage.setItem("loanrequest", JSON.stringify(allLoanInstorage));
    let allApproved = JSON.parse(localStorage.getItem("allApprovedLoan")) || [];
    allApproved.push(approvedLoans[0]);

    localStorage.setItem("allApprovedLoan", JSON.stringify(allApproved));
    }
};

const removeLoanElement = (approvalId) => {
    // Get the updated list of elements
    const updatedLoanRequestProfileEl = document.querySelectorAll('.loanRequestProfile');
    updatedLoanRequestProfileEl.forEach((element) => {
        if (element.dataset.removedId === approvalId) {
            element.remove(); // Remove the element from the DOM
            document.body.offsetHeight; // Force reflow if necessary
        }
    });
};


const updateMemberSatement = () => {
 const membersStatement =   JSON.parse(localStorage.getItem("members")) || [];

 membersStatement.forEach((record) => {
   let findCommonLp = allLoanInstorage.find((user) => user.lpNumber === record.lpNumber)

   if (findCommonLp && findCommonLp.hasOwnProperty("normalLoan")){
    record.normalLoan = findCommonLp.total;
    
   }else if (findCommonLp && findCommonLp.hasOwnProperty("specialLoan")){
    record.specialLoan = findCommonLp.total;
    
   }
   
 })
localStorage.setItem("members", JSON.stringify(membersStatement))
}




}) // End of event listener on Application Button

} // End of the function

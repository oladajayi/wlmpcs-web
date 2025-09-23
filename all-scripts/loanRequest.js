const amountRequested =document.getElementById('amount');
const loanInterest =document.getElementById('interest');
const monthlyDeduction =document.getElementById('monthly-deduction');
const repaymentDuration =document.getElementById('repayment-duration');
const totalPackage =document.getElementById('totalPackage');
const durationInput =document.getElementById('duration');
const amountInput =document.getElementById('loan-amount');
const formEl = document.getElementById("loan-request-form");

const selectElements = document.querySelectorAll('#firstGuarantor, #secondGuarantor');
const radioInput = document.querySelectorAll('.radioInput');

let determineLoanType = 0;
let totalLoanPackage = 0;
let interestPayable = 0;
let loanAmountApplied = 0;

const loanDate = () => new Date().toLocaleDateString("en-NG", {
    timeZone: "Africa/Lagos",
    weekday: "short", 
    day: "numeric",   
    month: "short",   
    year: "numeric",  
  });

  // Loan Record and Guarantee a Loan script

function toNairaCurrency(value) {
    if (isNaN(value)) {
        throw new Error("Invalid number input");
    }
    return `₦${Number(value).toLocaleString("en-NG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
}

const populateGuarantorOptions = (event) => {
    const selectElement = event.target;

    const guarantorList = JSON.parse(localStorage.getItem('members')) || [];
    if (guarantorList.length === 0) {
        console.error('No guarantors found in local storage');
        return;
    }

    // Clear existing options
    selectElement.innerHTML = '<option value="">Select a guarantor</option>';

    guarantorList.forEach((guarantor) => {
        // Ensure valid and unique values
        if (guarantor.lpNumber && guarantor.name) {
            const option = document.createElement('option');
            option.value = guarantor.lpNumber;
            option.textContent = `${guarantor.lpNumber} - ${guarantor.name}`;
            selectElement.appendChild(option);
        }
    });  
};

const cleanLoanInput = () => {
    amountRequested.textContent= "";
    repaymentDuration.textContent= "";
    loanInterest.textContent= "";
    monthlyDeduction.textContent= "";
    totalPackage.textContent= "";
    document.getElementById("firstGuarantor").innerHTML = ""; 
    document.getElementById("secondGuarantor").innerHTML = ""; 
};

const loanDetails = () => {
   
    let interestOnLoan = 0;
    const selectedRadioEl = Array.from(radioInput);
    const checkedRadio = selectedRadioEl.find((radio) => radio.checked);
  
    if (checkedRadio &&
        !isNaN(Number(amountInput.value)) &&
        Number(amountInput.value) >= 0 &&
        Number(durationInput.value) > 0) {
      const loanApplied = parseFloat(amountInput.value);
      const selectInterestRate = checkedRadio.value;
      interestOnLoan = (parseFloat(selectInterestRate) / 100 * loanApplied).toFixed(2);
  
      determineLoanType = parseFloat(selectInterestRate);
  
      const repaymentPeriod = parseInt(durationInput.value, 10);
      const totalAmount = loanApplied + parseFloat(interestOnLoan);
      const monthlyInstallment = (totalAmount / repaymentPeriod).toFixed(2);
      amountRequested.textContent = toNairaCurrency(loanApplied);
      repaymentDuration.textContent = repaymentPeriod;
      loanInterest.textContent = toNairaCurrency(interestOnLoan);
      monthlyDeduction.textContent = toNairaCurrency(monthlyInstallment);
      totalPackage.textContent = toNairaCurrency(totalAmount);
  
      totalLoanPackage =totalAmount;
      interestPayable = interestOnLoan;
      loanAmountApplied = loanApplied;
    } 
  };


selectElements.forEach((select) => {
    select.addEventListener('focus', populateGuarantorOptions);
    
});


document.getElementById('loan-request-form').addEventListener("submit", (e) => {
    e.preventDefault(); 

    createLoanStoarege();
    cleanLoanInput();
    e.target.reset();
    

    // Create the alert div
const loanalertDiv = document.createElement("div");
loanalertDiv.className = "alert fade show position-fixed top-0 end-0 m-3 text-center loanSuccess";
loanalertDiv.setAttribute("role", "alert");
loanalertDiv.style.backgroundColor = "green";
loanalertDiv.style.color = "whitesmoke";
loanalertDiv.style.padding = "10px 20px"; // Adds spacing
loanalertDiv.style.borderRadius = "5px"; // Optional: rounded corners
loanalertDiv.textContent = "Loan application successful. Waiting for Approval!";

// Append the alert div to the body (or a container)
document.body.appendChild(loanalertDiv);

// Automatically remove after 3 seconds
setTimeout(() => {
  loanalertDiv.classList.remove("show"); // Bootstrap fade effect
  loanalertDiv.classList.add("fade");  // Smooth fading out
  setTimeout(() => loanalertDiv.remove(), 500); // Remove after fade out
}, 3000);
    
})

durationInput.addEventListener("input", () => {
    try {
      loanDetails();
    } catch (error) {
      console.error("Error in loanDetails:", error);
    }
  });

  


const createLoanStoarege = () => {
    const members = JSON.parse(localStorage.getItem('members')) || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};

    // Find the current user's record in the members array
    const CheckUserRecord = members.find((member) =>
        currentUser.lpNumber === member.lpNumber && currentUser.userPassword === member.userPassword
    );

    if (!CheckUserRecord) {
        console.error("No matching user record found.");
        return;
    }

   
    // Get the guarantor elements
    let firstGuarantorEl = document.getElementById("firstGuarantor");
    let secondGuarantorEl = document.getElementById("secondGuarantor");

    

    // Get the selected guarantor IDs
    let firstGuarantorId = firstGuarantorEl.options[firstGuarantorEl.selectedIndex].text;
    let secondGuarantorId = secondGuarantorEl.options[secondGuarantorEl.selectedIndex].text;

    // Create the loan record object
    const loanRecord = {
        lpNumber: currentUser.lpNumber,
        name: currentUser.name,
        interest: interestPayable,
        firstGuarantorId: firstGuarantorId,
        secondGuarantorId: secondGuarantorId,
        dateApplied: loanDate(),
    };

    // Update the loanRecord object
    if (determineLoanType === 7.5 || determineLoanType === 10 || determineLoanType === 12.5) {
        loanRecord.specialLoan = loanAmountApplied;
        loanRecord.total = parseFloat(interestPayable) + loanAmountApplied;
    } else if (determineLoanType === 5 || determineLoanType === 7) {
        loanRecord.normalLoan = loanAmountApplied;
        loanRecord.total = parseFloat(interestPayable) + loanAmountApplied;
    }

   

    // Save the loan record to localStorage
    const loanLocalStorage = JSON.parse(localStorage.getItem("loanrequest")) || [];
    loanLocalStorage.push(loanRecord);
    localStorage.setItem("loanrequest", JSON.stringify(loanLocalStorage));
    
};





const loanLocalStorage = JSON.parse(localStorage.getItem("loanrequest")) || [];
const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
const loanContainerEl = document.getElementById("loan-container");
let loanContainerHTML = "";


// Get the Loan Items by Id
const loanguaranteedEl = document.getElementById("loanguaranteed");
const recordEl = document.getElementById("record");
const applyEl = document.getElementById("apply");

// Function to change button ackground colors on click

const changeLoanItemsColor = (colorOne,colorTwo,colorThree) => {
colorOne.style.backgroundColor = "white";
colorOne.style.color = "#20c997";
colorTwo.style.backgroundColor = "#20c997";
colorTwo.style.color = "white";
colorThree.style.backgroundColor = "#20c997";
colorThree.style.color = "white";
}

// Create loan guaranteed elemnt and add event listener to guarantor button
loanguaranteedEl.addEventListener("click", () =>{

changeLoanItemsColor(loanguaranteedEl,recordEl,applyEl);

loanLocalStorage.find((loan) => {
    let findLpOne = loan.firstGuarantorId.slice(0,5);
    let findLpTwo = loan.secondGuarantorId.slice(0,5);

    if(findLpOne === currentUser.lpNumber){
        
        formEl.style.display = "none";
        loanContainerHTML += `<div class="loanOwner w-75 mx-auto" data-removed-id="${loan.lpNumber}">
                <div class="loanApplied row">
                    <span class="col-6">Lp${loan.lpNumber}</span>
                    <span class="col-6 text-start">${loan.name}</span>
                </div>
                <div class="loanApplied row">
                    <span class="col-6">Loan: ${toNairaCurrency(loan.normalLoan)}</span>
                    <span class="col-6 text-start">Interest: ${toNairaCurrency(loan.interest)}</span>
                </div>
                <div class="loanApplied row">
                    <span class="col-6">Total: ${toNairaCurrency(loan.total)}</span>
                    <span class="col-6 text-start">Normal Loan</span>
                </div>
                <div class="guarantors">
                    <input type="checkbox" name="${loan.firstGuarantorId}" id="${loan.lpNumber}">
                    <label for="${loan.lpNumber}">${loan.firstGuarantorId}</label>
                </div>
                <div class="loanApplied">Date Applied: ${loan.dateApplied}</div>  
            </div>`
            
        }else if(findLpTwo === currentUser.lpNumber){
        formEl.style.display = "none";
        loanContainerHTML += `<div class="loanOwner w-75  mx-auto" data-removed-id="${loan.lpNumber}">
                <div class="loanApplied row">
                    <span class="col-6">Lp${loan.lpNumber}</span>
                    <span class="col-6 text-start">${loan.name}</span>
                </div>
                <div class="loanApplied row">
                    <span class="col-6">Loan: ${toNairaCurrency(loan.normalLoan)}</span>
                    <span class="col-6 text-start">Interest: ${toNairaCurrency(loan.interest)}</span>
                </div>
                <div class="loanApplied row">
                    <span class="col-6">Total: ${toNairaCurrency(loan.total)}</span>
                    <span class="col-6 text-start">Normal Loan</span>
                </div>
                <div class="guarantors">
                    <input type="checkbox" name="${loan.secondGuarantorId}" id="${loan.lpNumber}">
                    <label for="${loan.lpNumber}">${loan.secondGuarantorId}</label>
                </div>
                <div class="loanApplied">Date Applied: ${loan.dateApplied}</div>  
            </div>`      
    }
    
    loanContainerEl.innerHTML = loanContainerHTML;
})

});




// Create Loan Record HTML and add event listener to the record button
recordEl.addEventListener("click", () => {
    changeLoanItemsColor(recordEl,loanguaranteedEl,applyEl)
    
    let allgranted = JSON.parse(localStorage.getItem("allApprovedLoan")) || [];
    let myLoanHistoryHTML = "";
    
    
    allgranted.forEach((grantedLoan) => {
    
        if (grantedLoan.lpNumber === currentUser.lpNumber) {
            
            myLoanHistoryHTML += `<div class="loanOwner w-75 mx-auto">
                    <div class="loanApplied row">
                        <span class="col-6">Lp${grantedLoan.lpNumber}</span>
                        <span class="col-6 text-start">${grantedLoan.name}</span>
                    </div>
                    <div class="loanApplied row">
                        <span class="col-6">Loan: ${toNairaCurrency(grantedLoan.normalLoan || grantedLoan.specialLoan )}</span>
                        <span class="col-6 text-start">Interest: ${toNairaCurrency(grantedLoan.interest)}</span>
                    </div>
                    <div class="loanApplied row">
                        <span class="col-6">Total: ${toNairaCurrency(grantedLoan.total)}</span>
                        <span class="col-6 text-start">Normal Loan</span>
                    </div>
                    <div class="guarantors">
                        <input type="checkbox" name="${grantedLoan.firstGuarantorId}" id="${grantedLoan.firstGuarantorId}">
                        <label for="${grantedLoan.firstGuarantorId}">${grantedLoan.firstGuarantorId || "N/A"}</label>
                    </div>
                    <div class="guarantors">
                        <input type="checkbox" name="${grantedLoan.secondGuarantorId}" id="${grantedLoan.secondGuarantorId}">
                        <label for="${grantedLoan.secondGuarantorId}">${grantedLoan.secondGuarantorId || "N/A"}</label>
                    </div>
                    <div class="loanApplied">Date Applied: ${grantedLoan.dateApplied}</div>
                    
                </div>`
        } 
    })
    
    loanContainerEl.innerHTML = myLoanHistoryHTML;
    formEl.style.display = "none";
});


// Add event listener to the apply button
applyEl.addEventListener("click", () => {
    changeLoanItemsColor(applyEl, recordEl,loanguaranteedEl)
    
    loanContainerEl.innerHTML = "";
    loanContainerHTML = "";
    formEl.style.display = "block";
    });
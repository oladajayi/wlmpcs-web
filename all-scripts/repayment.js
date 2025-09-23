export function generateDepositorInput(changeColor) {
    document.getElementById("loan-repayment").addEventListener("click", () => {
        changeColor("loan-applications", "white", "green");
        changeColor("granted-loans", "white", "green");
        changeColor("outstanding-loans", "white", "green");
        changeColor("loan-repayment", "green", "white");

        const loanTypeEl = document.getElementById("loan-type");
        loanTypeEl.innerHTML = `
            <div class="row mt-4 d-flex justify-content-between chose mx-auto">
                <span class="col-5 p-2 text-center text-white bg-dark rounded me-2" id="loanRepayment">Loan Repayment</span>
                <span class="col-5 p-2 text-center text-white bg-secondary rounded" id="makeSavings">Make Savings</span>
            </div>`;

        document.getElementById("loanRepayment").addEventListener("click", () => {
            
            createMemberDropdown(loanTypeEl, "Loan Repayment");
        });

        document.getElementById("makeSavings").addEventListener("click", () => {
           
            createMemberDropdown(loanTypeEl, "Make Savings");
        });
    });
}

function createMemberDropdown(loanTypeEl, paymentType) {
    loanTypeEl.innerHTML = `
        <div class="card p-3 mt-3 shadow-lg w-90 mx-auto" style="background-color: #464629; color: #e3dfd3;">
            <form id="amount-paid-form" class="w-100">
                <h4 class="text-center mb-3">${paymentType}</h4>
                <div class="mb-3">
                    <label class="form-label" for="memberMakingPayment">Depositor Details:</label>
                    <select class="form-select" id="memberMakingPayment" name="member-making-payment" required></select>
                </div>
                <div class="mb-3">
                    <label class="form-label" for="amountPaidIn">Amount Paid:</label>
                    <input class="form-control form-input" type="number" id="amountPaidIn" required name="amountPaid">
                </div>
                <div class="text-center">
                    <button type="submit" class="btn btn-success w-100">Effect Payment</button>
                </div>
            </form>
        </div>`;

    const selectElement = document.getElementById("memberMakingPayment");
    const membersList = JSON.parse(localStorage.getItem("members")) || [];

    if (membersList.length === 0) {
        console.error("No member found in local storage");
        return;
    }

    // Clear existing options and add a default
    selectElement.innerHTML = '<option value="">Select a member</option>';
    membersList.forEach((member) => {
        if (member.lpNumber && member.name) {
            const option = document.createElement("option");
            option.value = member.lpNumber;
            option.textContent = `${member.lpNumber} - ${member.name}`;
            selectElement.appendChild(option);
        }
    });

    // Ensure the form event listener is properly attached
    const form = document.getElementById("amount-paid-form");
    
    if (form) { 
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent form from refreshing the page
            console.log("Form submission event triggered");
    
            effectPayment(paymentType); // Process payment
    
            console.log("Form submitted successfully!"); // Debugging message
    
            // Reset the form before changing innerHTML
            form.reset();
    
            // Delay UI update slightly to ensure smooth transition
            setTimeout(() => {
                loanTypeEl.innerHTML = `
                <div class="row mt-4 d-flex justify-content-center chose">
                    <span class="col-5 p-2 text-center text-white bg-dark rounded me-2" id="loanRepayment">Loan Repayment</span>
                    <span class="col-5 p-2 text-center text-white bg-secondary rounded" id="makeSavings">Make Savings</span>
                </div>`;
    
                // Reattach event listeners for newly created elements
                document.getElementById("loanRepayment").addEventListener("click", () => {
                    createMemberDropdown(loanTypeEl, "Loan Repayment");
                });
    
                document.getElementById("makeSavings").addEventListener("click", () => {
                    createMemberDropdown(loanTypeEl, "Make Savings");
                });
    
            }, 100); // Small delay to ensure form reset completes
        });
    
    } else {
        console.error("Form element not found");
    }
}


function effectPayment(paymentType) {
    const amountPaidEl = document.getElementById("amountPaidIn");
    const selectElement = document.getElementById("memberMakingPayment");
    const membersList = JSON.parse(localStorage.getItem("members")) || [];
    
    if (!selectElement.value) {
        alert("Please select a depositor.");
        return;
    }

    const depositorLp = selectElement.value;
    const findDepositor = membersList.find((depositor) => depositor.lpNumber === depositorLp);

    if (!findDepositor) {
        alert("Depositor not found.");
        return;
    }

    const amount = parseFloat(amountPaidEl.value);
    if (isNaN(amount) || amount <= 0) {
        alert("Enter a valid amount.");
        return;
    }

    if (paymentType === "Loan Repayment") {
        findDepositor.specialLoan = parseFloat(findDepositor.specialLoan || 0) - amount;
    } else if (paymentType === "Make Savings") {
        findDepositor.totalSavings = parseFloat(findDepositor.totalSaving || 0) + amount;
    }
    console.log(findDepositor)
    console.log(membersList)
    localStorage.setItem("members", JSON.stringify(membersList));
    alert(`${paymentType} successful!`);
}

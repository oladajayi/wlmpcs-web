const changeProfileStatus = (memberLp) => {
  
    let allManager = {
      lpNumber: memberLp,
    };
  
    // Retrieve the manager record from local storage or initialize an empty array
    let managerRecord = JSON.parse(localStorage.getItem("managerRecord"))|| [];
    
  
    // Check if the manager already exists in the record
    const findManager = managerRecord.find((manager) => manager.lpNumber === memberLp);
  
    // Add the manager if not already present
    if (!findManager) {
      managerRecord.push(allManager);
    
    // Save the updated record to local storage
    localStorage.setItem("managerRecord", JSON.stringify(managerRecord));
    }
};



changeProfileStatus("10698");

let userProfile = JSON.parse(localStorage.getItem("currentUser")); // Retrieve current user from storage
const managerLp = JSON.parse(localStorage.getItem("managerRecord")) || []; // Retrieve managerRecord from storage
const allProfile = JSON.parse(localStorage.getItem("members")) || []; // Retrieve managerRecord from storage
const profileContaineEl = document.getElementById("profile-container");


// Function to render profile page

const renderProfilePage = (userProfile,managerLp) => {
let profileStatus = "";
let changeClass = "memberStatus";

const findManager = managerLp.find((manager) => manager.lpNumber === userProfile.lpNumber);
const findMemberRecord = allProfile.find((member) => member.lpNumber === userProfile.lpNumber);
const indexEl = allProfile.indexOf(findMemberRecord);
    
if (findManager){
    profileStatus = `<i class="fas fa-chevron-right"></i>MANAGER`;
    changeClass = "manager";
} else{
    profileStatus = "";
}



if (userProfile){
  profileContaineEl.innerHTML = `
  <div id="hideMemberProfile" class=""> 
    <div class="backMembers">
        <a href="members.html">
            <button>
                <i class="fas fa-chevron-left"></i> Back
            </button>
        </a>
    </div>

    <div class="row mt-3 profile">
    <div class="col-12 col-md-3">
        <h3>Profile:</h3>
    </div>
        <div class="col-12 col-md-9 d-flex justify-content-between align-items-center">
            <span class="edit-profile" id="edit-profile">
                <i class="fas fa-edit"></i> Edit Profile
            </span>
            <span class="${changeClass}" id="${userProfile.lpNumber}">
                ${profileStatus}
            </span>
        </div>
    </div>


    <div class="row personal">
        <h3>Bio Data</h3>
        <p class="row mt-3">
            <span class="col-6">Name: </span>
            <span class="col-6" id="proile-name">${userProfile.name}</span>
        </p>
        <p class="row">
            <span class="col-6">Phone: </span>
            <span class="col-6" id="profile-phone">${userProfile.phone}</span>
        </p>
        <p class="row">
            <span class="col-12 col-md-6">Email: </span>
            <span class="col-12 col-md-6 text-break" id="profile-email">${userProfile.email}</span>
        </p>
        <p class="row mb-0">
            <span class="col-6">Date Joined: </span>
            <span class="col-6" id="date-joined">${userProfile.dateJoined}</span>
        </p>
    </div> 

    <h3 class="profile-account mt-0">Account</h3>
    <p class="row">
        <span class="col-6">Shares: </span>
        <span class="col-6" id="share-capital">${userProfile.shareCapital}</span>
    </p>
    <p class="row">
        <span class="col-6">Monthly Savings: </span>
        <span class="col-6" id="profile-amount">${userProfile.monthlySaving}</span>
    </p>
    <p class="row">
        <span class="col-6">Bank: </span>
        <span class="col-6" id="profile-bank">${userProfile.userBank}</span>
    </p>
    <p class="row">
        <span class="col-6">Account number: </span>
        <span class="col-6" id="profile-acc-number">${userProfile.bankAccount}</span>
    </p>

    <h3 class="next-of-kin">Next of Kin</h3>
    <p class="row">
        <span class="col-6">Name: </span>
        <span class="col-6" id="next-of-kin-name">${userProfile.nextOfKin}</span>
    </p>
    <p class="row">
        <span class="col-6">Phone: </span>
        <span class="col-6" id="next-of-kin-tel">${userProfile.nextOfKinContact}</span>
    </p>

    <div class="row generate-savings">
        <div class="col-6 d-flex justify-content-center">
            <button class="text-wrap">Generate Savings Form</button>
        </div>
        <div class="col-6 d-flex justify-content-center">
            <button class="text-wrap" id="change-member-password">Change password</button>
        </div>
    </div>

<dialog id="memberProfileDialog" class="memberProfileDialog p-2 mx-auto fs-4">
    <p id="actionMessage" class="text-center"></p>
    <div class="row g-0 decide">
        <div class="col-6 d-flex justify-content-center">
            <button class="btn btn-danger" id="cancelEdit">Cancel</button>
        </div>
        <div class="col-6 d-flex justify-content-center">
            <button class="btn btn-primary" id="continueEdit">Continue</button>
        </div>
    </div>
</dialog>

</div>`;

if(userProfile && profileContaineEl){
        const mangerEl = document.getElementById(userProfile.lpNumber);
        if(mangerEl.textContent.trim() === "MANAGER"){
            mangerEl.addEventListener("click", () => {
            window.location.href = "../wlmpcshtml/manager.html";
        })
    } 
}
editMemberProfile(userProfile,managerLp); // calling
changePassword(findMemberRecord,userProfile,managerLp,allProfile); // Calling change password function

    }
    
  }

  renderProfilePage(userProfile,managerLp); // calling render page to display profile


    
// Function to edit profile
function editMemberProfile(userProfile,managerLp){
        
    // add event listener to the edit element
    document.getElementById("edit-profile").addEventListener("click", () => {
          
    // Message to display in dialogue box.
    const messageToDisplay ="Are you sure you want to edit your details?"; 
    // Calling message to display function
    displayOrCloseDialog(messageToDisplay);
    // get continueEdit from the dialogue
    const confirmChangeEl = document.getElementById("continueEdit");
        
    // get memberProfileDialog from the dialogue
    const showDialogueEl = document.getElementById("memberProfileDialog");
    // add click event to dialogue continue button to perfom action
    confirmChangeEl.onclick = () => {
    showDialogueEl.close(); // close modal before beforming the required action
    
    // Hide the profile page
    const hideProfileEL = document.getElementById("hideMemberProfile");
    hideProfileEL.classList.toggle("hideMemberProfile");
    
        

    const findSelectedLp = allProfile.find((profile) => profile.lpNumber === userProfile.lpNumber);
          
    const indexToEdit = allProfile.indexOf(findSelectedLp); // Find Record to edit
    
    let {name,lpNumber,phone,email,monthlySaving,userBank,bankAccount,nextOfKin,nextOfKinContact} = allProfile[indexToEdit];
         
    // display the input page for correction
         
    
    profileContaineEl.innerHTML += `
         
     <div id="edit-members-record" class="editMembersRecord">
      <dialog id="save-changes-dialog" class="saveChangesDialog p-2 mx-auto fs-4">
            <p id="saveChangesMessage" class="text-center">Are you sure you want to submit the changes?</p>
            <div class="editMemberDecide row g-0 decide">
                <div class="col-6 d-flex justify-content-center">
                        <button class="btn btn-danger" id="editMember-cancelEdit">Cancel</button>
                </div>
                <div class="col-6 d-flex justify-content-center">
                        <button class="btn btn-primary" id="editmember-continueEdit">Continue</button>
                </div>
            </div>
      </dialog>
      <form id="edit-member-form" action="" >
          <div class="row mb-3">
              <label class="col-4" for="edit-lp">LP Number</label>
              <div class="col-7">
                  <input class="form-control disabled-input" id="edit-lp" type="text" name="edit-lp" disabled>
              </div>
          </div>

          <div class="row mb-3">
              <label class="col-4" for="edit-name">Name</label>
              <div class="col-7">
                  <input class="form-control" id="edit-name" type="text" Name" name="name"  required autocomplete="name">
              </div>
          </div>

          <div class="row mb-3">
              <label class="col-4" for="editPhone">Phone Number</label>
              <div class="col-7">
                  <input class="form-control" id="editPhone" type="tel" required name="phone" autocomplete="tel">
              </div>
          </div>

          <div class="row mb-3">
              <label class="col-4" for="edit-email">E-mail</label>
              <div class="col-7">
                  <input class="form-control" id="edit-email" type="email" required name="email" autocomplete="email">
              </div>
          </div>

          <div class="row mb-3">
              <label class="col-4" for="edit-savingAmount">Savings Amount</label>
              <div class="col-7">
                  <input class="form-control" id="edit-savingAmount" type="number" required name="savingAmount">
              </div>
          </div>

          <div class="row mb-3">
              <label class="col-4" for="edit-bank">Bank</label>
              <div class="col-7">
                  <input class="form-control" id="edit-bank" type="text" required name="bank">
              </div>
          </div>

          <div class="row mb-3">
              <label class="col-4" for="edit-accountNumber">Account Number</label>
              <div class="col-7">
                  <input class="form-control" id="edit-accountNumber" type="number" required name="accountNumber">
              </div>
          </div>

          <div class="row mb-3">
              <label class="col-4" for="edit-nextOfKin">Next of Kin Name</label>
              <div class="col-7">
                  <input class="form-control" id="edit-nextOfKin" type="text" required name="nextOfKin">
              </div>
          </div>

          <div class="row mb-3">
              <label class="col-4" for="edit-nextOfKin-phone">Next of Kin Phone Number</label>
              <div class="col-7">
                  <input class="form-control" id="edit-nextOfKin-phone" type="tel" required name="nextOfKinPhone" autocomplete="tel">
              </div>
          </div>

          <div class="d-flex justify-content-center m-2" id="changesEffected">
              <button class="btn btn-primary" id="saveChangesMade" type="submit">Save Changes</button>
          </div>
          
    </form>
</div>`
         
         
// Display member's previous Record
document.getElementById("edit-lp").value = lpNumber;  
document.getElementById("edit-name").value = name;  
document.getElementById("editPhone").value = phone;  
document.getElementById("edit-savingAmount").value = monthlySaving;  
document.getElementById("edit-bank").value = userBank;  
document.getElementById("edit-accountNumber").value = bankAccount;  
document.getElementById("edit-email").value = email;  
document.getElementById("edit-nextOfKin").value = nextOfKin;  
document.getElementById("edit-nextOfKin-phone").value = nextOfKinContact;  
saveChanges(allProfile,indexToEdit) // Calling the save changes
}

})

}


    
      
// Function to open and close dialogue box
const displayOrCloseDialog = (messageToDisplay) => {
  // get the actionMessage element from the DOM
  const actionMessageEl = document.getElementById("actionMessage");
  
  // Update the text content of the P element of the dialogue box
  actionMessageEl.textContent = messageToDisplay;  
  // Get dialogue elements from DOM
  const showDialogueEl = document.getElementById("memberProfileDialog");
  
  const declineChangeEl = document.getElementById("cancelEdit");
    
  // Display dialogue box
  showDialogueEl.showModal();

  // add click event to close the dialogue box
  declineChangeEl.onclick = () => {
    showDialogueEl.close();
  }
}


// Function to save the changes made to the members details
const saveChanges = (allProfile,indexToEdit) => {

const formElb = document.getElementById("edit-member-form");

formElb.addEventListener("submit", (e) => {
  e.preventDefault(); 
  
  // Get dialogue elements from DOM
  const showDialogueEl = document.getElementById("save-changes-dialog");
  const confirmChangeEl = document.getElementById("editmember-continueEdit");
  const cancelChangeEl = document.getElementById("editMember-cancelEdit");

  // Close modal when Cancel button is clicked
  cancelChangeEl.onclick = () => {
    showDialogueEl.close(); 
  }
  // Display dialogue box
  showDialogueEl.showModal();

  confirmChangeEl.onclick = () => {
  showDialogueEl.close(); // close modal before beforming the required action

  allProfile[indexToEdit].name = document.getElementById("edit-name").value;  
  allProfile[indexToEdit].lpNumber = document.getElementById("edit-lp").value;  
  allProfile[indexToEdit].phone = document.getElementById("editPhone").value;  
  allProfile[indexToEdit].monthlySaving = document.getElementById("edit-savingAmount").value;  
  allProfile[indexToEdit].userBank = document.getElementById("edit-bank").value;  
  allProfile[indexToEdit].bankAccount = document.getElementById("edit-accountNumber").value;  
  allProfile[indexToEdit].email = document.getElementById("edit-email").value;  
  allProfile[indexToEdit].nextOfKin = document.getElementById("edit-nextOfKin").value;  
  allProfile[indexToEdit].nextOfKinContact = document.getElementById("edit-nextOfKin-phone").value; 
  localStorage.setItem("members", JSON.stringify(allProfile));
  userProfile = allProfile[indexToEdit];
  renderProfilePage(userProfile,managerLp); //Calling renderProfilePage
  
  }
});
}


// Function to change password
function changePassword(findMemberRecord,userProfile,managerLp){
document.getElementById("change-member-password").addEventListener("click",()=>{

    const messageToDisplay = "Are sure you want to chenge your password?";
    displayOrCloseDialog(messageToDisplay);
    // get continueEdit from the dialogue
    const confirmChangeEl = document.getElementById("continueEdit");
        
    // get memberProfileDialog from the dialogue
    const showDialogueEl = document.getElementById("memberProfileDialog");
    // add click event to dialogue continue button to perfom action
    confirmChangeEl.onclick = () => {
    showDialogueEl.close(); // close modal before beforming the required action
// Hide the profile page
    const hideProfileEL = document.getElementById("hideMemberProfile");
    hideProfileEL.classList.toggle("hideMemberProfile");

    profileContaineEl.innerHTML +=
     `<div class="d-flex justify-content-center align-items-center">
    
        <div class="p-2 shadow-sm">
            <form id="passwordChangeForm" novalidate>
                
                <div class="mb-3">
                    <label for="currentPassword" class="form-label">Current Password</label>
                    <div class="input-group">
                        <input type="password" class="form-control" id="currentPassword" name="currentPassword" required minlength="6">
                        <span class="input-group-text password-toggle" id="current-password">
                            <i class="fas fa-eye" id="eyeCurrent"></i>
                        </span>
                    </div>
                    <div class="invalid-feedback">Current password is required.</div>
                </div>

                <div class="mb-3">
                    <label for="newPassword" class="form-label">New Password</label>
                    <div class="input-group">
                        <input type="password" class="form-control" id="newPassword" name="newPassword" required minlength="6">
                        <span class="input-group-text password-toggle" id="new-password">
                            <i class="fas fa-eye" id="eyeNew"></i>
                        </span>
                    </div>
                    <div class="invalid-feedback">New password must be at least 6 characters.</div>
                </div>

                <div class="mb-3">
                    <label for="confirmPassword" class="form-label">Confirm New Password</label>
                    <div class="input-group">
                        <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" required minlength="6">
                        <span class="input-group-text password-toggle" id="confirm-password">
                            <i class="fas fa-eye" id="eyeConfirm"></i>
                        </span>
                    </div>
                    <div class="invalid-feedback">Passwords must match.</div>
                </div>

                <button type="submit" class="btn btn-primary w-100">Change Password</button>
            </form>
        </div>
    </div>`
    validatePassword(findMemberRecord,userProfile,managerLp); // Call validate password
    
    togglePassword();// Call the function to activate event listeners
    }
})
}


// Toggle password visibility
function togglePassword() {
    document.querySelectorAll(".input-group-text").forEach((el) => {
        el.addEventListener("click", () => {
            // Get the associated input field and eye icon dynamically
            let input = el.previousElementSibling; // Input field is before the span
            let eyeIcon = el.querySelector("i"); // Find the <i> inside the span

            if (input.type === "password") {
                input.type = "text";
                eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
            } else {
                input.type = "password";
                eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
            }
        });
    });
}



// Form validation and password match check
function validatePassword(findMemberRecord,userProfile,managerLp){
document.getElementById("passwordChangeForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    const form = document.getElementById("passwordChangeForm"); 
    const currentPassword = document.getElementById("currentPassword");
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword");
    console.log(findMemberRecord.userPassword)
    // Check password match
    if (findMemberRecord.userPassword === currentPassword.value) {
        
        if (newPassword !== confirmPassword.value) {
            confirmPassword.setCustomValidity("Passwords do not match.");
        } else {
            confirmPassword.setCustomValidity("");
        }

        if (form.checkValidity()) {
            findMemberRecord.userPassword = newPassword; // Change the password
            localStorage.setItem("members", JSON.stringify(allProfile)); // Save password in local storage
            alert("Password changed successfully!"); // Replace with actual logic
            form.submit(); 
            renderProfilePage(userProfile,managerLp); //Calling renderProfilePage
        }

    } else {
        currentPassword.setCustomValidity("Incorrect current password.");
    }

    form.classList.add("was-validated"); // Bootstrap styling
})
}

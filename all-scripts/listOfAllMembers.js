import { 
  changeColor, 
  getFromLocalStorage, 
  setItemInLocalStorage 
} from './manager.js';

// Get Data from LocalStorage
const allMembers = getFromLocalStorage("members") || [];
const membersListEl = document.getElementById("membersList");
const uploadFileEl = document.getElementById("members-container");

// Event Listener for Displaying Member List
membersListEl.addEventListener("click", () => displayMemberList(allMembers, "10698"));

// Function to Display Member List
function displayMemberList(allMembers, memberLp, removed) {
  changeColor("membersList", "blue", "white");
  changeColor("allMembers-loan", "white", "green");
  changeColor("members-deduction", "white", "green");
  changeColor("upload", "white", "green");

  uploadFileEl.innerHTML = `
      <div class="container">
          <div class="row justify-content-center">
              <div class="col-lg-8 col-md-10 col-sm-12">
                  <div class="all-members-list card shadow-lg p-3" id="all-members-list">
                      <div class="card-header bg-dark text-white">
                          <div class="d-flex justify-content-between">
                              <span>LP NUMBER</span>
                              <span>NAME</span>
                              <span>STATUS</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>`;

  populateMemberList(allMembers, memberLp,removed);
}

// Populate Member List with Data
function populateMemberList(allMembers, memberLp,removed) {
  const allMembersList = document.getElementById("all-members-list");
  let htmlContent = '';

  updateMemberStatus(memberLp,removed);

  const managerList = getFromLocalStorage("managerRecord") || [];

  allMembers.forEach((member) => {
      let status = managerList.some(manager => member.lpNumber === manager.lpNumber) ? "Manager" : "Member";
      htmlContent += `
          <div class="each-member d-flex justify-content-between border-bottom py-2 px-3" id="${member.lpNumber}">
              <span class="text-primary">${member.lpNumber}</span>
              <span>${member.name}</span>
              <span class="${member.lpNumber} badge ${status === "Manager" ? "bg-success" : "bg-secondary"}">${status}</span>
          </div>`;
  });

  allMembersList.innerHTML += htmlContent;
  attachMemberEventListeners();
}

// Function to Promote a Member to Manager
export function updateMemberStatus(memberLp, removed = "No") {
    let managerRecord = getFromLocalStorage("managerRecord") || [];

    // If the manager is already removed, do nothing
    if (removed !== "Yes") {
        // Add member only if not already in the list
        if (!managerRecord.some(manager => manager.lpNumber === memberLp)) {
            managerRecord.push({ lpNumber: memberLp });
            setItemInLocalStorage("managerRecord", managerRecord);
        }
    }
}


// Attach Click Event to Member Elements
function attachMemberEventListeners() {
  document.querySelectorAll(".each-member").forEach(member => {
      member.addEventListener("click", () => displayProfile(member));
  });
}

// Function to Display Member Profile
function displayProfile(selected) {
  const memberRecord = getFromLocalStorage("members") || [];
  const findSelectedLp = memberRecord.find(record => selected.id === record.lpNumber);

  if (findSelectedLp) {
      uploadFileEl.innerHTML = generateProfileHTML(findSelectedLp);
      initializeProfileActions(findSelectedLp);
  }
}

// Generate Member Profile HTML
function generateProfileHTML(member) {
  return `
      <div class="profileDisplay" id="profileDisplay">
          <div class="member-profile">
              <h1>Profile: <span></span></h1>
              <span class="show-member" id="editProfile">Edit Profile</span>
          </div>
          <div class="personalDetails">
              <h2>Bio Data:</h2>
              <span class="show-member" id="${member.lpNumber}">Change Status</span>
              <dialog id="confirmationDialog">
                  <p id="actionToPeform" class="text-center"></p>
                  <div class="decide">
                      <button class="btn btn-cancel btn-danger" id="cancelAction">Cancel</button>
                      <button class="btn btn-continue btn-primary" id="continueAction">Continue</button>
                  </div>
              </dialog>
          </div>
          <div class="member-profile">
              <p>Name: <span id="profileName">${member.name}</span></p>
              <p>Phone: <span id="profilePhone">${member.phone}</span></p>
          </div>
          <div class="member-profile">
              <p>Email: <span id="profileEmail">${member.email}</span></p>
              <p>Date Joined: <span id="dateJoined">${member.dateJoined}</span></p>
          </div>
          <h2 class="profileAccount">Account</h2>
          <div class="member-profile">
              <p>Shares: <span id="share-capital">${member.shareCapital}</span></p>
              <p>Monthly Savings: <span id="profile-amount">${member.monthlySaving}</span></p>
          </div>
          <div class="member-profile">
              <p>Bank: <span id="profile-bank">${member.userBank}</span></p>
              <p>Account number: <span id="profile-acc-number">${member.bankAccount}</span></p>
          </div>
          <h2 class="nextOfkin">Next of Kin</h2>
          <div class="member-profile">
              <p>Name: <span id="next-of-kin-name">${member.nextOfKin}</span></p>
              <p>Phone: <span id="next-of-kin-tel">${member.nextOfKinContact}</span></p>
          </div>
          <div class="resetPasswordMessage text-center p-3 m-3 bg-light text-success rounded hide" id="reset-password-message"></div>
          <div class="downloadTransaction">
              <button>Download Transactions</button>
              <button id="password">Reset password</button>
          </div>
      </div>`;
}

// Initialize Profile Actions
function initializeProfileActions(member) {
  document.getElementById(member.lpNumber).addEventListener("click", () => switchMemberStatus(member));
  document.getElementById("editProfile").addEventListener("click", () => editProfile(member));
  document.getElementById("password").addEventListener("click", () => resetPassword(member));
}

// Function to Switch Member Status
function switchMemberStatus(member) {
  showDialog(
      "Are you sure you want to change this member's status?",
      () => toggleMemberStatus(member)
  );
}

// Toggle Member Status
function toggleMemberStatus(member) {
  let managerRecord = getFromLocalStorage("managerRecord") || [];
  const indexCorrect = managerRecord.find(profile => profile.lpNumber === member.lpNumber);
  console.log(member.lpNumber);
 
  const index = managerRecord.findIndex(profile => parseFloat(profile.lpNumber) === parseFloat(member.lpNumber));
  console.log("Show the index",index)

  if (index !== -1) {
      managerRecord.splice(index, 1);
      
  } else {
      managerRecord.push({ lpNumber: member.lpNumber });
      
  }

  setItemInLocalStorage("managerRecord", managerRecord);
  displayMemberList(allMembers, member.lpNumber, "Yes");
}

// Function to reset password
function resetPassword(member) {
    showDialog(
        "Are you sure you want to reset this member's password?",
        () => {
            let memberRecord = getFromLocalStorage("members") || [];

            // Find the member by lpNumber
            const memberIndex = memberRecord.findIndex(reset => reset.lpNumber === member.lpNumber);
            
            if (memberIndex !== -1) {
                memberRecord[memberIndex].userPassword = "wlmpcs123"; // Reset password
                setItemInLocalStorage("members", memberRecord);

                // Show success message
                const resetPasswordMessage = document.getElementById("reset-password-message");
                resetPasswordMessage.textContent = "Password reset successful! Default password: 'wlmpcs123'";
                resetPasswordMessage.classList.remove("hide");

                console.log(`Password reset for member ${member.lpNumber}`);
            } else {
                console.error("Member not found");
            }
        }
    );
}


// Edit Profile Function
function editProfile(member) {
  showDialog(
      "Are you sure you want to edit this member's details?",
      () => {
          displayFormToEdit(member);
          console.log("Opening edit form..."); // Implement form logic here
      }
  );
}

// Show Confirmation Dialog
function showDialog(message, callback) {
  document.getElementById("actionToPeform").textContent = message;
  const dialog = document.getElementById("confirmationDialog");

  dialog.showModal();
  document.getElementById("cancelAction").onclick = () => dialog.close();
  document.getElementById("continueAction").onclick = () => {
      dialog.close();
      callback();
  };
}

// display the editable page
     
function displayFormToEdit(member){
document.getElementById("profileDisplay").classList.add("hide");

let hideEditForm = ""
uploadFileEl.innerHTML += `

     <div id="edit-members-record" class="editMembersRecord ${hideEditForm} container">
     <dialog id="edit-dialog" class="modal-dialog-centered">
         <p id="actionToPeform" class="text-center">Are you sure you want to submit the changes?</p>
         <div class="d-flex justify-content-between">
             <button class="btn btn-danger w-50 mx-2" id="edit-cancelAction">Cancel</button>
             <button class="btn btn-success w-50 mx-2" id="edit-continueAction">Continue</button>
         </div>
     </dialog>

     <form id="edit-form" action="" class="p-4 bg-light shadow-lg rounded">
         <h4 class="text-center text-primary mb-3">Edit Member Details</h4>

         <div class="mb-3">
             <label for="edit-lp" class="form-label">LP Number</label>
             <input id="edit-lp" type="text" class="form-control" placeholder="Your Lp Number" name="edit-lp" required>
         </div>

         <div class="mb-3">
             <label for="edit-name" class="form-label">Name</label>
             <input id="edit-name" type="text" class="form-control" placeholder="Your Name" required name="name" autocomplete="name">
         </div>

         <div class="mb-3">
             <label for="editPhone" class="form-label">Phone Number</label>
             <input id="editPhone" type="tel" class="form-control" placeholder="Your Phone Number" required name="phone" autocomplete="tel">
         </div>

         <div class="mb-3">
             <label for="edit-email" class="form-label">E-mail</label>
             <input id="edit-email" type="email" class="form-control" placeholder="Your E-mail" required name="email" autocomplete="email">
         </div>

         <div class="mb-3">
             <label for="edit-savingAmount" class="form-label">Savings Amount</label>
             <input id="edit-savingAmount" type="number" class="form-control" placeholder="Amount" required name="savingAmount">
         </div>

         <div class="mb-3">
             <label for="edit-bank" class="form-label">Bank</label>
             <input id="edit-bank" type="text" class="form-control" placeholder="Your Bank" required name="bank">
         </div>

         <div class="mb-3">
             <label for="edit-accountNumber" class="form-label">Account Number</label>
             <input id="edit-accountNumber" type="number" class="form-control" placeholder="Your Account Number" required name="accountNumber">
         </div>

         <div class="mb-3">
             <label for="edit-nextOfKin" class="form-label">Next of Kin Name</label>
             <input id="edit-nextOfKin" type="text" class="form-control" placeholder="Your Next of Kin" required name="nextOfKin">
         </div>

         <div class="mb-3">
             <label for="edit-nextOfKin-phone" class="form-label">Next of Kin Phone Number</label>
             <input id="edit-nextOfKin-phone" type="tel" class="form-control" placeholder="Next of Kin Phone" required name="nextOfKinPhone" autocomplete="tel">
         </div>

         <div id="changesEffected" class="text-success fw-bold text-center"></div>

         <button id="save-changes" type="submit" class="btn btn-primary w-100 mt-3 saveChanges">Save Changes</button>
     </form>
 </div>`
 showOldData(allMembers,member);
 }

 // Display members previous data to edit
  function showOldData(allMembers,member){
    document.getElementById("edit-lp").value = member.lpNumber;
    document.getElementById("edit-name").value = member.name;
    document.getElementById("editPhone").value = member.phone;
    document.getElementById("edit-email").value = member.email;
    document.getElementById("edit-savingAmount").value = member.monthlySaving;
    document.getElementById("edit-bank").value = member.userBank;
    document.getElementById("edit-accountNumber").value = member.bankAccount;
    document.getElementById("edit-nextOfKin").value = member.nextOfKin;
    document.getElementById("edit-nextOfKin-phone").value = member.nextOfKinContact;

    saveChanges(allMembers,member);
  }

// Function to save changes made
 function saveChanges(allMembers,member){
  document.getElementById("edit-form").addEventListener("submit", (e)=>{
    e.preventDefault();
    const tobeEdited = allMembers.find((toBeEdited) => toBeEdited.lpNumber === member.lpNumber)
   
    tobeEdited.lpNumber = document.getElementById("edit-lp").value;
    tobeEdited.name = document.getElementById("edit-name").value;
    tobeEdited.phone = document.getElementById("editPhone").value;
    tobeEdited.email = document.getElementById("edit-email").value;
    tobeEdited.monthlySaving = document.getElementById("edit-savingAmount").value;
    tobeEdited.userBank = document.getElementById("edit-bank").value;
    tobeEdited.bankAccount = document.getElementById("edit-accountNumber").value;
    tobeEdited.nextOfKin = document.getElementById("edit-nextOfKin").value;
    tobeEdited.nextOfKinContact = document.getElementById("edit-nextOfKin-phone").value;

    
    setItemInLocalStorage("members", allMembers);
    
    uploadFileEl.innerHTML = generateProfileHTML(tobeEdited);
    initializeProfileActions(tobeEdited);
    
  })
  
 }
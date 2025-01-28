import { changeColor, getFromLocalStorage, setItemInLocalStorage} from './manager.js';

// Get data fro LocalStorage
const allMembers = getFromLocalStorage("members") || [];

const membersListEl = document.getElementById("membersList");
const uploadFileEl = document.getElementById("members-container");

// Function to Display List of all members
const displayMemberList = (allMembers,membersLp) => {
membersListEl.addEventListener("click", () => {
changeColor("membersList","blue", "white");
changeColor("allMembers-loan","white", "green");
changeColor("members-deduction","white", "green");
changeColor("upload","white", "green");

    uploadFileEl.innerHTML =`<div class="all-members-list" id="all-members-list">
    
                <div class="member-list-heading"><div class="memberListSpan"><span>LP NUMBER</span><span>NAME</span><span>STATUS</span></div></div>
                
            </div>`  
            getAllMember(allMembers,membersLp); 
})
}

displayMemberList(allMembers,"10698"); // calling displayMemberList function


//  Function to display members list
const getAllMember = (allMembers, memberLp) => {
  const allMembersList = document.getElementById("all-members-list");
  let htmlContent = '';
  changeMemberStatus(memberLp);
  // Fetch managerList from local storage
  const managerList = getFromLocalStorage("managerRecord");
  console.log(managerList);

  // Iterate through all members
  allMembers.forEach((member) => {
      // Determine status for each member
      let status = "Member"; // Default to "Member"
      
      managerList.forEach((manager) => {
          if (member.lpNumber === manager.lpNumber) {
              status = "Manager"; // Update status if member matches a manager
          }
      });
      
      // Generate HTML content for the current member
      htmlContent += `
          <div class="each-member" id="${member.lpNumber}">
              <span>${member.lpNumber}</span>
              <span>${member.name}</span>
              <span class="${member.lpNumber}">${status}</span>
          </div>`;
  });
  
  // Append the generated HTML to the container
  allMembersList.innerHTML += htmlContent;
  
  // Link to members page by calling linkToMembersPage function
  linkToMembersPage();
};



// Function to upgrade member status to Manager          
export const changeMemberStatus = (memberLp) => {
  
    let allManager = {
      lpNumber: memberLp,
    };
  
    // Retrieve the manager record from local storage or initialize an empty array
    let managerRecord = getFromLocalStorage("managerRecord") || [];
    
  
    // Check if the manager already exists in the record
    const findManager = managerRecord.find((manager) => manager.lpNumber === memberLp);
  
    // Add the manager if not already present
    if (!findManager) {
      managerRecord.push(allManager);
    
    // Save the updated record to local storage
    setItemInLocalStorage("managerRecord", managerRecord);
    } 
    
  };
  

  // Fuction to add Event Listener to Members Elelement
  const linkToMembersPage = () => {
    const memberClassEl = document.querySelectorAll(".each-member");
    memberClassEl.forEach((member) => {
      member.addEventListener("click", () => {
        displayProfile(member);
      })
    })
  }


// Function to display member page from mangers Portal
const displayProfile = (selected) => {

const memberRecord = getFromLocalStorage("members") || []; // Retrieve managerRecord from storage
const findSelectedLp = memberRecord.find((record) => selected.id === record.lpNumber) // Find selected member in members record
console.log(findSelectedLp)

if (memberRecord && findSelectedLp){
   
uploadFileEl.innerHTML = ` <div class="profileDisplay" id="profileDisplay">
            <div class="member-profile"><h1>Profile:<span></span></h1><Span class="show-member" id="editProfile">Edit Profile</Span></div>
            <div class="personalDetails">
            <h2>Bio Data</h2>
            <span class="show-member" id="${findSelectedLp.lpNumber}">Change Status</span>
            <dialog id="confirmationDialog">
            <p id="actionToPeform"></p>
            <div class="decide">
            <button class="btn btn-cancel" id="cancelAction">Cancel</button>
            <button class="btn btn-continue" id="continueAction">Continue</button>
            </div>
            </dialog>
            </div>
            <div class="member-profile"><p>Name: <span id="proileName">${findSelectedLp.name}</span></p>
            <p>Phone: <span id="profilePhone">${findSelectedLp.phone}</span></p></div>
 <div class="member-profile"><p>Email: <span id="profileEmail">${findSelectedLp.email}</span></p>
            <p>Date Joined: <span id="dateJoined">${findSelectedLp.dateJoined}</span></p></div>
            <h2 class="profileAccount">Account</h2>
             <div class="member-profile"><p>Shares: <span id="share-capital">${findSelectedLp.shareCapital}</span></p>
            <p>Monthly Savings: <span id="profile-amount">${findSelectedLp.monthlySaving}</span></p></div>
            <div class="member-profile"> <p>Bank: <span id="profile-bank">${findSelectedLp.userBank}</span></p>
            <p>Account number: <span id="profile-acc-number">${findSelectedLp.bankAccount}</span></p></div>
            <h2 class="nextOfkin">Next of Kin</h2>
            <div class="member-profile"> <p>Name: <span id="next-of-kin-name">${findSelectedLp.nextOfKin}</span></p>
            <p>Phone: <span id="next-of-kin-tel">${findSelectedLp.nextOfKinContact}</span></p></div>
            <div class="resetPasswordMessage" id="reset-password-message"></div>
            <div class="downloadTransaction"><button>Download Transactions</button><button id="password">Reset password</button></div>
            </div>`;
            
            switchStatus(findSelectedLp); // calling switchStatus function
            editProfile(findSelectedLp,memberRecord);  // calling editProfile function
            changePassword(findSelectedLp);  // calling changePassword function
}

    }


  // Function to switch members status
  const switchStatus = (findSelectedLp) => {
    document.getElementById(findSelectedLp.lpNumber).addEventListener("click", () => {
      // Message to display in dialogue box.
    const messageToDisplay ="Are you sure you want to Chenge this member's status?"; 
    // Calling message to display function
    didplayOrCloseDialogue(messageToDisplay);
    // get continueAction from the dialogue
    const ConfirmChangeEl = document.getElementById("continueAction");
    // get confirmationDialog from the dialogue
    const showDialogueEl = document.getElementById("confirmationDialog");
    // add click event to dialogue continue button to perfom action
    ConfirmChangeEl.onclick = () => {
    showDialogueEl.close(); // close modal before beforming the required action

    // Retrieve manageStatus from Local Storage
     let manageStatus = getFromLocalStorage("managerRecord") || []


      // check if the selected member is in manageStatus array
     const index = manageStatus.findIndex((profile) => profile.lpNumber === findSelectedLp.lpNumber);
     
      
      if (index !== -1){
          manageStatus.splice(index,1);
          console.log("Check",manageStatus)
          // Save the manageStatus to local storage
          setItemInLocalStorage("managerRecord", manageStatus);
          displayMemberList(allMembers);
          
      } else {
      manageStatus.push({lpNumber:findSelectedLp.lpNumber});
      setItemInLocalStorage("managerRecord", manageStatus);
      displayMemberList(allMembers, findSelectedLp.lpNumber);
      }

    }
    })     
  };

  

  // Function to edit profile
  const editProfile = (findSelectedLp,memberRecord,hideProfileEL) => {
    
    // add event listener to the edit element
    document.getElementById("editProfile").addEventListener("click", () => {
      // Message to display in dialogue box.
    const messageToDisplay ="Are you sure you want to edit this members's details ?"; 
    // Calling message to display function
    didplayOrCloseDialogue(messageToDisplay);
    // get continueAction from the dialogue
    const ConfirmChangeEl = document.getElementById("continueAction");
    
    // get confirmationDialog from the dialogue
    const showDialogueEl = document.getElementById("confirmationDialog");
    // add click event to dialogue continue button to perfom action
    ConfirmChangeEl.onclick = () => {
    showDialogueEl.close(); // close modal before beforming the required action

    // Hide the profile page
     const hideProfileEL = document.getElementById("profileDisplay");
     hideProfileEL.classList.toggle("hideProfile");

     uploadFileEl.innerHTML += ` <dialog id="confirmationDialog">
            <p id="actionToPeform"></p>
            <div class="decide">
            <button class="btn btn-cancel" id="cancelAction">Cancel</button>
            <button class="btn btn-continue" id="continueAction">Continue</button>
            </div>
            </dialog>`;
      
    const indexToEdit = memberRecord.indexOf(findSelectedLp); // Find Record to edit

     let {name,lpNumber,phone,email,monthlySaving,userBank,bankAccount,nextOfKin,nextOfKinContact} = memberRecord[indexToEdit];
     
     // display the input page for correction
     
     const hideEditForm = "";
     uploadFileEl.innerHTML += `
     
     <div id="edit-members-record" class="editMembersRecord ${hideEditForm}">
     <dialog id="edit-dialog">
            <p id="actionToPeform">Are you sure you want to submit the changes?</p>
            <div class="editDecide">
            <button class="btn btn-cancel" id="edit-cancelAction">Cancel</button>
            <button class="btn btn-continue" id="edit-continueAction">Continue</button>
            </div>
      </dialog>
     <form id="edit-form" action="" >
                   <label for="edit-lp">LP Number</label>
                    <input id="edit-lp" type="text" placeholder="Your Lp Number" name="edit-lp" required>

                    <label for="edit-name">Name</label>
                    <input id="edit-name" type="text" placeholder="Your Name" required name="name" autocomplete="name">

                    <label for="editPhone">Phone Number</label>
                    <input id="editPhone" type="tel" placeholder="Your Phone Number" required name="phone" autocomplete="tel">

                    <label for="edit-email">E-mail</label>
                    <input id="edit-email" type="email" placeholder="Your E-mail" required name="email" autocomplete="email">

                    <label for="edit-savingAmount">Savings Amount</label>
                    <input id="edit-savingAmount" type="number" placeholder="Amount" required name="savingAmount">

                    <label for="edit-bank">Bank</label>
                    <input id="edit-bank" type="text" placeholder="Your Bank" required name="bank">

                    <label for="edit-accountNumber">Account Number</label>
                    <input id="edit-accountNumber" type="number" placeholder="Your Account Number" required name="accountNumber">

                    <label for="edit-nextOfKin">Next of Kin Name</label>
                    <input id="edit-nextOfKin" type="text" placeholder="Your Next of Kin" required name="nextOfKin">

                    <label for="edit-nextOfKin-phone">Next of Kin Phone Number</label>
                    <input id="edit-nextOfKin-phone" type="tel" placeholder="Next of Kin Phone" required name="nextOfKinPhone" autocomplete="tel">

                    <div class="changesEffected" id="changesEffected"></div>
                    <button id="save-changes" type="submit">Save Changes</button>
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
     saveChanges(memberRecord,indexToEdit) // Calling the save changes
    }

    })

  }

  
// Function to open and close dialogue box
  const didplayOrCloseDialogue = (messageToDisplay) => {
    // get the actionToPeform element from the DOM
    const actionToPeformEl = document.getElementById("actionToPeform");
    
    // Update the text content of the P element of the dialogue box
    actionToPeformEl.textContent = messageToDisplay;  
    // Get dialogue elements from DOM
    const showDialogueEl = document.getElementById("confirmationDialog");
    
    const declineChangeEl = document.getElementById("cancelAction");
     
    // Display dialogue box
    showDialogueEl.showModal();

   // add click event to close the dialogue box
    declineChangeEl.onclick = () => {
      showDialogueEl.close();
    }
  }


  // Function to save the changes made to the members details
  const saveChanges = (memberRecord,indexToEdit) => {
  
  const formElb = document.getElementById("edit-form");
  formElb.addEventListener("submit", (e) => {
    e.preventDefault(); 
    
    // Get dialogue elements from DOM
    const showDialogueEl = document.getElementById("edit-dialog");
    
    const declineChangeEl = document.getElementById("edit-cancelAction");
    const ConfirmChangeEl = document.getElementById("edit-continueAction");
     
    // Display dialogue box
    showDialogueEl.showModal();

   // add click event to close the dialogue box
    declineChangeEl.onclick = () => {
      showDialogueEl.close();
    }
    ConfirmChangeEl.onclick = () => {
    showDialogueEl.close(); // close modal before beforming the required action

    memberRecord[indexToEdit].name = document.getElementById("edit-name").value;  
    memberRecord[indexToEdit].lpNumber = document.getElementById("edit-lp").value;  
    memberRecord[indexToEdit].phone = document.getElementById("editPhone").value;  
    memberRecord[indexToEdit].monthlySaving = document.getElementById("edit-savingAmount").value;  
    memberRecord[indexToEdit].userBank = document.getElementById("edit-bank").value;  
    memberRecord[indexToEdit].bankAccount = document.getElementById("edit-accountNumber").value;  
    memberRecord[indexToEdit].email = document.getElementById("edit-email").value;  
    memberRecord[indexToEdit].nextOfKin = document.getElementById("edit-nextOfKin").value;  
    memberRecord[indexToEdit].nextOfKinContact = document.getElementById("edit-nextOfKin-phone").value; 
    setItemInLocalStorage("members", memberRecord);

    regenerateprofile(indexToEdit)

    }
});
}


//Function to regenerate member profile page
const regenerateprofile = (indexToEdit) => {
  // Get all members record from local storage
  const newAllmember = getFromLocalStorage("members") || []

  // Get member to profile from newAllmember variable
  const profiledMemeber = newAllmember[indexToEdit];
  // Regenerate the profile
  uploadFileEl.innerHTML = ` <div class="profileDisplay" id="profileDisplay">
            <div class="member-profile"><h1>Profile:<span></span></h1><Span class="show-member" id="editProfile">Edit Profile</Span></div>
            <div class="personalDetails">
            <h2>Bio Data</h2>
            <span class="show-member" id="${profiledMemeber.lpNumber}">Change Status</span>
            <dialog id="confirmationDialog">
            <p id="actionToPeform"></p>
            <div class="decide">
            <button class="btn btn-cancel" id="cancelAction">Cancel</button>
            <button class="btn btn-continue" id="continueAction">Continue</button>
            </div>
            </dialog>
            </div>
            <div class="member-profile"><p>Name: <span id="proileName">${profiledMemeber.name}</span></p>
            <p>Phone: <span id="profilePhone">${profiledMemeber.phone}</span></p></div>
 <div class="member-profile"><p>Email: <span id="profileEmail">${profiledMemeber.email}</span></p>
            <p>Date Joined: <span id="dateJoined">${profiledMemeber.dateJoined}</span></p></div>
            <h2 class="profileAccount">Account</h2>
             <div class="member-profile"><p>Shares: <span id="share-capital">${profiledMemeber.shareCapital}</span></p>
            <p>Monthly Savings: <span id="profile-amount">${profiledMemeber.monthlySaving}</span></p></div>
            <div class="member-profile"> <p>Bank: <span id="profile-bank">${profiledMemeber.userBank}</span></p>
            <p>Account number: <span id="profile-acc-number">${profiledMemeber.bankAccount}</span></p></div>
            <h2 class="nextOfkin">Next of Kin</h2>
            <div class="member-profile"> <p>Name: <span id="next-of-kin-name">${profiledMemeber.nextOfKin}</span></p>
            <p>Phone: <span id="next-of-kin-tel">${profiledMemeber.nextOfKinContact}</span></p></div>
            <div class="resetMessage" id="reset-password-message"></div>
            <div class="downloadTransaction"><button>Download Transactions</button><button id="password">Reset password</button></div>
            </div>`;
            
            switchStatus(profiledMemeber); // calling switchStatus function
            editProfile(profiledMemeber,newAllmember);  // calling editProfile function
            changePassword(profiledMemeber);  // calling changePassword function
}

// Function to change password

const changePassword = (passwordOwner) => {
 const changePasswordEl = document.getElementById("password");
 changePasswordEl.addEventListener("click", () => {

  const messageToDisplay ="Are you sure you want to edit this members's password? ?"; 
  
 

 // Get the P elements of the two dialogue box
 const dialoguePEl = document.getElementById("actionToPeform");

 // Update the textContent of the P element
 dialoguePEl.textContent = messageToDisplay;
 // Get dialogue elements from DOM
 const showDialogueEl = document.getElementById("edit-dialog") || document.getElementById("confirmationDialog");
 const declineChangeEl = document.getElementById("edit-cancelAction") || document.getElementById("cancelAction");
 const ConfirmChangeEl = document.getElementById("edit-continueAction") || document.getElementById("continueAction");
  
 // Display dialogue box
 showDialogueEl.showModal();

// add click event to close the dialogue box
 declineChangeEl.onclick = () => {
   showDialogueEl.close();
 }

 ConfirmChangeEl.onclick = () => {
  showDialogueEl.close(); // close modal before beforming the required action

  const memberRecordwithPassword = getFromLocalStorage("members") || []; // Retrieve managerRecord from storage
  const findSelectedLpWithPassword = memberRecordwithPassword.find((record) => passwordOwner.lpNumber === record.lpNumber) // Find selected member in members record
  findSelectedLpWithPassword.userPassword = "password123" // Chenge the password to password123
  setItemInLocalStorage("members", memberRecordwithPassword); // Save the record back to local storage

  const passwordMessageEl = document.getElementById("reset-password-message")
  passwordMessageEl.textContent = "Password Reset Successful. New password: password123"
  passwordMessageEl.classList.add("resetSuccessMessage");
  }
 })
}
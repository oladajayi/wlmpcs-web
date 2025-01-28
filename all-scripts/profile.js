
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


const userProfile = JSON.parse(localStorage.getItem("currentUser")); // Retrieve current user from storage
const managerLp = JSON.parse(localStorage.getItem("managerRecord")) || []; // Retrieve managerRecord from storage
let profileStatus = ""
let changeClass = "memberStatus"

managerLp.forEach((findManager) => {
if (findManager.lpNumber === userProfile.lpNumber){
    profileStatus = "MANAGER";
    changeClass = "manager";
} else{
    profileStatus = "";
}
}  )

const profileContaineEl = document.getElementById("profile-container");
if (userProfile){
 profileContaineEl.innerHTML = `<div class="backMembers"><a href="members.html"><button>Back</button></a></div>
            <div class="profile"><h1>Profile:<span></span></h1><Span class="edit-profile">Edit Profile</Span></div>
            <div class="personal"><h2>Bio Data</h2><span class="${changeClass}" id="${userProfile.lpNumber}">${profileStatus}</span></div>
            <p>Name: <span id="proile-name">${userProfile.name}</span></p>
            <p>Phone: <span id="profile-phone">${userProfile.phone}</span></p>
            <p>Email: <span id="profile-email">${userProfile.email}</span></p>
            <p>Date Joined: <span id="date-joined">${userProfile.dateJoined}</span></p>
            <h2 class="profile-account">Account</h2>
            <p>Shares: <span id="share-capital">${userProfile.shareCapital}</span></p>
            <p>Monthly Savings: <span id="profile-amount">${userProfile.monthlySaving}</span></p>
            <p>Bank: <span id="profile-bank">${userProfile.userBank}</span></p>
            <p>Account number: <span id="profile-acc-number">${userProfile.bankAccount}</span></p>
            <h2 class="next-of-kin">Next of Kin</h2>
            <p>Name: <span id="next-of-kin-name">${userProfile.nextOfKin}</span></p>
            <p>Phone: <span id="next-of-kin-tel">${userProfile.nextOfKinContact}</span></p>
            <div class="generate-savings"><button>Generate Savings Form</button><button>Change password</button></div>`;

            if(userProfile && profileContaineEl){
                const mangerEl = document.getElementById(userProfile.lpNumber);
                if (mangerEl.textContent === "MANAGER"){
                mangerEl.addEventListener("click", () => {
                    window.location.href = "../wlmpcshtml/manager.html";
                })
            } 
        }
    }
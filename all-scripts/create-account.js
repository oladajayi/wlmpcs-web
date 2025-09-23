const formElement = document.getElementById("mpcs-form");
const lpNumberEl = document.getElementById("lp-number");
const nameEl = document.getElementById("name");
const userPhoneEl = document.getElementById("phone-number");
const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");
const confirmPasswordEl = document.getElementById("confirm-password");
const savingAmountEl = document.getElementById("savings-amount");
const bankEl = document.getElementById("bank");
const accountNumberEl = document.getElementById("account-number");
const nextOfKinNameEl = document.getElementById("next-of-kin");
const nextOfKinPhoneEl = document.getElementById("next-of-kin-phone-number");
const passwordmatchEl = document.getElementById("not-match");
const submitEl = document.getElementById("not-match");

let userAccounts =[];
const regex =/[a-z]/gi;

// Getting current date
const dateToday = new Date().toLocaleDateString("en-NG", {
  timeZone: "Africa/Lagos",
  weekday: "short", 
  day: "numeric",   
  month: "short",   
  year: "numeric",  
});
  

  const cleanInput = () => {
    if (lpNumberEl.value === isNaN){
      lpNumberEl.setCustomValidity("Your Lp number should be only digits");
    } else if (userPhoneEl.value === isNaN){
      userPhoneEl.setCustomValidity("Enter a valid phone number");
    } else if (nextOfKinPhoneEl.value === isNaN){
      nextOfKinPhoneEl.setCustomValidity("Enter a valid phone number");
    } 
  };

  cleanInput();
  
  confirmPasswordEl.addEventListener("input", () => {
    if (passwordEl.value !== confirmPasswordEl.value) {
      confirmPasswordEl.setCustomValidity("Passwords do not match");
      confirmPasswordEl.reportValidity(); 
    } else {
      confirmPasswordEl.setCustomValidity("");
    }
  });

  formElement.addEventListener("submit", (e) => {
    e.preventDefault(); 

    let userData = {
        lpNumber: lpNumberEl.value,
        name: nameEl.value,
        phone: userPhoneEl.value,
        userPassword: passwordEl.value,
        monthlySaving: savingAmountEl.value,
        userBank: bankEl.value,
        bankAccount: accountNumberEl.value,
        nextOfKin: nextOfKinNameEl.value,
        nextOfKinContact: nextOfKinPhoneEl.value,
        email: emailEl.value,
        dateJoined: dateToday,
        normalLoan: 0,
        specialLoan: 0,
        essentialLoan: 0,
        essentialCommodity: 0,
        totalSavings: 0,
        shareCapital: 50000,
    };
console.log("userdata",userData);
    // Ensure savedMembers is always an array
    let savedMembers = JSON.parse(localStorage.getItem('members') || "[]");
    
    if (!Array.isArray(savedMembers)) {
        console.error("Corrupted data in localStorage, resetting to empty array.");
        savedMembers = [];
    }
// check if member alraedy exists
let checkMember = savedMembers.find((record) => record.lpNumber === userData.lpNumber)


    // Add the new user data
    if(checkMember){
      const alreadyRegisteredEl= document.getElementById("alreadyRegistered");
      alreadyRegisteredEl.textContent = "You are an existing user and cannot create an account twice. Please proceed to login if you wish to continue.";
      alreadyRegisteredEl.style.padding = "5px";
      e.target.reset();
      return;
    }else{
      const alreadyRegisteredEl= document.getElementById("alreadyRegistered");
      alreadyRegisteredEl.textContent = " Congratulations! Account created successfully";
      alreadyRegisteredEl.style.color = "green";
      alreadyRegisteredEl.style.backgroundColor = "white";
      savedMembers.push(userData);
      // Save the updated array back to localStorage
    localStorage.setItem('members', JSON.stringify(savedMembers));
    }
    

    // Verify by retrieving and logging
    const retrievedMembers = JSON.parse(localStorage.getItem('members'));
    console.log(retrievedMembers);

    // Reset the form
    e.target.reset();
});
 

  

 


import { toNairaCurrency, getFromLocalStorage, changeColor } from './manager.js';



const dateUploaded = new Date().toLocaleDateString("en-NG", {
    timeZone: "Africa/Lagos",
    weekday: "short", 
    day: "numeric",   
    month: "short",   
    year: "numeric",  
  });

document.getElementById("members-deduction").addEventListener("click", () => {
document.getElementById("confirm-deductions").addEventListener("click", () => {
 changeColor("match-deduction","white", "green");
 changeColor("confirm-deductions","green", "white");
 changeColor("monthly-savings","white", "green");

 let eachRecordEl = document.getElementById("try-it");
let eachRecordHTML ="";

let allMonthlyDeductions = getFromLocalStorage("deduction"); 
 
allMonthlyDeductions.forEach((record) => {
  let lpNumber = record["STAFF ID"];
  let memberName = record["STAFF NAME"];
  let deductionAmount = record.LOAN;

  if (deductionAmount > 0) {
      eachRecordHTML += `
      <div class="container">
          <div class="row justify-content-center">
              <div class="col-12 col-md-8 col-lg-6">
                  <div id="${lpNumber}" class="monthlyDeduction p-3 shadow-sm">
                      <div id="member-deduction" class="memberDeduction">
                          <span>LP${lpNumber}</span>
                          <span class="nameOfMember">${memberName}</span>
                      </div>
                      <span class="formatedDeduction">${toNairaCurrency(deductionAmount)}</span>
                      <div id="unconfirm-deduction" class="memberDeduction">
                          <span class="unconfirm">Unconfirm</span>
                          <span>${dateUploaded}</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>`;
  }
});


eachRecordEl.innerHTML = eachRecordHTML;

  })
})




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

let allMonthlyDeductions = getFromLocalStorage("deduction"); /* JSON.parse(localStorage.getItem('deduction')); */
 
allMonthlyDeductions.forEach((record) => {
    let lpNumber = record["STAFF ID"];
    let memberName = record["STAFF NAME"];
    console.log("lp",lpNumber);
    let deductionAmount = record.LOAN;
    console.log("loan",deductionAmount);
    if( deductionAmount > 0){
    eachRecordHTML += `<div id="${lpNumber}" class="monthlyDeduction">
                <div id="member-deduction" class="memberDeduction"><span>LP${lpNumber}</span><span class="nameOfMember">${memberName}</span></div>
                <span class="formatedDeduction">${toNairaCurrency(deductionAmount)}</span>
                <div id="unconfirm-deduction" class="memberDeduction"><span class="unconfirm">Unconfirm</span><span>${dateUploaded}</span></div>
            </div>`}
})

eachRecordEl.innerHTML = eachRecordHTML;

  })
})




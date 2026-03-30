
alert("hello megha");
let totalBalance=0;
let totalIncome=0;
let totalExpense=0;
let fooditem=0;
let shoppingitem=0;
let travellingitem=0;
let otheruse=0;
let foodlimit=3000;
let shoppinglimit=3000;
let travellimit=1000;
let otherlimit=1000;
 let totalbudget=0;

 function saveData(){
  let data = {
    totalBalance,
    totalIncome,
    totalExpense,
    fooditem,
    shoppingitem,
    travellingitem,
    otheruse,
    totalbudget,
    transactions: document.getElementById("transaction-history").innerHTML
  };

  localStorage.setItem("appData", JSON.stringify(data));
}

function loadData(){
   
  let savedData = JSON.parse(localStorage.getItem("appData"));

  if(savedData){
    totalBalance = savedData.totalBalance;
    totalIncome = savedData.totalIncome;
    totalExpense = savedData.totalExpense;
    fooditem = savedData.fooditem;
    shoppingitem = savedData.shoppingitem;
    travellingitem = savedData.travellingitem;
    otheruse = savedData.otheruse;
    totalbudget = savedData.totalbudget;

    document.getElementById("balance").innerText = totalBalance;
    document.getElementById("income").innerText = totalIncome;
    document.getElementById("expenses").innerText = totalExpense;
    document.getElementById("budgetDisplay").innerText = totalbudget;
     document.getElementById("expenseDisplay").innerText = totalExpense;


    document.getElementById("food-spent").innerText = "Spent:$" + fooditem;
    document.getElementById("shopping-spent").innerText = "Spent:$" + shoppingitem;
    document.getElementById("travel-spent").innerText = "Spent:$" + travellingitem;
    document.getElementById("daily-spent").innerText = "Spent:$" + otheruse;

    document.getElementById("transaction-history").innerHTML = savedData.transactions;

    let deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach(btn => {
      btn.addEventListener("click", function(){
        btn.parentElement.remove();
        saveData();
      });
    });
  }
}
 

 function addmoney() {
    let amount=document.getElementById("amount").value;
    //get amount value
    if(amount === ""||Number(amount)<= 0){
      alert ("Enter valid amount");
      return;
    }
    let type= document.querySelector('input[name="money"]:checked').value;
    //get income or expense value
     let li=document.createElement("li");
     let cat=document.getElementById("category").value;//get category value

    

    if(type=="Income"){
      totalIncome=totalIncome+ Number(amount)//income update code
      totalBalance=totalBalance+ Number(amount)
    }
    else{
      totalExpense=totalExpense+ Number(amount)//expense update code
      totalBalance=totalBalance-Number(amount)
      if(totalExpense > totalbudget){
  alert("Budget exceeded!");
      }
      if(cat==="food"){
      fooditem= fooditem+ Number(amount);
      if(fooditem>foodlimit){
        alert("!foodlimit exceeded");
      }
    }

    if (cat==="shopping"){
      shoppingitem=shoppingitem+ Number(amount);
      if(shoppingitem>shoppinglimit){
        alert("!shopping limit exceeded");
      }
    }
    
    if(cat==="travel"){
      travellingitem=travellingitem+Number(amount);
      if(travellingitem>travellimit){
        alert("!travelling limit exceeded");
      }
    }

    if (cat==="other-use"){
      otheruse=otheruse+ Number(amount);
      if(otheruse>otherlimit){
        alert("!other limit exceeded");
      }
    }
    }
   //amount is in string,number covert string into number
    document.getElementById("balance").innerText= totalBalance;
    document.getElementById("income").innerText= totalIncome;
    document.getElementById("expenses").innerText=totalExpense;
   
  

li.classList.add("transaction");

if(type === "Income"){
  li.classList.add("Incomeclass");
} else {
  li.classList.add("Expensesclass");
}

li.innerHTML = `
  <div class="left">
   
    <p class="category">${type === "Income" ? "Income" : cat}</p>
    <p class="title">${type}</p>
  </div>
  <div class="right">
    ${type === "Income" ? "+" : "-"}${amount}
  </div>
   <button class="delete-btn">del</button>
   `;
let deleteBtn = li.querySelector(".delete-btn");

deleteBtn.addEventListener("click", function() {
   console.log("delete clicked");
    li.remove();
    saveData();
})

    document.getElementById("transaction-history").prepend(li);
    

    document.getElementById("amount").value=""; 
    
   
    document.getElementById("food-spent").innerText= "Spent:"+"$" +fooditem;
    document.getElementById("shopping-spent").innerText=  "Spent:"+ "$" + shoppingitem;
    document.getElementById("travel-spent").innerText= "Spent:" +"$" +travellingitem;
    document.getElementById("daily-spent").innerText= "Spent:" +"$" + otheruse;
    document.getElementById("expenseDisplay").innerText = totalExpense;

    saveData();
}
   

 function setbudget(){
 let input= document.getElementById("budgetinput").value;
  if(input===""||input<=0){
    alert("Enter Valid Number");
    return;
  }
  totalbudget=Number(input);
  document.getElementById("budgetDisplay").innerText=totalbudget;
   document.getElementById("budgetinput").value=""; 
   saveData();
}

loadData();
function resetApp(){
  if(confirm("Are you sure you want to reset?")){
    alert("Resetting app..."); // 👈 confirm ke baad alert
    localStorage.clear();
    location.reload();
  }
  // localStorage clear


  // variables reset
  totalBalance = 0;
  totalIncome = 0;
  totalExpense = 0;
  fooditem = 0;
  shoppingitem = 0;
  travellingitem = 0;
  otheruse = 0;
  totalbudget = 0;

  // UI reset
  document.getElementById("balance").innerText = 0;
  document.getElementById("income").innerText = 0;
  document.getElementById("expenses").innerText = 0;
  document.getElementById("budgetDisplay").innerText = 0;

  document.getElementById("food-spent").innerText = "Spent:$0";
  document.getElementById("shopping-spent").innerText = "Spent:$0";
  document.getElementById("travel-spent").innerText = "Spent:$0";
  document.getElementById("daily-spent").innerText = "Spent:$0";

  document.getElementById("transaction-history").innerHTML = "";

  alert("App Reset Successfully!");
}

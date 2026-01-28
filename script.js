let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function todayDate() {
  return new Date().toISOString().split("T")[0];
}

document.getElementById("date").value = todayDate();

function addExpense() {
  let amount = document.getElementById("amount").value;
  let note = document.getElementById("note").value;
  let date = document.getElementById("date").value || todayDate();

  if (amount === "") {
    alert("Amount likho");
    return;
  }

  expenses.push({
    amount: Number(amount),
    note: note || "Kharcha",
    date: date
  });

  saveAndRefresh();
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  saveAndRefresh();
}

function saveAndRefresh() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  document.getElementById("amount").value = "";
  document.getElementById("note").value = "";
  document.getElementById("date").value = todayDate();
  showExpenses();
}

function showExpenses() {
  let list = document.getElementById("list");
  let total = 0;
  list.innerHTML = "";

  let today = todayDate();

  expenses.forEach((e, index) => {
    if (e.date === today) {
      total += e.amount;

      let li = document.createElement("li");
      li.innerHTML = `
        ₹${e.amount} - ${e.note}
        <button onclick="deleteExpense(${index})">❌</button>
      `;
      list.appendChild(li);
    }
  });

  document.getElementById("total").textContent = "₹" + total;
}

function showMonthlyTotal() {
  let now = new Date();
  let month = now.getMonth();
  let year = now.getFullYear();
  let total = 0;

  expenses.forEach(e => {
    let d = new Date(e.date);
    if (d.getMonth() === month && d.getFullYear() === year) {
      total += e.amount;
    }
  });

  alert("Is mahine ka total kharcha: ₹" + total);
}

showExpenses();

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function addExpense() {
  let amount = document.getElementById("amount").value;
  let note = document.getElementById("note").value;

  if (amount === "") {
    alert("Amount likho");
    return;
  }

  expenses.push({
    amount: Number(amount),
    note: note || "Kharcha"
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
  showExpenses();
}

function showExpenses() {
  let list = document.getElementById("list");
  let total = 0;
  list.innerHTML = "";

  expenses.forEach((e, index) => {
    total += e.amount;

    let li = document.createElement("li");
    li.innerHTML = `
      ₹${e.amount} - ${e.note}
      <button onclick="deleteExpense(${index})">❌</button>
    `;

    list.appendChild(li);
  });

  document.getElementById("total").textContent = "₹" + total;
}

showExpenses();

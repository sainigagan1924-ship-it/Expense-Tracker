const form = document.getElementById("txn-form");
const tbody = document.querySelector("#txn-table tbody");

const txnId = document.getElementById("txn-id");
const titleInput = document.getElementById("txn-title");
const typeInput = document.getElementById("txn-type");
const amountInput = document.getElementById("txn-amount");
const dateInput = document.getElementById("txn-date");
const descInput = document.getElementById("txn-desc");

const totalIncome = document.getElementById("total-income");
const totalExpense = document.getElementById("total-expense");
const totalBalance = document.getElementById("total-balance");

const searchInput = document.getElementById("search");
const emptyMsg = document.getElementById("empty-msg");
const clearBtn = document.getElementById("clear-btn");
const saveBtn = document.getElementById("save-btn");

let transactions = JSON.parse(localStorage.getItem("transactions"));

if (transactions) {
  transactions = [
    {
      id: 1,
      title: "Salary",
      type: "income",
      amount: 50000,
      date: "2026-06-01",
      description: "Monthly Salary",
    },
    {
      id: 2,
      title: "Freelancing",
      type: "income",
      amount: 12000,
      date: "2026-06-05",
      description: "Website Project",
    },
    {
      id: 3,
      title: "Groceries",
      type: "expense",
      amount: 2500,
      date: "2026-06-06",
      description: "Monthly Grocery Shopping",
    },
    {
      id: 4,
      title: "Electricity Bill",
      type: "expense",
      amount: 1800,
      date: "2026-06-08",
      description: "Home Electricity",
    },
    {
      id: 5,
      title: "Internet Recharge",
      type: "expense",
      amount: 999,
      date: "2026-06-10",
      description: "Broadband Plan",
    },
  ];

  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function saveToLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function updateTotals() {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  totalIncome.textContent = income.toFixed(2);
  totalExpense.textContent = expense.toFixed(2);
  totalBalance.textContent = (income - expense).toFixed(2);
}
function displayTransactions(data = transactions) {
  tbody.innerHTML = "";
  if (data.length === 0){
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";
  }

  data.forEach((transaction) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${transaction.title}</td>
      <td>${transaction.type}</td>
      <td>${transaction.amount.toFixed(2)}</td>
      <td>${transaction.date}</td>
      <td>${transaction.description}</td>
      <td class="text-end d-flex">
        <button class="btn btn-warning btn-sm me-1"
          onclick="editTransaction(${transaction.id})">
          Edit
        </button>

        <button class="btn btn-danger btn-sm"
          onclick="deleteTransaction(${transaction.id})">
          Delete
        </button>
      </td>
    `;

    tbody.appendChild(row);
  });

  updateTotals();
}


form.addEventListener("submit", function (e) {
  e.preventDefault();

  const transaction = {
    id: txnId.value ? Number(txnId.value) : Date.now(),
    title: titleInput.value,
    type: typeInput.value,
    amount: Number(amountInput.value),
    date: dateInput.value,
    description: descInput.value,
  };
  if (txnId.value) {
    const index = transactions.findIndex((t) => t.id === Number(txnId.value));
    transactions[index] = transaction;
    saveBtn.textContent = "Add";
  }

  else {
    transactions.push(transaction);
  }

  saveToLocalStorage();
  displayTransactions();

  form.reset();
  txnId.value = "";
})

function editTransaction(id) {
  const transaction = transactions.find((t) => t.id === id);

  txnId.value = transaction.id;
  titleInput.value = transaction.title;
  typeInput.value = transaction.type;
  amountInput.value = transaction.amount;
  dateInput.value = transaction.date;
  descInput.value = transaction.description;

  saveBtn.textContent = "Update";
}

// Delete using filter()
function deleteTransaction(id) {
  transactions = transactions.filter((t) => t.id !== id);

  saveToLocalStorage();
  displayTransactions();
}

// Search
searchInput.addEventListener("keyup", function () {
  const keyword = this.value.toLowerCase();

  const filtered = transactions.filter(
    (t) =>
      t.title.toLowerCase().includes(keyword) ||
      t.description.toLowerCase().includes(keyword),
  );

  displayTransactions(filtered);
});

// Clear form
clearBtn.addEventListener("click", function () {
  form.reset();
  txnId.value = "";
  saveBtn.textContent = "Add";
});

// Initial load
displayTransactions();

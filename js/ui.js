function updateTotals() {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  totalIncome.textContent =
    income.toFixed(2);

  totalExpense.textContent =
    expense.toFixed(2);

  totalBalance.textContent =
    (income - expense).toFixed(2);
}

function displayTransactions(
  data = transactions
) {
  tbody.innerHTML = "";

  if (data.length === 0) {
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
        <button
          class="btn btn-warning btn-sm me-1"
          onclick="editTransaction(${transaction.id})"
        >
          Edit
        </button>

        <button
          class="btn btn-danger btn-sm"
          onclick="deleteTransaction(${transaction.id})"
        >
          Delete
        </button>
      </td>
    `;

    tbody.appendChild(row);
  });

  updateTotals();
}

searchInput.addEventListener("keyup", function () {
  const keyword =
    this.value.toLowerCase();

  const filtered = transactions.filter(
    (t) =>
      t.title
        .toLowerCase()
        .includes(keyword) ||
      t.description
        .toLowerCase()
        .includes(keyword)
  );

  displayTransactions(filtered);
});

clearBtn.addEventListener("click", () => {
  form.reset();
  txnId.value = "";
  saveBtn.textContent = "Add";
});

displayTransactions();
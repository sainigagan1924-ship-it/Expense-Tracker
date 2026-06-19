form.addEventListener("submit", (e) => {
  e.preventDefault();

  const transaction = {
    id: txnId.value
      ? Number(txnId.value)
      : Date.now(),

    title: titleInput.value,
    type: typeInput.value,
    amount: Number(amountInput.value),
    date: dateInput.value,
    description: descInput.value,
  };

  if (txnId.value) {
    const index = transactions.findIndex(
      (t) => t.id === Number(txnId.value)
    );

    transactions[index] = transaction;

    saveBtn.textContent = "Add";
  } else {
    transactions.push(transaction);
  }

  saveToLocalStorage();
  displayTransactions();

  form.reset();
  txnId.value = "";
});

function editTransaction(id) {
  const transaction =
    transactions.find((t) => t.id === id);

  txnId.value = transaction.id;
  titleInput.value = transaction.title;
  typeInput.value = transaction.type;
  amountInput.value = transaction.amount;
  dateInput.value = transaction.date;
  descInput.value = transaction.description;

  saveBtn.textContent = "Update";
}

function deleteTransaction(id) {
  transactions = transactions.filter(
    (t) => t.id !== id
  );

  saveToLocalStorage();
  displayTransactions();
}
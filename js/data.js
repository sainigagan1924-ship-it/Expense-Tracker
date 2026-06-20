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

let transactions =
  JSON.parse(localStorage.getItem("transactions")) || [];
function saveToLocalStorage() {
  localStorage.setItem(
    "transactions",
    JSON.stringify(transactions)
  );
}

if (transactions.length === 0) {
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

  saveToLocalStorage();
}

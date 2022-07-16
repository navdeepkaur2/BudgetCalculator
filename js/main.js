class Transaction {
    constructor(description, amount, id) {
      this.description = description;
      this.amount = amount;
      this.date = new Date();
      this.id = id;
    }
  }
  class TransactionList {
    constructor() {
      this.incomeList = [];
      this.expenseList = [];
      this.id = 0;
    }
    addNewTransaction(description, amount) {
      if (amount >= 0) {
        this.incomeList.push(new Transaction(description, amount, this.id++));
      } else if (amount < 0) {
        this.expenseList.push(new Transaction(description, amount, this.id++));
      }
    }
    removeTransaction(id) {
      this.incomeList = this.incomeList.filter((t) => {
        return t.id !== id;
      });
      this.expenseList = this.expenseList.filter((t) => {
        return t.id !== id;
      });
    }
    calculateBudget() {
      const totalIncome = this.incomeList.reduce(
        (previousValue, currentTransaction) =>
          previousValue + currentTransaction.amount,
        0
      );
      const totalExpenses = this.expenseList.reduce(
        (previousValue, currentTransaction) =>
          previousValue + currentTransaction.amount,
        0
      );
      return [totalIncome, totalExpenses, totalIncome - Math.abs(totalExpenses)];
    }
    calculatePercentage() {
      // calculating the percentages for each individual expense
      // to do that:
      // we need the total income, as a number
      // for each expense, we divide the expense by the total income, and x100
      const totalIncome = this.calculateBudget()[0];
      const listOfPercentages = [];
      this.expenseList.forEach((transaction) =>
        listOfPercentages.push((transaction.amount / totalIncome) * -100)
      );
      return listOfPercentages;
    }
    calculateNetPercentage() {
      return this.calculatePercentage().reduce(
        (previous, current) => previous + current,
        0
      );
    }
  }
  class UiController {
    updateTheBudget() {
      const budgetValueEl = document.getElementsByClassName("budget__value")[0];
      const budget = transactionList.calculateBudget();
      if (budget[2] >= 0) {
        budgetValueEl.textContent = "+ $ " + budget[2].toFixed(2);
      } else {
        budgetValueEl.textContent = "- $ " + Math.abs(budget[2]).toFixed(2);
      }
    }
    updateTotalIncome() {
      const totalIncomeEl = document.getElementsByClassName(
        "budget__income--value"
      )[0];
      totalIncomeEl.textContent =
        "+ $ " + transactionList.calculateBudget()[0].toFixed(2);
    }
    updateTotalExpense() {
      const totalExpenseEl = document.getElementsByClassName(
        "budget__expenses--value"
      )[0];
      totalExpenseEl.textContent =
        "- $ " + Math.abs(transactionList.calculateBudget()[1]).toFixed(2);
      const expensesPercentageEl = document.getElementsByClassName(
        "budget__expenses--percentage"
      )[0];
      expensesPercentageEl.textContent =
        transactionList.calculateNetPercentage().toFixed(0) + "%";
    }
    udpateIncomeList() {
      const incomeListEl = document.getElementsByClassName("income__list")[0];
      incomeListEl.textContent = "";
      transactionList.incomeList.forEach((transaction) => {
        incomeListEl.insertAdjacentHTML(
          "beforeend",
          `
        <div class="item" data-transaction-id="${transaction.id}">
          <div class="item__description">${transaction.description}</div>
          <div class="right">
            <div class="item__value">+ $${transaction.amount.toFixed(2)}</div>
            <div class="item__delete">
              <button class="item__delete--btn">
                <i class="ion-ios-close-outline"></i>
              </button>
            </div>
          </div>
          <div class="item__date">${transaction.date.toDateString()}</div>
        </div>`
        );
      });
    }
    updateExpenseList() {
      const expenseListEl = document.getElementsByClassName("expenses__list")[0];
      expenseListEl.textContent = "";
      const listOfPercentages = transactionList.calculatePercentage();
      transactionList.expenseList.forEach((transaction, index) => {
        expenseListEl.insertAdjacentHTML(
          "beforeend",
          `
        <div class="item" data-transaction-id="${transaction.id}">
        <div class="item__description">${transaction.description}</div>
        <div class="right">
          <div class="item__value">- $${Math.abs(transaction.amount).toFixed(
            2
          )}</div>
          <div class="item__percentage">${listOfPercentages[index].toFixed(
            0
          )}%</div>
          <div class="item__delete">
            <button class="item__delete--btn">
              <i class="ion-ios-close-outline"></i>
            </button>
          </div>
        </div>
        <div class="item__date">${transaction.date.toDateString()}</div>
      </div>`
        );
      });
    }
    updateEverything() {
      this.updateTheBudget();
      this.updateTotalExpense();
      this.updateTotalIncome();
      this.udpateIncomeList();
      this.updateExpenseList();
    }
  }
  const transactionList = new TransactionList();
  const ui = new UiController();
  ui.updateEverything();

  document.querySelector(".add__btn").addEventListener("click", (e) => {
    const descriptionEl = document.querySelector(".add__description");
    const valueEl = document.querySelector(".add__value");
    if(descriptionEl.value!=='' && valueEl.value!==''){
    transactionList.addNewTransaction(descriptionEl.value, +valueEl.value);
    }
    descriptionEl.value = "";
    valueEl.value = 0;
    ui.updateEverything();
  });

  document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("ion-ios-close-outline")) {
      transactionList.removeTransaction(
        +e.target.closest(".item").dataset.transactionId
      );
      ui.updateEverything();
    }
  });
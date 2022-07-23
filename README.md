# BudgetCalculator

This app support the following functionality:

* Users are able to submit an amount and a description in the appropriate fields.
* The amount that is submitted accepts a positive or negative value. If the amount is positive it is an income, while if it is negative, it is a expense.
* The description and amount cannot be empty, if it is, it does not attempt to create a new Transaction.
* If the form submission is successful create a new line in either the income - in the expense or the income column.
* Once the form is submitted,a new transaction object is created and added to the transactionList.
UI is updated,the description is cleared and be prepared for more submissions.
*New transaction is placed in the appropriate column, including a plus sign (+) if the transaction is in the income column, and a minus sign (-)
if it is placed in the expense column.
* All the values in each of the 2 columns (income and expenses) are  added together and displayed at the top of the screen, in separate elements,
 as well as a singular grand total and include a + or - sign, depending on whether or not is positive or negative.
* We can remove an individual expense or individual income line. Totals adjust immediately after removing these. 
* Each expense item shows its percentage relative to the total income.
* This Month's date is added to the top of the page (using JavaScript) as well as to each income and expense item. 

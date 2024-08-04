export type Expense = {
  id: number;
  merchant: string;
  amount: number;
  description: string;
  date: string;
  category: string;
  status: string;
};

export const ExpensesTable = ({ expenses }: { expenses: Expense[] }) => {
  const formatDate = (date: string) => {
    // Format in the form of "Apr 12"
    const dateObj = new Date(date);

    // Get the month in the form of "Apr"
    const month = dateObj.toLocaleDateString("en-UK", { month: "short" });
    // Get the day in the form of "12" (pad zeros)
    const day = dateObj.getDate().toString().padStart(2, "0");

    return `${month} ${day}`;
  };

  const formatMoney = (amount: number) => {
    // Format in the form of "£1,234.56"
    return amount.toLocaleString("en-UK", {
      style: "currency",
      currency: "GBP",
    });
  };

  const formatCapitalize = (str: string) => {
    // Capitalize the first letter
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Merchant</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{formatDate(expense.date)}</td>
              <td>{expense.merchant}</td>
              <td>{formatMoney(expense.amount)}</td>
              <td>{formatCapitalize(expense.category)}</td>
              <td>{expense.description}</td>
              <td>{formatCapitalize(expense.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

import { useEffect, useState } from "react";
import { Expense, ExpensesTable } from "../components/ExpensesTable";

type FetchError = {
  message: string;
};

const fetchExpenses = async (): Promise<Expense[]> => {
  const response = await fetch(
    "https://expenses-backend-mu.vercel.app/expenses",
    {
      headers: {
        "Content-Type": "application/json",
        Username: "james.christon",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch expenses");
  }

  return response.json();
};

const Expenses = () => {
  // State for the expenses
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch the expenses when the component mounts
  useEffect(() => {
    const loadExpenses = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedExpenses = await fetchExpenses();
        setExpenses(fetchedExpenses);
      } catch (err) {
        // Handle the error
        setError((err as FetchError).message);
      } finally {
        // Set loading to false
        setLoading(false);
      }
    };

    loadExpenses();
  }, []);

  const renderTable = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p style={{ color: "red" }}>{error}</p>;
    }

    if (expenses.length === 0) {
      return <p>No expenses found</p>;
    }

    return <ExpensesTable expenses={expenses} />;
  };

  return (
    <>
      <h1>Expenses</h1>
      <hr />
      {renderTable()}
    </>
  );
};

export default Expenses;

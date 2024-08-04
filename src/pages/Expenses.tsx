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
  const [devControls, setDevControls] = useState<boolean>(false);

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

  // Fetch the expenses when the component mounts
  useEffect(() => {
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
      <div className="top-bar">
        <div className="top">
          <h1>Expenses</h1>
          {/* Checkbox to enable dev controls */}
          <label>
            <input
              type="checkbox"
              checked={devControls}
              onChange={() => setDevControls(!devControls)}
            />
            Dev Controls
          </label>
        </div>
        {devControls && (
          <div className="controls">
            {/* Checkbox for testing loading */}
            <label>
              <input
                type="checkbox"
                checked={loading}
                onChange={() => setLoading(!loading)}
              />
              Loading
            </label>
            {/* Checkbox for testing error */}
            <label>
              <input
                type="checkbox"
                checked={Boolean(error)}
                onChange={() => {
                  if (error) {
                    setError(null);
                  } else {
                    setError("Test error message");
                  }
                }}
              />
              Error
            </label>

            {/* Button for testing empty state */}
            <button onClick={() => setExpenses([])}>Clear Expenses</button>

            {/* Button to fetch expenses */}
            <button onClick={async () => await loadExpenses()}>
              Fetch Expenses
            </button>
          </div>
        )}
      </div>

      <hr />

      {renderTable()}
    </>
  );
};

export default Expenses;

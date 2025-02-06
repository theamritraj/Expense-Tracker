import { useExpenses } from "../context/ExpenseContext";

export default function Summary() {
  const { entries } = useExpenses();
  const income = entries.filter(e => e.type === "income").reduce((sum, e) => sum + e.amount, 0);
  const expense = entries.filter(e => e.type === "expense").reduce((sum, e) => sum + e.amount, 0);
  const balance = income - expense;

  return (
    <div className="p-4 bg-gray-100 rounded-lg flex justify-around">
      <div>Income: ${income}</div>
      <div>Expense: ${expense}</div>
      <div>Balance: ${balance}</div>
    </div>
  );
}

import { Bar } from "react-chartjs-2";
import { useExpenses } from "../context/ExpenseContext";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ExpenseChart() {
  const { entries } = useExpenses();

  // Group data by date
  const grouped = entries.reduce((acc, entry) => {
    const date = new Date(entry.date).toLocaleDateString("en-US");
    if (!acc[date]) acc[date] = { income: 0, expense: 0 };
    acc[date][entry.type] += entry.amount;
    return acc;
  }, {} as Record<string, { income: number; expense: number }>);

  const labels = Object.keys(grouped);
  const incomeData = labels.map(date => grouped[date].income);
  const expenseData = labels.map(date => grouped[date].expense);

  const dataIncome = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "green",
      },
    ],
  };

  const dataExpense = {
    labels,
    datasets: [
      {
        label: "Expenses",
        data: expenseData,
        backgroundColor: "red",
      },
    ],
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold">Daily Income</h2>
        <Bar data={dataIncome} />
      </div>
      <div>
        <h2 className="text-lg font-bold">Daily Expenses</h2>
        <Bar data={dataExpense} />
      </div>
    </div>
  );
}

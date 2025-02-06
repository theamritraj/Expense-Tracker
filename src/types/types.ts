export type ExpenseEntry = {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  date: string;
};

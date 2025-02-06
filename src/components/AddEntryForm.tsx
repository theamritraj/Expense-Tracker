import { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AddEntryForm() {
  const { addEntry } = useExpenses();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;
    addEntry({ description, amount: parseFloat(amount), type, date: new Date().toISOString() });
    setDescription("");
    setAmount("");
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
          <Input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder="Amount" />
          <select value={type} onChange={(e) => setType(e.target.value as "income" | "expense")}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <Button type="submit">Add Entry</Button>
        </form>
      </CardContent>
    </Card>
  );
}

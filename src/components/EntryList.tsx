import { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function EntryList() {
  const { entries, updateEntry, deleteEntry } = useExpenses();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDescription, setEditDescription] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [search, setSearch] = useState("");

  const handleEdit = (entryId: string, description: string, amount: number) => {
    setEditingId(entryId);
    setEditDescription(description);
    setEditAmount(amount.toString());
  };

  const handleSave = (id: string) => {
    updateEntry(id, { description: editDescription, amount: parseFloat(editAmount) });
    setEditingId(null);
  };

  const filteredEntries = entries.filter(entry =>
    entry.description.toLowerCase().includes(search.toLowerCase()) ||
    entry.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card>
      <CardContent>
        <h2 className="text-xl font-bold">Transactions</h2>
        <Input
          placeholder="Search income or expenses..."
          className="mt-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
        {filteredEntries.length === 0 ? <p className="mt-2">No transactions found.</p> : (
          <ul className="mt-4 space-y-2">
            {filteredEntries.map((entry) => (
              <li key={entry.id} className="flex items-center justify-between p-2 border-b">
                {editingId === entry.id ? (
                  <>
                    <Input value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                    <Input value={editAmount} onChange={(e) => setEditAmount(e.target.value)} type="number" />
                    <Button size="sm" onClick={() => handleSave(entry.id)}>Save</Button>
                  </>
                ) : (
                  <div className="flex-1">
                    <span>{entry.description} - ${entry.amount}</span>
                  </div>
                )}
                <div className="flex space-x-2">
                  <Button size="sm" onClick={() => handleEdit(entry.id, entry.description, entry.amount)}>Edit</Button>
                  <Button variant="destructive" size="sm" onClick={() => deleteEntry(entry.id)}>Delete</Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

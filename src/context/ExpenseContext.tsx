import { createContext, useContext, useState, ReactNode } from "react";
import { ExpenseEntry } from "../types/types";
import { v4 as uuidv4 } from "uuid";

type ExpenseContextType = {
  entries: ExpenseEntry[];
  addEntry: (entry: Omit<ExpenseEntry, "id">) => void;
  deleteEntry: (id: string) => void;
  updateEntry: (id: string, updatedData: Partial<ExpenseEntry>) => void;
};

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider = ({ children }: { children: ReactNode }) => {
  const [entries, setEntries] = useState<ExpenseEntry[]>([]);

  const addEntry = (entry: Omit<ExpenseEntry, "id">) => {
    setEntries([...entries, { ...entry, id: uuidv4() }]);
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const updateEntry = (id: string, updatedData: Partial<ExpenseEntry>) => {
    setEntries(entries.map(entry => (entry.id === id ? { ...entry, ...updatedData } : entry)));
  };

  return (
    <ExpenseContext.Provider value={{ entries, addEntry, deleteEntry, updateEntry }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenses must be used within an ExpenseProvider");
  }
  return context;
};

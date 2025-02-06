import AddEntryForm from "../components/AddEntryForm";
import EntryList from "../components/EntryList";
import Summary from "../components/Summary";
import ExpenseChart from "../components/ExpenseChart";

export default function Home() {
  return (
    <div className="max-w-lg mx-auto p-4 space-y-4">
      <Summary />
      <AddEntryForm />
      <EntryList />
      <ExpenseChart />
    </div>
  );
}

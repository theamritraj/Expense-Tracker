import Footer from "./components/Footer";
import Header from "./components/Header";
import { ExpenseProvider } from "./context/ExpenseContext";
import Home from "./pages/Home";

function App() {
  return (
    <ExpenseProvider>
      <Header/>
      <Home />
      <Footer/>
    </ExpenseProvider>
  );
}

export default App;

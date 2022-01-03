import './App.css';
import Budgets from './components/Budgets';
import Loader from './components/Loder';
import useFetchFromAirtable from './useFetchFromAirtable';

function App() {
  const {isLoading, error} = useFetchFromAirtable();

  return (
    <div>
      {error && <p>Sorry, something went wrong</p>}
      {isLoading ? <Loader /> : <Budgets />}
    </div>
  );
}

export default App;

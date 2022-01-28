import './App.css';
import Content from './components/Content';
import Loader from './components/Loder';
import useFetchFromAirtable from './useFetchFromAirtable';

function App() {
  const {isLoading, error} = useFetchFromAirtable();

  let content = isLoading ? <Loader /> : <Content />;

  return (
    <div>
      {error ? <p className="error-message">Sorry, something went wrong</p> : content}
    </div>
  );
}

export default App;

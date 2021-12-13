import styled from 'styled-components';
import './App.css';
import Budgets from './components/Budgets';
import Loader from './components/Loder';
import useFetchFromAirtable from './useFetchFromAirtable';

function App() {
  const {isLoading, error} = useFetchFromAirtable();

  return (
    <Container className="container">
      {error && <p>Sorry, something went wrong</p>}
      {isLoading ? <Loader /> : <Budgets />}
    </Container>
  );
}

export default App;

const Container = styled.div`
`;

import styled from 'styled-components';
import './App.css';
import Budgets from './components/Budgets';
function App() {

  return (
    <Container className="container">
      <Budgets />
    </Container>
  );
}

export default App;

const Container = styled.div`
    height: 100vh;
`;

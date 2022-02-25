import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap'
//pages
import HomePage from './pages/HomePage';
import PokemonPage from './pages/PokemonPage';
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokemon/:id" element={<PokemonPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

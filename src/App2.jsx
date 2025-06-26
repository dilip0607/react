import { Routes, Route } from 'react-router-dom';
import Login from './login';
import Home from './Home';
import './App.css'
import ProductPage from './Productpage';

function App2() {

  return (
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<Login />} />
      <Route path="/Productpage" element={<ProductPage />} />
    </Routes>
  );
}

export default App2;

import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Login from './login';

import ProductPage from './Productpage';


function App() {
  return (
    <>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />}/>
        
      </Routes>
    </>
  );
}

export default App;

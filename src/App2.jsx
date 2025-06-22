import { Routes, Route } from 'react-router-dom';
import Login from './login.jsx';
import Dashboard from './Dashboard.jsx';
function App2() {

  return (
     <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App2;

import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './pages/Home';
import Registrar from './components/Registrar/Registrar';
import PrivateRoute from './components/PrivateRoute';
import './App.css'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/registrar" element={<Registrar />}/>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

      </Routes>
    </div>

  );

}

export default App;

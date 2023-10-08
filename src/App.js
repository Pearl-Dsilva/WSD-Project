
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Home from './components/home/home';
import './App.css';
import './Header.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from './firestore/firestore';
import { onAuthStateChanged } from 'firebase/auth';


const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, (userToken) => {
      setUser(userToken);
    });
  }, [])

  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Navigate to="/login" replace />} />
      <Route path="/login" element={<Login auth={auth} />} />
      <Route path="/signup" element={<Signup auth={auth} />} />
    </Routes>
  )
};

export default App;

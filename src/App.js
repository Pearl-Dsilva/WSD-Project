
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Home from './components/home/home';
import LandingPage from './components/landingPage/landingPage';
import './App.css';
import './Header.css';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
};

export default App;

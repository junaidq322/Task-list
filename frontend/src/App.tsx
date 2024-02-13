// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/LoginPage';
import Registration from './pages/RegistrationPage';
import NotFound from './pages/NotFound';
import Header from './components/Header';

const App: React.FC = () => {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Dashboard/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Registration/>} />
                <Route Component={NotFound} />
            </Routes>
        </Router>
    );
};

export default App;

// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Homepage from './components/pages/Homepage';
import DeviceCatalog from './components/pages/DeviceCatalog';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import ForgotPassword from './components/auth/ForgotPassword';
import DonateForm from './components/devices/DonateForm';
import RequestForm from './components/devices/RequestForm';
import Dashboard from './components/dashboard/Dashboard';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import FAQ from './components/pages/FAQ';
import Privacy from './components/pages/Privacy';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/catalog" element={<DeviceCatalog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/donate" element={<DonateForm />} />
            <Route path="/request" element={<RequestForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { authUtils } from './services/api';

// Components
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateEntry from './pages/CreateEntry';
import EditEntry from './pages/EditEntry';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  return authUtils.isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/login" 
              element={
                authUtils.isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />
              } 
            />
            <Route 
              path="/register" 
              element={
                authUtils.isAuthenticated() ? <Navigate to="/dashboard" /> : <Register />
              } 
            />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create" 
              element={
                <ProtectedRoute>
                  <CreateEntry />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/edit/:id" 
              element={
                <ProtectedRoute>
                  <EditEntry />
                </ProtectedRoute>
              } 
            />
            
            {/* Default Route */}
            <Route 
              path="/" 
              element={
                <Navigate to={authUtils.isAuthenticated() ? "/dashboard" : "/login"} />
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
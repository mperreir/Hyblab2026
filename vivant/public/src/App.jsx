import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import PathComponent from './PathComponent';
import './App.css';

function App() {
  return (
    <BrowserRouter basename="/vivant">
      <Routes>
        {/* Redirection racine vers /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Wrapper pour conserver le MainLayout sur toutes ces routes */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/carte" element={<PathComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

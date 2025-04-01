import React from 'react'
import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageIndex, PageLogin, PageNotFound } from './components/Pages.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageIndex />} />
        <Route path="login" element={<PageLogin />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { StudentProvider } from './Context/StudentContext';
import StudentDetail from "./components/StudentDetail";

const App = () => (
  <StudentProvider>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/student/:name" element={<StudentDetail />} /> 
      </Routes>
    </Router>
  </StudentProvider>
);

export default App;

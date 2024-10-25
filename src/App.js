import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddStudentPage from './pages/AddStudentPage';
import { StudentProvider } from './Context/StudentContext';

const App = () => (
  <StudentProvider>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-student" element={<AddStudentPage />} />
      </Routes>
    </Router>
  </StudentProvider>
);

export default App;

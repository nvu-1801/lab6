// src/pages/HomePage.jsx
import React from 'react';
import StudentList from '../components/StudentList';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const HomePage = () => (
  <div>
    <h1>Student Management</h1>
    <Link to="/add-student">
      <Button variant="primary">Add New Student</Button>
    </Link>
    <StudentList />
  </div>
);

export default HomePage;

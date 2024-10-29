import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

const StudentDetail = () => {
  const { name } = useParams(); // Optional: Use name from the URL if needed
  const location = useLocation();
  const student = location.state?.student; // Get the student data from state

  if (!student) {
    return <h3 className="mt-5 mx-5">No student data found.</h3>;
  }

  return (
    <div className="mt-5 mx-5">
      <h1 className="text-success">Student Details</h1> {/* Fixed className */}
      <h4>Name: {student.name}</h4>
      <h4>Student Code: {student.studentCode}</h4>
      <h4>Status: {student.isActive ? 'Active' : 'Inactive'}</h4>
      <h4>ID: {student._id}</h4>
    </div>
  );
};

export default StudentDetail;

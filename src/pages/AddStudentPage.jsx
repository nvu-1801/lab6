import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudents } from '../Context/StudentContext';
import { Form, Button } from 'react-bootstrap';

const AddStudentPage = () => {
  const [studentCode, setStudentCode] = useState('');
  const [name, setName] = useState('');
  const [isActive, setIsActive] = useState(true); // Mặc định là true
  const { addStudent } = useStudents();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addStudent({ studentCode, name, isActive }); // Gửi dữ liệu dưới dạng boolean
    navigate('/');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Student Code</Form.Label>
        <Form.Control
          type="text"
          value={studentCode}
          onChange={(e) => setStudentCode(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Is Active</Form.Label>
        <Form.Select
          value={isActive}
          onChange={(e) => setIsActive(e.target.value === 'true')} // Chuyển đổi sang boolean
          required
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </Form.Select>
      </Form.Group>

      <Button variant="success" type="submit">
        Add Student
      </Button>
    </Form>
  );
};

export default AddStudentPage;

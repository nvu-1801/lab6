// src/pages/HomePage.jsx
import React from "react";
import StudentList from "../components/StudentList";
import { Link } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";

const HomePage = () => (
  <div>
    <Row className="my-5 mx-5">
      <Col>
        <h1>Student Management</h1>
      </Col>
      <Col>
        <Link to="/add-student">
          <Button variant="primary">Add New Student</Button>
        </Link>
      </Col>
    </Row>
    <Row  className=" mx-5">
      <Col>
        <StudentList />
      </Col>
    </Row>
  </div>
);

export default HomePage;

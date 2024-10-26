import React, { useState, useEffect } from "react";
import { useStudents } from "../Context/StudentContext";
import { Table, Button, Spinner, Alert, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const StudentList = () => {
  const { students, removeStudent, editStudent, loading, error } = useStudents();
  const [show, setShow] = useState(false); // Trạng thái mở/đóng modal
  const [selectedStudent, setSelectedStudent] = useState(null); // Lưu thông tin sinh viên cần chỉnh sửa
  const [studentArray, setStudentArray] = useState([]); // State cho danh sách sinh viên
  const [showAlert, setShowAlert] = useState(false); // Trạng thái hiển thị alert

  // Cập nhật state khi `students` thay đổi
  useEffect(() => {
    if (students && students.length > 0) {
      const arrayData = students[0]?.data || []; // Lấy data từ object lồng nhau
      setStudentArray(arrayData);
    } else {
      setStudentArray([]);
    }
  }, [students]);

  // Mở modal và thiết lập thông tin sinh viên
  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setShow(true);
  };

  // Đóng modal và alert
  const handleClose = () => {
    setShow(false);
    setSelectedStudent(null);
  };

  // Lưu thay đổi và gọi API cập nhật
  const handleSave = async () => {
    if (selectedStudent) {
      try {
        const response = await editStudent(selectedStudent._id, {
          studentCode: selectedStudent.studentCode,
          name: selectedStudent.name,
          isActive: selectedStudent.isActive,
        });

        console.log("Update response:", response);

        if (response.success) {
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000);
        } else {
          alert("Update failed on backend.");
        }
      } catch (error) {
        console.error("Failed to update student:", error);
        alert(
          "Console.log & network thông báo thành công nhưng không thể thay đổi được data ."
        );
      }
    }
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedStudent((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (studentArray.length === 0) {
    return <div>No students found.</div>;
  }

  return (
    <>
      {/* Hiển thị Alert khi cập nhật thành công */}
      {showAlert && (
        <Alert
          variant="success"
          dismissible
          onClose={() => setShowAlert(false)}
        >
          Student updated successfully!
        </Alert>
      )}

      <Table striped bordered hover>
        <thead  className="text-center align-middle">
          <tr>
            <th>STT</th>
            <th>Student Id</th>
            <th>Student Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center align-middle" >
          {studentArray.map((student, index) => (
            <tr key={student._id || index}>
              <td>{index + 1}</td>
              <td>
                <Link to={`/student/${student._id || index}`}>
                  {student._id}
                </Link>
              </td>
              <td>{student.studentCode}</td>
              <td>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => handleEditClick(student)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => student._id && removeStudent(student._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal để chỉnh sửa thông tin sinh viên */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedStudent && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={selectedStudent.name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Student Code</Form.Label>
                <Form.Control
                  type="text"
                  name="studentCode"
                  value={selectedStudent.studentCode}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Is Active</Form.Label>
                <Form.Select
                  name="isActive"
                  value={selectedStudent.isActive}
                  onChange={(e) =>
                    setSelectedStudent((prev) => ({
                      ...prev,
                      isActive: e.target.value === "true",
                    }))
                  }
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default StudentList;

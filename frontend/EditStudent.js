import React, { useState, useEffect } from 'react';

const EditStudent = ({ studentId, onStudentUpdated }) => {
  const [student, setStudent] = useState({
    name: '',
    age: '',
    course: '',
    grade: '',
  });

  useEffect(() => {
    // Fetch student details to populate the form for editing
    fetch(`http://localhost:5000/api/students/${studentId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert('Student not found');
          return;
        }
        setStudent({
          name: data.name,
          age: data.age,
          course: data.course,
          grade: data.grade,
        });
      })
      .catch((error) => console.error('Error fetching student:', error));
  }, [studentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting student update:', student); // Log the student data

    // Send the updated data to the backend
    fetch(`http://localhost:5000/api/students/${studentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
          return;
        }
        onStudentUpdated(data); // Callback to update the UI
        alert('Student updated successfully!');
      })
      .catch((error) => console.error('Error updating student:', error));
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={student.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="age" className="block">Age</label>
          <input
            id="age"
            name="age"
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            value={student.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="course" className="block">Course</label>
          <input
            id="course"
            name="course"
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={student.course}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="grade" className="block">Grade</label>
          <input
            id="grade"
            name="grade"
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={student.grade}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Update Student
        </button>
      </form>
    </div>
  );
};

export default EditStudent;

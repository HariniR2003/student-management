import React, { useState } from 'react';

const AddStudent = ({ onStudentAdded }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [course, setCourse] = useState('');
  const [grade, setGrade] = useState('');  // Add state for grade
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !age || !course || !grade) {  // Check if all fields are filled
      setError("Please fill in all fields.");
      return;
    }

    const newStudent = { name, age, course, grade };  // Include grade in the object

    try {
      const response = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudent),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Added student:', data);
        onStudentAdded();  // Refresh the student list after adding a new one
        setName('');
        setAge('');
        setCourse('');
        setGrade('');  // Clear grade input
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add student");
      }
    } catch (error) {
      console.error('Error adding student:', error);
      setError(error.message);  // Display error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Grade"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        required
      />
      <button type="submit">Add Student</button>
    </form>
  );
};

export default AddStudent;

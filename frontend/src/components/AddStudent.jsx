import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddStudent = ({ onStudentAdded }) => {
  const [student, setStudent] = useState({ name: '', age: '', course: '', grade: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
      });

      if (response.ok) {
        onStudentAdded?.(); // Safe call in case it's not passed
        navigate('/');
      } else {
        console.error('Failed to add student');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-4">Add Student</h2>
        <input type="text" name="name" placeholder="Name" value={student.name} onChange={handleChange} required className="w-full px-3 py-2 rounded border" />
        <input type="number" name="age" placeholder="Age" value={student.age} onChange={handleChange} required className="w-full px-3 py-2 rounded border" />
        <input type="text" name="course" placeholder="Course" value={student.course} onChange={handleChange} required className="w-full px-3 py-2 rounded border" />
        <input type="text" name="grade" placeholder="Grade" value={student.grade} onChange={handleChange} required className="w-full px-3 py-2 rounded border" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;

import React, { useState, useEffect } from "react";

const EditStudent = ({ studentId, onUpdate }) => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/students")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((s) => s._id === studentId);
        setStudent(found);
      });
  }, [studentId]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/api/students/${studentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    });
    const updated = await res.json();
    onUpdate(updated);
  };

  if (!student) return null;

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-2">
      <input name="name" value={student.name} onChange={handleChange} className="border p-1 rounded w-full" />
      <input name="age" value={student.age} onChange={handleChange} className="border p-1 rounded w-full" />
      <input name="course" value={student.course} onChange={handleChange} className="border p-1 rounded w-full" />
      <input name="grade" value={student.grade} onChange={handleChange} className="border p-1 rounded w-full" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">Update</button>
    </form>
  );
};

export default EditStudent;

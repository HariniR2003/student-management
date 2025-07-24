import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    const [students, setStudents] = useState([]);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [course, setCourse] = useState('');
    const [grade, setGrade] = useState('');
    const [editing, setEditing] = useState(null);

    // Fetch students from the backend
    useEffect(() => {
        fetch('http://localhost:5000/api/students')
            .then(response => response.json())
            .then(data => setStudents(data))
            .catch(error => console.error('Error fetching students:', error));
    }, []);

    // Add student
    const handleAddStudent = (e) => {
        e.preventDefault();
        const newStudent = { name, age, course, grade };
        fetch('http://localhost:5000/api/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newStudent),
        })
            .then(response => response.json())
            .then(data => {
                setStudents([...students, data]);
                setName('');
                setAge('');
                setCourse('');
                setGrade('');
            })
            .catch(error => console.error('Error adding student:', error));
    };

    // Edit student
    const handleEditStudent = (student) => {
        setName(student.name);
        setAge(student.age);
        setCourse(student.course);
        setGrade(student.grade);
        setEditing(student._id);
    };

    const handleUpdateStudent = (e) => {
        e.preventDefault();
        const updatedStudent = { name, age, course, grade };
        fetch(`http://localhost:5000/api/students/${editing}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedStudent),
        })
            .then(response => response.json())
            .then(data => {
                setStudents(students.map(student => (student._id === editing ? data : student)));
                setName('');
                setAge('');
                setCourse('');
                setGrade('');
                setEditing(null);
            })
            .catch(error => console.error('Error updating student:', error));
    };

    // Delete student
    const handleDeleteStudent = (id) => {
        fetch(`http://localhost:5000/api/students/${id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    setStudents(students.filter(student => student._id !== id));
                }
            })
            .catch(error => console.error('Error deleting student:', error));
    };

    return (
        <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-800">
            <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-6">Student Dashboard</h1>
            
            {/* Add/Edit Student Form */}
            <form
                onSubmit={editing ? handleUpdateStudent : handleAddStudent}
                className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg max-w-md mx-auto mb-8"
            >
                <h2 className="text-2xl font-medium text-gray-800 dark:text-white mb-4">{editing ? 'Edit Student' : 'Add Student'}</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-600 dark:text-white"
                        required
                    />
                </div>
                <div className="mb-4 flex space-x-4">
                    <input
                        type="number"
                        placeholder="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-600 dark:text-white"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Course"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-600 dark:text-white"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Grade"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-600 dark:text-white"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
                >
                    {editing ? 'Update' : 'Add'} Student
                </button>
            </form>

            {/* Student List */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
                <h2 className="text-2xl font-medium text-gray-800 dark:text-white mb-4">Student List</h2>
                {students.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-400">No students found.</p>
                ) : (
                    <ul className="space-y-4">
                        {students.map((student, index) => (
                            <li key={student._id} className="bg-gray-50 dark:bg-gray-600 p-4 rounded-md shadow-sm flex justify-between items-center">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg text-gray-800 dark:text-white">{index + 1}. {student.name}</h3>
                                    <p>Age: {student.age}</p>
                                    <p>Course: {student.course}</p>
                                    <p>Grade: {student.grade}</p>
                                </div>
                                <div className="space-x-2">
                                    <button
                                        onClick={() => handleEditStudent(student)}
                                        className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-500"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteStudent(student._id)}
                                        className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Dashboard;

import React, { useState, useEffect } from "react";
import AddStudent from "./AddStudent";
import EditStudent from "./EditStudent";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false); // state for dark mode toggle

  const fetchStudents = () => {
    fetch("http://localhost:5000/api/students")
      .then((res) => res.json())
      .then(setStudents);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/students/${id}`, { method: "DELETE" })
      .then(() => {
        fetchStudents();
        toast.success("Student deleted successfully!");
      })
      .catch(() => toast.error("Error deleting student!"));
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "StudentList.xlsx");
  };

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-all duration-300`}>
      {/* Centering Container */}
      <div className="flex justify-center items-center min-h-screen p-6">
        <div className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          {/* Header */}
          <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-700">Student Management App</h1>

          {/* Dark Mode Toggle Button */}
          <div className="mb-4 flex justify-between items-center">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search students..."
              className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              onClick={() => setDarkMode(!darkMode)} // Toggle dark mode state
              className="ml-4 bg-gray-600 text-white p-2 rounded-full hover:bg-gray-700 transition duration-300"
            >
              Toggle Dark Mode
            </button>
          </div>

          {/* Add New Student Button */}
          <AddStudent onStudentAdded={fetchStudents} />

          {/* Export Button */}
          <div className="mb-6">
            <button
              onClick={exportToExcel}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded transition duration-300"
            >
              ⬇ Export to Excel
            </button>
          </div>

          {/* No students found message */}
          {filtered.length === 0 ? (
            <p className="text-gray-500 text-center">No students found.</p>
          ) : (
            <div className="space-y-4">
              {/* List of Students with Entry Numbers */}
              {filtered.map((s, index) => (
                <div
                  key={s._id}
                  className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-lg flex flex-col sm:flex-row sm:items-center justify-between transition-all duration-300"
                >
                  <div>
                    {/* Display entry number along with student name */}
                    <p className="font-bold text-lg">{index + 1}. {s.name}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Course: {s.course}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Age: {s.age}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Grade: {s.grade}</p>
                  </div>
                  <div className="mt-3 sm:mt-0 space-x-4"> {/* Added more space between buttons */}
                    <button
                      onClick={() => setEditingStudent(s._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                  {editingStudent === s._id && (
                    <EditStudent studentId={s._id} onUpdate={fetchStudents} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default StudentList;

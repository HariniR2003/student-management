// src/services/studentService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // URL of your Express API

export const getStudents = async () => {
  try {
    const response = await axios.get(`${API_URL}/students`);  // Make a GET request to fetch students
    return response.data; // This should return the array of students
  } catch (error) {
    console.error('Error fetching students:', error);
    return [];  // In case of error, return an empty array
  }
};

export const addStudent = async (studentData) => {
  try {
    const response = await axios.post(`${API_URL}/students`, studentData);
    return response.data;
  } catch (error) {
    console.error('Error adding student:', error);
  }
};

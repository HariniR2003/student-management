// models/Student.js
const mongoose = require('mongoose');

// Create the schema for the Student
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  course: { type: String, required: true },
  grade: { type: String, required: true } // Added grade to match the error you were getting
});

// Create the model from the schema
const Student = mongoose.model('Student', studentSchema);

// Export the model to use in routes
module.exports = Student;

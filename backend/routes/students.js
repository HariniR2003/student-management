// server.js or routes/students.js

const express = require('express');
const router = express.Router();
const Student = require('../models/Student'); // Path to your Student model

// POST route to add a student
router.post('/students', async (req, res) => {
  try {
    // Destructure the data from the body
    const { name, age, course } = req.body;

    // Create a new student instance
    const newStudent = new Student({
      name,
      age,
      course,
    });

    // Save the new student to the database
    await newStudent.save();

    // Send back the created student data in response
    res.status(201).json(newStudent);
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ message: 'Error adding student', error });
  }
});

module.exports = router;

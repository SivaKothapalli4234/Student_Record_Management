// Import required packages
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware - allows JSON data and cross-origin requests
app.use(express.json());
app.use(cors({
  origin: true,
  credentials: true
}));

// Connect to MongoDB Atlas database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.log('MongoDB connection error:', err));

// Student Schema - defines the structure of student data
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  regdNo: {
    type: String,
    required: true,
    unique: true
  },
  courseName: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  }
});

// Create Student model from schema
const Student = mongoose.model('Student', studentSchema);

// ROUTES - API endpoints for CRUD operations

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Student Management API is running!', endpoints: ['/students'] });
});

// GET /students - Get all students with optional search
app.get('/students', async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { regdNo: { $regex: search, $options: 'i' } },
          { courseName: { $regex: search, $options: 'i' } },
          { qualification: { $regex: search, $options: 'i' } }
        ]
      };
    }
    
    const students = await Student.find(query);
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /students - Add new student
app.post('/students', async (req, res) => {
  try {
    const student = new Student(req.body); // Create new student from request data
    const savedStudent = await student.save(); // Save to database
    res.status(201).json(savedStudent); // Send created student back
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /students/:id - Update existing student
app.put('/students/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id, // Student ID from URL
      req.body, // New data from request
      { new: true } // Return updated document
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /students/:id - Delete student
app.delete('/students/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
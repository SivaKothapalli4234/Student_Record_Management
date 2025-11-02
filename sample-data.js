// Sample data to insert into MongoDB for testing
// Run this script after starting MongoDB and the backend server

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/studentDB');

// Student Schema (same as in server.js)
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true }
});

const Student = mongoose.model('Student', studentSchema);

// Sample students data
const sampleStudents = [
  {
    name: 'John Doe',
    age: 20,
    email: 'john.doe@email.com'
  },
  {
    name: 'Jane Smith',
    age: 22,
    email: 'jane.smith@email.com'
  },
  {
    name: 'Mike Johnson',
    age: 19,
    email: 'mike.johnson@email.com'
  }
];

// Insert sample data
async function insertSampleData() {
  try {
    // Clear existing data
    await Student.deleteMany({});
    console.log('Cleared existing students');
    
    // Insert sample students
    await Student.insertMany(sampleStudents);
    console.log('Sample students inserted successfully');
    
    // Close connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error inserting sample data:', error);
  }
}

// Run the function
insertSampleData();
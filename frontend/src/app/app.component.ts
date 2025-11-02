import { Component, OnInit } from '@angular/core';
import { StudentService, Student } from './student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  students: Student[] = []; // Array to store all students
  
  // Form data for adding/editing students
  studentForm: Student = {
    name: '',
    age: 0,
    email: '',
    regdNo: '',
    courseName: '',
    qualification: ''
  };
  
  searchTerm = ''; // Search input
  
  isEditing = false; // Track if we're editing or adding
  editingId = ''; // Store ID of student being edited

  constructor(private studentService: StudentService) { }

  // Load students when component starts
  ngOnInit() {
    console.log('Component initialized');
    this.loadStudents();
  }

  // Get all students from backend
  loadStudents() {
    this.studentService.getStudents(this.searchTerm).subscribe(
      (data) => {
        this.students = data;
      },
      (error) => {
        console.error('Error loading students:', error);
      }
    );
  }
  
  // Search students
  onSearch() {
    this.loadStudents();
  }

  // Add new student or update existing one
  onSubmit() {
    if (this.isEditing) {
      // Update existing student
      this.studentService.updateStudent(this.editingId, this.studentForm).subscribe(
        () => {
          this.loadStudents(); // Refresh the list
          this.resetForm(); // Clear the form
        },
        (error) => {
          console.error('Error updating student:', error);
        }
      );
    } else {
      // Add new student
      this.studentService.addStudent(this.studentForm).subscribe(
        () => {
          this.loadStudents(); // Refresh the list
          this.resetForm(); // Clear the form
        },
        (error) => {
          console.error('Error adding student:', error);
        }
      );
    }
  }

  // Fill form with student data for editing
  editStudent(student: Student) {
    this.studentForm = { ...student }; // Copy student data to form
    this.isEditing = true;
    this.editingId = student._id || '';
  }

  // Delete student
  deleteStudent(id: string) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe(
        () => {
          this.loadStudents(); // Refresh the list
        },
        (error) => {
          console.error('Error deleting student:', error);
        }
      );
    }
  }

  // Clear form and reset editing state
  resetForm() {
    this.studentForm = { name: '', age: 0, email: '', regdNo: '', courseName: '', qualification: '' };
    this.isEditing = false;
    this.editingId = '';
  }
}
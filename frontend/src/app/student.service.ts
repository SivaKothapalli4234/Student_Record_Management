import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

// Interface to define student structure
export interface Student {
  _id?: string;
  name: string;
  age: number;
  email: string;
  regdNo: string;
  courseName: string;
  qualification: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = `${environment.apiUrl}/students`; // Backend API URL

  constructor(private http: HttpClient) { }

  // Get all students from backend with optional search
  getStudents(search?: string): Observable<Student[]> {
    const url = search ? `${this.apiUrl}?search=${search}` : this.apiUrl;
    return this.http.get<Student[]>(url);
  }

  // Add new student to backend
  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  // Update existing student in backend
  updateStudent(id: string, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student);
  }

  // Delete student from backend
  deleteStudent(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
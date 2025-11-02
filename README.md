# Enhanced Student Management System

A modern MEAN stack application with Bootstrap UI for managing student records.

## New Features
- **Enhanced Fields**: Registration Number, Course Name, Qualification
- **Search Functionality**: Search across all student fields
- **Modern UI**: Bootstrap 5 with Font Awesome icons
- **Cloud Database**: MongoDB Atlas integration
- **Deployment Ready**: Configured for Render (backend) and Netlify (frontend)

## Deployment Instructions

### Backend (Render)
1. Push code to GitHub
2. Connect GitHub repo to Render
3. Set environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
4. Deploy with build command: `npm install`
5. Start command: `npm start`

### Frontend (Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist/student-frontend` folder to Netlify
3. Update `environment.prod.ts` with your Render backend URL

### Local Development
1. Backend: `cd backend && npm start`
2. Frontend: `cd frontend && ng serve`

## API Endpoints
- `GET /students?search=term` - Get/search students
- `POST /students` - Add new student
- `PUT /students/:id` - Update student
- `DELETE /students/:id` - Delete student
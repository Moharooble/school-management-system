import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import StudentForm from './pages/StudentForm';
import Teachers from './pages/Teachers';
import TeacherForm from './pages/TeacherForm';
import Fees from './pages/Fees';
import PaymentForm from './pages/PaymentForm';
import FeeStructureForm from './pages/FeeStructureForm';
import Attendance from './pages/Attendance';
import Exams from './pages/Exams';
import ExamForm from './pages/ExamForm';
import ExamScores from './pages/ExamScores';
import Reports from './pages/Reports';
import Classes from './pages/Classes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/students" element={<Students />} />
        <Route path="/students/add" element={<StudentForm />} />
        <Route path="/students/edit/:id" element={<StudentForm />} />

        <Route path="/teachers" element={<Teachers />} />
        <Route path="/teachers/add" element={<TeacherForm />} />
        <Route path="/teachers/edit/:id" element={<TeacherForm />} />

        <Route path="/fees" element={<Fees />} />
        <Route path="/fees/payment/new" element={<PaymentForm />} />
        <Route path="/fees/structure/new" element={<FeeStructureForm />} />

        <Route path="/attendance" element={<Attendance />} />

        <Route path="/classes" element={<Classes />} />

        <Route path="/exams" element={<Exams />} />
        <Route path="/exams/create" element={<ExamForm />} />
        <Route path="/exams/scores" element={<ExamScores />} />

        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const Reports = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [report, setReport] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            const res = await axios.get('http://localhost:5001/api/students');
            setStudents(res.data);
        };
        fetchStudents();
    }, []);

    const fetchReport = async () => {
        if (!selectedStudent) return;
        try {
            const res = await axios.get(`http://localhost:5001/api/reports/student/${selectedStudent}`);
            setReport(res.data);
        } catch (error) { console.error(error); }
    };

    return (
        <Layout>
            <h2 className="text-2xl font-semibold mb-6">Student Reports</h2>
            <div className="bg-white p-6 rounded shadow mb-6 flex gap-4 items-end">
                <div className="flex-1">
                    <label className="block mb-2">Select Student</label>
                    <select
                        className="w-full border p-2 rounded"
                        value={selectedStudent}
                        onChange={e => setSelectedStudent(e.target.value)}
                    >
                        <option value="">Select Student</option>
                        {students.map(s => (
                            <option key={s._id} value={s._id}>{s.name} (Class {s.classId || '?'})</option>
                        ))}
                    </select>
                </div>
                <button onClick={fetchReport} className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 h-10">
                    Generate Report
                </button>
            </div>

            {report && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-xl font-bold mb-4">Profile</h3>
                        <p><strong>Name:</strong> {report.student.name}</p>
                        <p><strong>Parent:</strong> {report.student.parentName}</p>
                        <p><strong>Phone:</strong> {report.student.phone}</p>
                    </div>

                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-xl font-bold mb-4">Fees</h3>
                        <p><strong>Total Due:</strong> ${report.fees.due}</p>
                        <p><strong>Paid:</strong> ${report.fees.paid}</p>
                        <p className={report.fees.balance > 0 ? 'text-red-500 font-bold' : 'text-green-500 font-bold'}>
                            <strong>Balance:</strong> ${report.fees.balance}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-xl font-bold mb-4">Attendance</h3>
                        <p><strong>Total Days:</strong> {report.attendance.total}</p>
                        {/* Backend logic for present/absent currently simplistic or mocked */}
                        <p><strong>Present:</strong> {report.attendance.present}</p>
                        <p><strong>Absent:</strong> {report.attendance.absent}</p>
                    </div>

                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-xl font-bold mb-4">Exam Results</h3>
                        <table className="w-full">
                            <thead>
                                <tr className="text-left border-b">
                                    <th>Subject</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {report.scores.map((s, i) => (
                                    <tr key={i} className="border-b">
                                        <td className="py-2">{s.subject}</td>
                                        <td className="py-2">{s.score}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Reports;

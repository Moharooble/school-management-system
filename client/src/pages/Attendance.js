import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const Attendance = () => {
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState({});

    useEffect(() => {
        const fetchClasses = async () => {
            const res = await axios.get('http://localhost:5001/api/classes');
            setClasses(res.data);
        };
        fetchClasses();
    }, []);

    useEffect(() => {
        if (selectedClass) {
            fetchStudents();
        }
    }, [selectedClass]);

    const fetchStudents = async () => {
        const res = await axios.get('http://localhost:5001/api/students');
        // Filter by class (client side for simplicity or backend param)
        // Ideally backend should filter: /api/students?classId=...
        // Assuming fetch all for now and filtering here
        const filtered = res.data.filter(s => s.classId === selectedClass);
        setStudents(filtered);

        // Initialize attendance state with Present (true) by default
        const initial = {};
        filtered.forEach(s => initial[s._id] = 'Present');
        setAttendance(initial);
    };

    const handleStatusChange = (id, status) => {
        setAttendance({ ...attendance, [id]: status });
    };

    const handleSubmit = async () => {
        const records = Object.keys(attendance).map(studentId => ({
            studentId,
            status: attendance[studentId]
        }));

        try {
            await axios.post('http://localhost:5001/api/attendance', {
                date,
                classId: selectedClass,
                records
            });
            alert('Attendance Saved!');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Layout>
            <h2 className="text-2xl font-semibold mb-6">Attendance</h2>
            <div className="bg-white p-6 rounded shadow mb-6 flex gap-4">
                <div>
                    <label className="block mb-1">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        className="border p-2 rounded"
                    />
                </div>
                <div>
                    <label className="block mb-1">Class</label>
                    <select
                        value={selectedClass}
                        onChange={e => setSelectedClass(e.target.value)}
                        className="border p-2 rounded w-48"
                    >
                        <option value="">Select Class</option>
                        {classes.map(c => (
                            <option key={c._id} value={c._id}>{c.name} {c.section}</option>
                        ))}
                    </select>
                </div>
            </div>

            {selectedClass && (
                <div className="bg-white shadow rounded overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3">Name</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(s => (
                                <tr key={s._id} className="border-b">
                                    <td className="p-3">{s.name}</td>
                                    <td className="p-3">
                                        <div className="flex gap-4">
                                            <label className="flex items-center gap-1 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name={`status-${s._id}`}
                                                    checked={attendance[s._id] === 'Present'}
                                                    onChange={() => handleStatusChange(s._id, 'Present')}
                                                /> Present
                                            </label>
                                            <label className="flex items-center gap-1 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name={`status-${s._id}`}
                                                    checked={attendance[s._id] === 'Absent'}
                                                    onChange={() => handleStatusChange(s._id, 'Absent')}
                                                /> Absent
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {students.length === 0 && (
                                <tr><td colSpan="2" className="p-4 text-gray-500">No students in this class.</td></tr>
                            )}
                        </tbody>
                    </table>
                    {students.length > 0 && (
                        <div className="p-4 bg-gray-50 border-t">
                            <button onClick={handleSubmit} className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700">Save Attendance</button>
                        </div>
                    )}
                </div>
            )}
        </Layout>
    );
};

export default Attendance;

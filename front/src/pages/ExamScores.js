import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const ExamScores = () => {
    const [exams, setExams] = useState([]);
    const [classes, setClasses] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedExam, setSelectedExam] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [scores, setScores] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const [examRes, classRes, studentRes] = await Promise.all([
                axios.get('http://localhost:5001/api/exams/exams'),
                axios.get('http://localhost:5001/api/classes'),
                axios.get('http://localhost:5001/api/students')
            ]);
            setExams(examRes.data);
            setClasses(classRes.data);
            setStudents(studentRes.data);
        };
        fetchData();
    }, []);

    const filteredStudents = students.filter(s => s.classId === selectedClass);

    const handleScoreChange = (studentId, score) => {
        setScores({ ...scores, [studentId]: score });
    };

    const handleSubmit = async () => {
        const promises = Object.keys(scores).map(studentId => {
            return axios.post('http://localhost:5001/api/exams/scores', {
                examId: selectedExam,
                studentId,
                score: scores[studentId],
                subject: 'Math' // Hardcoded for simplicity, should be selected
            });
        });
        await Promise.all(promises);
        alert('Scores Saved!');
    };

    return (
        <Layout>
            <h2 className="text-2xl font-semibold mb-6">Record Exam Scores</h2>
            <div className="bg-white p-6 rounded shadow mb-6 flex gap-4">
                <div>
                    <label className="block mb-1">Exam</label>
                    <select
                        value={selectedExam}
                        onChange={e => setSelectedExam(e.target.value)}
                        className="border p-2 rounded w-48"
                    >
                        <option value="">Select Exam</option>
                        {exams.map(e => (
                            <option key={e._id} value={e._id}>{e.name}</option>
                        ))}
                    </select>
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

            {selectedExam && selectedClass && (
                <div className="bg-white shadow rounded overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3">Student</th>
                                <th className="p-3">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map(s => (
                                <tr key={s._id} className="border-b">
                                    <td className="p-3">{s.name}</td>
                                    <td className="p-3">
                                        <input
                                            type="number"
                                            className="border p-1 w-20 rounded"
                                            onChange={(e) => handleScoreChange(s._id, e.target.value)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="p-4 bg-gray-50 border-t">
                        <button onClick={handleSubmit} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Save Scores</button>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default ExamScores;

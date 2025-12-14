import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Exams = () => {
    const [exams, setExams] = useState([]);

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const res = await axios.get('http://localhost:5001/api/exams/exams');
                setExams(res.data);
            } catch (error) { console.error(error); }
        };
        fetchExams();
    }, []);

    return (
        <Layout>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Exams</h2>
                <div className="space-x-2">
                    <Link to="/exams/create" className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
                        Create Exam
                    </Link>
                    <Link to="/exams/scores" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Record Scores
                    </Link>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3">Exam Name</th>
                            <th className="p-3">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exams.map(e => (
                            <tr key={e._id} className="border-b">
                                <td className="p-3">{e.name}</td>
                                <td className="p-3">{e.date}</td>
                            </tr>
                        ))}
                        {exams.length === 0 && <tr><td colSpan="2" className="p-4 text-gray-500">No exams found.</td></tr>}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default Exams;

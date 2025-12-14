import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Students = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchStudents = async () => {
        try {
            const res = await axios.get('http://localhost:5001/api/students');
            setStudents(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await axios.delete(`http://localhost:5001/api/students/${id}`);
                fetchStudents();
            } catch (error) {
                console.error(error);
            }
        }
    };

    if (loading) return <Layout><div>Loading...</div></Layout>;

    return (
        <Layout>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Students</h2>
                <Link to="/students/add" className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700">
                    Add Student
                </Link>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 border-b">Name</th>
                            <th className="py-3 px-4 border-b">Class</th>
                            <th className="py-3 px-4 border-b">Parent</th>
                            <th className="py-3 px-4 border-b">Phone</th>
                            <th className="py-3 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student._id} className="hover:bg-gray-50 border-b">
                                <td className="py-3 px-4">{student.name}</td>
                                <td className="py-3 px-4">{student.classId || 'N/A'}</td> {/* Ideally resolve class name */}
                                <td className="py-3 px-4">{student.parentName}</td>
                                <td className="py-3 px-4">{student.phone}</td>
                                <td className="py-3 px-4 flex gap-2">
                                    <Link to={`/students/edit/${student._id}`} className="text-blue-600 hover:text-blue-800">Edit</Link>
                                    <button onClick={() => handleDelete(student._id)} className="text-red-600 hover:text-red-800">Delete</button>
                                </td>
                            </tr>
                        ))}
                        {students.length === 0 && (
                            <tr>
                                <td colSpan="5" className="py-4 text-center text-gray-500">No students found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default Students;

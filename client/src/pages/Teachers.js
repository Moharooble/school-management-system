import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Teachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTeachers = async () => {
        try {
            const res = await axios.get('http://localhost:5001/api/teachers');
            setTeachers(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this teacher?')) {
            try {
                await axios.delete(`http://localhost:5001/api/teachers/${id}`);
                fetchTeachers();
            } catch (error) {
                console.error(error);
            }
        }
    };

    if (loading) return <Layout><div>Loading...</div></Layout>;

    return (
        <Layout>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Teachers</h2>
                <Link to="/teachers/add" className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700">
                    Add Teacher
                </Link>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 border-b">Name</th>
                            <th className="py-3 px-4 border-b">Subject</th>
                            <th className="py-3 px-4 border-b">Email</th>
                            <th className="py-3 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map((teacher) => (
                            <tr key={teacher._id} className="hover:bg-gray-50 border-b">
                                <td className="py-3 px-4">{teacher.name}</td>
                                <td className="py-3 px-4">{teacher.subject}</td>
                                <td className="py-3 px-4">{teacher.email}</td>
                                <td className="py-3 px-4 flex gap-2">
                                    <Link to={`/teachers/edit/${teacher._id}`} className="text-blue-600 hover:text-blue-800">Edit</Link>
                                    <button onClick={() => handleDelete(teacher._id)} className="text-red-600 hover:text-red-800">Delete</button>
                                </td>
                            </tr>
                        ))}
                        {teachers.length === 0 && (
                            <tr>
                                <td colSpan="4" className="py-4 text-center text-gray-500">No teachers found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default Teachers;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';

const TeacherForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        email: '',
    });

    useEffect(() => {
        if (isEdit) {
            const fetchTeacher = async () => {
                try {
                    const res = await axios.get(`http://localhost:5001/api/teachers/${id}`);
                    setFormData(res.data);
                } catch (err) {
                    console.error(err);
                }
            };
            fetchTeacher();
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await axios.put(`http://localhost:5001/api/teachers/${id}`, formData);
            } else {
                await axios.post('http://localhost:5001/api/teachers', formData);
            }
            navigate('/teachers');
        } catch (error) {
            console.error(error);
            alert('Error saving teacher');
        }
    };

    return (
        <Layout>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{isEdit ? 'Edit Teacher' : 'Add Teacher'}</h2>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-teal-500 outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Subject</label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-teal-500 outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-teal-500 outline-none"
                        />
                    </div>

                    <div className="pt-4">
                        <button type="submit" className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 w-full">
                            {isEdit ? 'Update Teacher' : 'Create Teacher'}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default TeacherForm;

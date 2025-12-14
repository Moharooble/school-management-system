import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';

const StudentForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        name: '',
        classId: '', // Ideally a select dropdown from Classes API
        parentName: '',
        phone: '',
    });
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const res = await axios.get('http://localhost:5001/api/classes');
                setClasses(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchClasses();

        if (isEdit) {
            const fetchStudent = async () => {
                try {
                    const res = await axios.get(`http://localhost:5001/api/students/${id}`);
                    setFormData(res.data);
                } catch (err) {
                    console.error(err);
                }
            };
            fetchStudent();
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await axios.put(`http://localhost:5001/api/students/${id}`, formData);
            } else {
                await axios.post('http://localhost:5001/api/students', formData);
            }
            navigate('/students');
        } catch (error) {
            console.error(error);
            alert('Error saving student');
        }
    };

    return (
        <Layout>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{isEdit ? 'Edit Student' : 'Add Student'}</h2>
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
                        <label className="block text-gray-700">Class</label>
                        <select
                            name="classId"
                            value={formData.classId}
                            onChange={handleChange}
                            className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-teal-500 outline-none"
                        >
                            <option value="">Select Class</option>
                            {classes.map((cls) => (
                                <option key={cls._id} value={cls._id}>
                                    {cls.name} {cls.section}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">Parent Name</label>
                        <input
                            type="text"
                            name="parentName"
                            value={formData.parentName}
                            onChange={handleChange}
                            className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-teal-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-teal-500 outline-none"
                        />
                    </div>

                    <div className="pt-4">
                        <button type="submit" className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 w-full">
                            {isEdit ? 'Update Student' : 'Create Student'}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default StudentForm;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const ExamForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', date: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5001/api/exams/exams', formData);
            navigate('/exams');
        } catch (error) { console.error(error); }
    };

    return (
        <Layout>
            <h2 className="text-2xl font-semibold mb-6">Create Exam</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-lg">
                <div className="mb-4">
                    <label className="block mb-2">Exam Name</label>
                    <input
                        className="w-full border p-2 rounded"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Date</label>
                    <input
                        type="date"
                        className="w-full border p-2 rounded"
                        value={formData.date}
                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700">Save</button>
            </form>
        </Layout>
    );
};

export default ExamForm;

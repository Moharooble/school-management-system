import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const FeeStructureForm = () => {
    const navigate = useNavigate();
    const [classes, setClasses] = useState([]);
    const [formData, setFormData] = useState({
        classId: '',
        className: '', // We should ideally lookup name from ID
        amount: '',
        currency: 'USD'
    });

    useEffect(() => {
        const fetchClasses = async () => {
            const res = await axios.get('http://localhost:5001/api/classes');
            setClasses(res.data);
        };
        fetchClasses();
    }, []);

    const handleChange = (e) => {
        if (e.target.name === 'classId') {
            const cls = classes.find(c => c._id === e.target.value);
            setFormData({
                ...formData,
                classId: e.target.value,
                className: cls ? cls.name : ''
            });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5001/api/fees/structure', formData);
            navigate('/fees');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Layout>
            <h2 className="text-2xl font-semibold mb-6">Add Fee Structure</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-lg">
                <div className="mb-4">
                    <label className="block mb-2">Class</label>
                    <select
                        name="classId"
                        className="w-full border p-2 rounded"
                        value={formData.classId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Class</option>
                        {classes.map(c => (
                            <option key={c._id} value={c._id}>{c.name} {c.section}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Amount</label>
                    <input
                        type="number"
                        name="amount"
                        className="w-full border p-2 rounded"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700">
                    Save Structure
                </button>
            </form>
        </Layout>
    );
};

export default FeeStructureForm;

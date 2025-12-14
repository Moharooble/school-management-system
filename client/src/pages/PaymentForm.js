import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const PaymentForm = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        studentId: '',
        amount: '',
        months: ''
    });

    useEffect(() => {
        const fetchStudents = async () => {
            const res = await axios.get('http://localhost:5001/api/students');
            setStudents(res.data);
        };
        fetchStudents();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5001/api/fees/payments', formData);
            navigate('/fees');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Layout>
            <h2 className="text-2xl font-semibold mb-6">Record Payment</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-lg">
                <div className="mb-4">
                    <label className="block mb-2">Student</label>
                    <select
                        className="w-full border p-2 rounded"
                        value={formData.studentId}
                        onChange={e => setFormData({ ...formData, studentId: e.target.value })}
                        required
                    >
                        <option value="">Select Student</option>
                        {students.map(s => (
                            <option key={s._id} value={s._id}>{s.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Amount</label>
                    <input
                        type="number"
                        className="w-full border p-2 rounded"
                        value={formData.amount}
                        onChange={e => setFormData({ ...formData, amount: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
                    Submit Payment
                </button>
            </form>
        </Layout>
    );
};

export default PaymentForm;

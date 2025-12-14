import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Fees = () => {
    const [structures, setStructures] = useState([]);
    const [payments, setPayments] = useState([]);
    const [activeTab, setActiveTab] = useState('payments'); // 'payments' or 'structure'

    useEffect(() => {
        fetchStructures();
        fetchPayments();
    }, []);

    const fetchStructures = async () => {
        try {
            const res = await axios.get('http://localhost:5001/api/fees/structure');
            setStructures(res.data);
        } catch (error) { console.error(error); }
    };

    const fetchPayments = async () => {
        try {
            const res = await axios.get('http://localhost:5001/api/fees/payments');
            setPayments(res.data);
        } catch (error) { console.error(error); }
    };

    return (
        <Layout>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Fees Management</h2>
                <div className="space-x-2">
                    <button
                        onClick={() => setActiveTab('payments')}
                        className={`px-4 py-2 rounded ${activeTab === 'payments' ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}
                    >
                        Payments
                    </button>
                    <button
                        onClick={() => setActiveTab('structure')}
                        className={`px-4 py-2 rounded ${activeTab === 'structure' ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}
                    >
                        Fee Structures
                    </button>
                </div>
            </div>

            {activeTab === 'payments' && (
                <div>
                    <div className="flex justify-end mb-4">
                        <Link to="/fees/payment/new" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                            Record Payment
                        </Link>
                    </div>
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-3">Student ID</th>
                                    <th className="p-3">Amount</th>
                                    <th className="p-3">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map(p => (
                                    <tr key={p._id} className="border-b">
                                        <td className="p-3">{p.studentId}</td>
                                        <td className="p-3">${p.amount}</td>
                                        <td className="p-3">{new Date(p.date).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'structure' && (
                <div>
                    <div className="flex justify-end mb-4">
                        <Link to="/fees/structure/new" className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
                            Add Fee Structure
                        </Link>
                    </div>
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-3">Class</th>
                                    <th className="p-3">Amount</th>
                                    <th className="p-3">Currency</th>
                                </tr>
                            </thead>
                            <tbody>
                                {structures.map(s => (
                                    <tr key={s._id} className="border-b">
                                        <td className="p-3">{s.className}</td>
                                        <td className="p-3">{s.amount}</td>
                                        <td className="p-3">{s.currency}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Fees;

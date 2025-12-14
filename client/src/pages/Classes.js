import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const [newClass, setNewClass] = useState({ name: '', section: '' });

    const fetchClasses = async () => {
        const res = await axios.get('http://localhost:5001/api/classes');
        setClasses(res.data);
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5001/api/classes', newClass);
        setNewClass({ name: '', section: '' });
        fetchClasses();
    };

    return (
        <Layout>
            <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Classes</h2>

                <form onSubmit={handleAdd} className="flex gap-2 bg-white p-4 rounded shadow">
                    <input
                        placeholder="Grade Name (e.g Grade 1)"
                        className="border p-2 rounded"
                        value={newClass.name}
                        onChange={e => setNewClass({ ...newClass, name: e.target.value })}
                        required
                    />
                    <input
                        placeholder="Section (e.g A)"
                        className="border p-2 rounded w-24"
                        value={newClass.section}
                        onChange={e => setNewClass({ ...newClass, section: e.target.value })}
                        required
                    />
                    <button className="bg-teal-600 text-white px-4 rounded hover:bg-teal-700">Add</button>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {classes.map(c => (
                    <div key={c._id} className="bg-white p-6 rounded shadow border-l-4 border-teal-500">
                        <h3 className="text-xl font-bold">{c.name}</h3>
                        <p className="text-gray-600">Section: {c.section}</p>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Classes;

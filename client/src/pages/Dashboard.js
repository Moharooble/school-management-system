import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const Dashboard = () => {
    const [stats, setStats] = useState({
        students: 0,
        teachers: 0,
        classes: 0,
        income: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Assuming proxy or CORS set correctly
                const res = await axios.get('http://localhost:5001/api/reports/dashboard');
                setStats(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching stats", error);
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const cards = [
        { label: 'Total Students', value: stats.students, color: 'bg-blue-500' },
        { label: 'Total Teachers', value: stats.teachers, color: 'bg-green-500' },
        { label: 'Classes', value: stats.classes, color: 'bg-purple-500' },
        { label: 'Total Income', value: `$${stats.income}`, color: 'bg-yellow-500' },
    ];

    if (loading) return <Layout><div>Loading...</div></Layout>;

    return (
        <Layout>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card) => (
                    <div key={card.label} className={`${card.color} rounded-lg shadow-lg p-6 text-white`}>
                        <h3 className="text-sm font-medium opacity-80">{card.label}</h3>
                        <p className="text-3xl font-bold mt-2">{card.value}</p>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Dashboard;

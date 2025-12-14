import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', path: '/' },
        { name: 'Students', path: '/students' },
        { name: 'Teachers', path: '/teachers' },
        { name: 'Classes', path: '/classes' },
        { name: 'Fees', path: '/fees' },
        { name: 'Attendance', path: '/attendance' },
        { name: 'Exams', path: '/exams' },
        { name: 'Reports', path: '/reports' },
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-slate-800 text-white flex flex-col">
                <div className="p-6 text-2xl font-bold bg-slate-900 text-teal-400">
                    Dugsi Manager
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`block px-4 py-3 rounded-md transition-colors ${location.pathname === item.path
                                    ? 'bg-teal-600 text-white'
                                    : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm h-16 flex items-center px-6 justify-between">
                    <h1 className="text-xl font-semibold text-gray-800">
                        {menuItems.find(i => i.path === location.pathname)?.name || 'Dugsi Management'}
                    </h1>
                    <div className="text-gray-500">
                        User: Admin
                    </div>
                </header>
                <main className="flex-1 overflow-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;

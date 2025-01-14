import React from 'react';
import TotalCounts from '../components/dashboard/TotalCounts';
import PopularPosts from '../components/dashboard/PopularPosts';
import EngagementSection from '../components/dashboard/EngagementSection';

const Dashboard = () => {

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <header className="w-full p-6 bg-green-600 text-white shadow-md">
                <h1 className="text-2xl font-bold">Dashboard</h1>
            </header>

            <main className="flex flex-col gap-8 px-6 py-8 md:px-12">
                <TotalCounts />
                <PopularPosts />
                <EngagementSection />
            </main>
        </div>
    );
};

export default Dashboard;

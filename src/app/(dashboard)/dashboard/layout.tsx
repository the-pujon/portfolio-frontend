import React from 'react';
import Sidebar from '@/components/shared/Sidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 p-8 mt-10">{children}</main>
        </div>
    );
};

export default DashboardLayout;

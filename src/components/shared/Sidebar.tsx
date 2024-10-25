'use client'

import React from 'react';
import Link from 'next/link';
import {
    User,
    GraduationCap,
    Briefcase,
    PenTool,
    FolderKanban,
    Lightbulb,
    Award,
    Scroll,
    FolderTree,
    GitFork,
    PhoneCall,
    Edit
} from 'lucide-react';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const pathname = usePathname();

    const sidebarItems = [
        { name: 'Profile',icon: User,path: '/dashboard' },
        { name: 'Edit Profile',icon: Edit,path: '/dashboard/edit-profile' },
        { name: 'Add Education',icon: GraduationCap,path: '/dashboard/education' },
        { name: 'Add Experience',icon: Briefcase,path: '/dashboard/experience' },
        { name: 'Add Blogs',icon: PenTool,path: '/dashboard/blogs' },
        { name: 'Add Projects',icon: FolderKanban,path: '/dashboard/projects' },
        { name: 'Add Skills',icon: Lightbulb,path: '/dashboard/skills' },
        { name: 'Add Awards',icon: Award,path: '/dashboard/awards' },
        { name: 'Add Certifications',icon: Scroll,path: '/dashboard/certifications' },
        { name: 'Add Project Categories',icon: FolderTree,path: '/dashboard/project-categories' },
        { name: 'Add Project Sub Categories',icon: GitFork,path: '/dashboard/project-subcategories' },
        { name: 'Contact Details',icon: PhoneCall,path: '/dashboard/contact' },
    ];

    return (
        <div className="w-64 h-screen bg-background border-r border-border mt-14 sticky top-14 self-start">
            <div className="p-4">
                <h2 className="text-2xl font-bold text-primary">Dashboard</h2>
            </div>
            <nav className="mt-8">
                {sidebarItems.map((item) => (
                    <Link key={item.name} href={item.path}>
                        <span
                            className={`flex items-center px-6 py-3 text-sm font-medium ${pathname === item.path
                                ? 'bg-primary/10 text-primary'
                                : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                                }`}
                        >
                            <item.icon className="w-5 h-5 mr-3" />
                            {item.name}
                        </span>
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;

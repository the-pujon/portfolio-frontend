// frontend/src/app/(dashboard)/dashboard/project-management/ProjectManagement.tsx
'use client'; // Add this line

import React,{ useState,useEffect } from 'react';
import { useGetAllProjectsQuery } from '@/redux/features/project/projectApi';
import ProjectTable from './ProjectTable';
import ProjectDialog from './ProjectDialog';
import { Project } from '@/types/project';

const ProjectManagement = () => {
    const { data: projectsData,isLoading,refetch } = useGetAllProjectsQuery({});
    const [projects,setProjects] = useState<Project[]>([]);

    useEffect(() => {
        if (projectsData) {
            setProjects(projectsData.data);
        }
    },[projectsData]);

    const handleProjectChange = () => {
        refetch(); // Ensure this doesn't cause an infinite loop
    };

    if (isLoading) {
        return <div>Loading projects...</div>;
    }

    return (
        <div className="container mx-auto py-10">
            <div className='flex w-full justify-between items-center'>
                <h1 className="text-3xl font-bold">Project Management</h1>
                <ProjectDialog onProjectChange={handleProjectChange} />
            </div>
            <ProjectTable projects={projects} onProjectChange={handleProjectChange} />
        </div>
    );
};

export default ProjectManagement;
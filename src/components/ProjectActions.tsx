// frontend/src/components/ProjectActions.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
// frontend/src/app/(dashboard)/dashboard/project-management/ProjectActions.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Pencil,Trash2 } from 'lucide-react';
import { useDeleteProjectMutation } from '@/redux/features/project/projectApi';
import { toast } from 'sonner';
import { Project } from '@/types/project';

interface ProjectActionsProps {
    project: Project;
    onProjectChange: () => void;
}

const ProjectActions: React.FC<ProjectActionsProps> = ({ project,onProjectChange }) => {
    const [deleteProject] = useDeleteProjectMutation();

    const handleDeleteProject = async (id: string) => {
        try {
            await deleteProject({ id }).unwrap();
            toast.success('Project deleted successfully');
            onProjectChange();
        } catch (error) {
            toast.error('Failed to delete project');
        }
    };

    return (
        <div className="flex space-x-2">
            <Button
                variant="outline"
                size="sm"
                onClick={() => {
                    // Logic to open edit dialog
                }}
            >
                <Pencil className="h-4 w-4" />
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={() => handleDeleteProject(project._id!)}
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default ProjectActions;
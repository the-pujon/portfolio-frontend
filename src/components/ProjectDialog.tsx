// frontend/src/components/ProjectDialog.tsx
'use client'; // Add this line

import React,{ useState } from 'react';
import { Dialog,DialogContent,DialogHeader,DialogTitle,DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import ProjectForm from '@/components/ProjectForm';
import { useCreateProjectMutation } from '@/redux/features/project/projectApi';
import { toast } from 'sonner';
import { Project } from '@/types/project';
import { Plus } from 'lucide-react';

interface ProjectDialogProps {
    onProjectChange: () => void;
}

const ProjectDialog: React.FC<ProjectDialogProps> = ({ onProjectChange }) => {
    const [isAddDialogOpen,setIsAddDialogOpen] = useState<boolean>(false);
    const [createProject] = useCreateProjectMutation();

    const handleAddProject = async (project: Project) => {
        try {
            await createProject({ ...project }).unwrap();
            setIsAddDialogOpen(false);
            toast.success('Project added successfully');
            onProjectChange();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error('Failed to add project');
        }
    };

    return (
        <div className="flex justify-between items-center mb-6">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                    <Button><Plus className="mr-2 h-4 w-4" /> Add Project</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-fit h-[90vh] overflow-y-scroll">
                    <DialogHeader>
                        <DialogTitle>Add New Project</DialogTitle>
                    </DialogHeader>
                    <ProjectForm onSubmit={handleAddProject} />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ProjectDialog;
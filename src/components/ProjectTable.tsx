// frontend/src/app/(dashboard)/dashboard/project-management/ProjectTable.tsx
import React from 'react';
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from '@/components/ui/table';
//import ProjectActions from './ProjectActions';
import { Project } from '@/types/project';
import { Badge } from '@/components/ui/badge';
import { Popover,PopoverContent,PopoverTrigger } from '@/components/ui/popover';
import ProjectActions from './ProjectActions';

interface ProjectTableProps {
    projects: Project[];
    onProjectChange: (project: Project) => void;
}

const ProjectTable: React.FC<ProjectTableProps> = ({ projects,onProjectChange }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Team Size</TableHead>
                    <TableHead>Technologies</TableHead>
                    <TableHead>Links</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {projects.map((project) => (
                    <TableRow key={project._id}>
                        <TableCell className="font-medium">{project.title}</TableCell>
                        <TableCell>{project.category}</TableCell>
                        <TableCell>
                            <Badge variant={project.projectStatus === 'Completed' ? 'default' : 'destructive'}>
                                {project.projectStatus}
                            </Badge>
                        </TableCell>
                        <TableCell>{project.projectType}</TableCell>
                        <TableCell>{project.projectDuration}</TableCell>
                        <TableCell>{project.projectTeamSize}</TableCell>
                        <TableCell>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <div className="flex flex-wrap gap-1 cursor-pointer">
                                        {project.technologies?.slice(0,3).map((tech,index) => (
                                            <Badge key={index} variant="outline">{tech}</Badge>
                                        ))}
                                        {project.technologies && project.technologies.length > 3 && (
                                            <Badge variant="outline">+{project.technologies.length - 3}</Badge>
                                        )}
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className="grid gap-2">
                                        <h4 className="font-semibold">All Technologies</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {project.technologies?.map((tech,index) => (
                                                <Badge key={index} variant="outline">{tech}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </TableCell>
                        <TableCell>
                            <ProjectActions project={project} onProjectChange={() => onProjectChange(project)} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default ProjectTable;
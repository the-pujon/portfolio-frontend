///* eslint-disable @typescript-eslint/no-unused-vars */
//'use client'

//import React,{ useState,useEffect } from 'react'
//import { Button } from '@/components/ui/button'
//import { Dialog,DialogContent,DialogHeader,DialogTitle,DialogTrigger } from '@/components/ui/dialog'
//import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from '@/components/ui/table'
//import { Plus,Pencil,Trash2,ExternalLink,Github } from 'lucide-react'
//import ProjectForm from '@/components/ProjectForm'
//import { toast } from 'sonner'
//import { Project } from '@/types/project'
//import { Badge } from '@/components/ui/badge'
//import { Popover,PopoverContent,PopoverTrigger } from '@/components/ui/popover'
//import { useAppSelector } from '@/redux/hook'
//import { selectCurrentUser } from '@/redux/features/auth/authSlice'
//import { useCreateProjectMutation,useGetAllProjectsQuery,useUpdateProjectMutation,useDeleteProjectMutation } from '@/redux/features/project/projectApi'

//const ProjectManagement = () => {
//    const currentUser = useAppSelector(selectCurrentUser)
//    const { data: projectsData,isLoading,refetch } = useGetAllProjectsQuery({})
//    const [createProject,{ isLoading: isCreating }] = useCreateProjectMutation()
//    const [updateProject,{ isLoading: isUpdating }] = useUpdateProjectMutation()
//    const [deleteProject,{ isLoading: isDeleting }] = useDeleteProjectMutation()

//    const [projects,setProjects] = useState<Project[]>([])
//    const [isAddDialogOpen,setIsAddDialogOpen] = useState(false)
//    const [isEditDialogOpen,setIsEditDialogOpen] = useState(false)
//    const [selectedProject,setSelectedProject] = useState<Project | null>(null)

//    useEffect(() => {
//        if (projectsData) {
//            setProjects(projectsData.data)
//        }
//    },[projectsData])

//    const handleAddProject = async (project: Project) => {
//        try {
//            await createProject({ ...project,userId: currentUser?._id }).unwrap()
//            setIsAddDialogOpen(false)
//            toast.success('Project added successfully')
//            refetch()
//        } catch (error) {
//            toast.error('Failed to add project')
//        }
//    }

//    const handleUpdateProject = async (updatedProject: Project) => {
//        try {
//            await updateProject({ id: updatedProject._id,data: { ...updatedProject,userId: currentUser?._id } }).unwrap()
//            setIsEditDialogOpen(false)
//            toast.success('Project updated successfully')
//            refetch()
//        } catch (error) {
//            toast.error('Failed to update project')
//        }
//    }

//    const handleDeleteProject = async (id: string) => {
//        try {
//            await deleteProject({ id,userId: currentUser?._id }).unwrap()
//            toast.success('Project deleted successfully')
//            refetch()
//        } catch (error) {
//            toast.error('Failed to delete project')
//        }
//    }

//    if (isLoading) {
//        return <div>Loading projects...</div>
//    }

//    return (
//        <div className="container mx-auto py-10">
//            <div className="flex justify-between items-center mb-6">
//                <h1 className="text-3xl font-bold">Project Management</h1>
//                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
//                    <DialogTrigger asChild>
//                        <Button><Plus className="mr-2 h-4 w-4" /> Add Project</Button>
//                    </DialogTrigger>
//                    <DialogContent className="sm:max-w-fit h-[90vh] overflow-y-scroll">
//                        <DialogHeader>
//                            <DialogTitle>Add New Project</DialogTitle>
//                        </DialogHeader>
//                        <ProjectForm onSubmit={handleAddProject} />
//                    </DialogContent>
//                </Dialog>
//            </div>

//            <Table>
//                <TableHeader>
//                    <TableRow>
//                        <TableHead>Title</TableHead>
//                        <TableHead>Category</TableHead>
//                        <TableHead>Status</TableHead>
//                        <TableHead>Type</TableHead>
//                        <TableHead>Duration</TableHead>
//                        <TableHead>Team Size</TableHead>
//                        <TableHead>Technologies</TableHead>
//                        <TableHead>Links</TableHead>
//                        <TableHead>Actions</TableHead>
//                    </TableRow>
//                </TableHeader>
//                <TableBody>
//                    {projects.map((project) => (
//                        <TableRow key={project._id}>
//                            <TableCell className="font-medium">{project.title}</TableCell>
//                            <TableCell>{project.category}</TableCell>
//                            <TableCell>
//                                <Badge variant={project.projectStatus === 'Completed' ? 'default' : 'destructive'}>
//                                    {project.projectStatus}
//                                </Badge>
//                            </TableCell>
//                            <TableCell>{project.projectType}</TableCell>
//                            <TableCell>{project.projectDuration}</TableCell>
//                            <TableCell>{project.projectTeamSize}</TableCell>
//                            <TableCell>
//                                <Popover>
//                                    <PopoverTrigger asChild>
//                                        <div className="flex flex-wrap gap-1 cursor-pointer">
//                                            {project.technologies?.slice(0,3).map((tech,index) => (
//                                                <Badge key={index} variant="outline">{tech}</Badge>
//                                            ))}
//                                            {project.technologies && project.technologies.length > 3 && (
//                                                <Badge variant="outline">+{project.technologies.length - 3}</Badge>
//                                            )}
//                                        </div>
//                                    </PopoverTrigger>
//                                    <PopoverContent className="w-80">
//                                        <div className="grid gap-2">
//                                            <h4 className="font-semibold">All Technologies</h4>
//                                            <div className="flex flex-wrap gap-1">
//                                                {project.technologies?.map((tech,index) => (
//                                                    <Badge key={index} variant="outline">{tech}</Badge>
//                                                ))}
//                                            </div>
//                                        </div>
//                                    </PopoverContent>
//                                </Popover>
//                            </TableCell>
//                            <TableCell>
//                                <div className="flex space-x-2">
//                                    {project.liveLink && (
//                                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
//                                            <Button variant="outline" size="sm">
//                                                <ExternalLink className="h-4 w-4 mr-1" /> Live
//                                            </Button>
//                                        </a>
//                                    )}
//                                    {project.clientGithub && (
//                                        <a href={project.clientGithub} target="_blank" rel="noopener noreferrer">
//                                            <Button variant="outline" size="sm">
//                                                <Github className="h-4 w-4 mr-1" /> Client
//                                            </Button>
//                                        </a>
//                                    )}
//                                    {project.serverGithub && (
//                                        <a href={project.serverGithub} target="_blank" rel="noopener noreferrer">
//                                            <Button variant="outline" size="sm">
//                                                <Github className="h-4 w-4 mr-1" /> Server
//                                            </Button>
//                                        </a>
//                                    )}
//                                </div>
//                            </TableCell>
//                            <TableCell>
//                                <div className="flex space-x-2">
//                                    <Button
//                                        variant="outline"
//                                        size="sm"
//                                        onClick={() => {
//                                            setSelectedProject(project)
//                                            setIsEditDialogOpen(true)
//                                        }}
//                                    >
//                                        <Pencil className="h-4 w-4" />
//                                    </Button>
//                                    <Button
//                                        variant="outline"
//                                        size="sm"
//                                        onClick={() => handleDeleteProject(project._id!)}
//                                    >
//                                        <Trash2 className="h-4 w-4" />
//                                    </Button>
//                                </div>
//                            </TableCell>
//                        </TableRow>
//                    ))}
//                </TableBody>
//            </Table>

//            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//                <DialogContent className="sm:max-w-fit h-[90vh] overflow-y-scroll">
//                    <DialogHeader>
//                        <DialogTitle>Edit Project</DialogTitle>
//                    </DialogHeader>
//                    {selectedProject && (
//                        <ProjectForm project={selectedProject} onSubmit={handleUpdateProject} />
//                    )}
//                </DialogContent>
//            </Dialog>
//        </div>
//    )
//}

//export default ProjectManagement



import ProjectManagement from '@/components/ProjectManagement';
import React from 'react';

const ProjectManagementPage = () => {
    return (
        <div>
            <ProjectManagement />
        </div>
    );
};

export default ProjectManagementPage;
'use client'

import React,{ useState,useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog,DialogContent,DialogHeader,DialogTitle,DialogTrigger } from '@/components/ui/dialog'
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from '@/components/ui/table'
import { Plus,Pencil,Trash2,ExternalLink,Github } from 'lucide-react'
import ProjectForm from '@/components/ProjectForm'
import { toast } from 'sonner'
import { Project } from '@/types/project'
import { Badge } from '@/components/ui/badge'
import { Popover,PopoverContent,PopoverTrigger } from '@/components/ui/popover'

const demoProjects: Project[] = [
    {
        id: '1',
        title: 'E-commerce Platform',
        shortDescription: 'A full-featured online shopping platform',
        fullDescription: '<p>This e-commerce platform offers a seamless shopping experience with features like product search, cart management, and secure checkout.</p>',
        thumbnailImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        images: [
            'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
        ],
        videoDemo: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        liveLink: 'https://example-ecommerce.com',
        clientGithub: 'https://github.com/example/ecommerce-frontend',
        serverGithub: 'https://github.com/example/ecommerce-backend',
        category: 'Web',
        projectDuration: '6 months',
        projectTeamSize: '5',
        projectType: 'Client',
        projectStatus: 'Completed',
        projectStack: 'React, Node.js, MongoDB',
        projectChallenges: 'Implementing real-time inventory updates and handling high traffic loads',
        tags: ['e-commerce','web-app','responsive'],
        technologies: ['React','Node.js','MongoDB','Express','Redux'],
        keyFeatures: ['Product search','Cart management','Secure checkout','User reviews']
    },
    {
        id: '2',
        title: 'Task Management App',
        shortDescription: 'A collaborative task management solution',
        fullDescription: '<p>This task management app helps teams organize and track their projects efficiently with features like task assignment, due dates, and progress tracking.</p>',
        thumbnailImage: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
        images: [
            'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
            'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
        ],
        liveLink: 'https://example-taskmanager.com',
        clientGithub: 'https://github.com/example/taskmanager-frontend',
        serverGithub: 'https://github.com/example/taskmanager-backend',
        category: 'Web',
        projectDuration: '4 months',
        projectTeamSize: '3',
        projectType: 'Personal',
        projectStatus: 'In Progress',
        projectStack: 'Vue.js, Firebase',
        projectChallenges: 'Implementing real-time updates and offline functionality',
        tags: ['productivity','collaboration','project-management'],
        technologies: ['Vue.js','Firebase','Vuex','PWA'],
        keyFeatures: ['Task assignment','Due date tracking','Progress visualization','Team collaboration']
    }
]

const ProjectManagement = () => {
    const [projects,setProjects] = useState<Project[]>(demoProjects)
    const [isAddDialogOpen,setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen,setIsEditDialogOpen] = useState(false)
    const [selectedProject,setSelectedProject] = useState<Project | null>(null)

    useEffect(() => {
        // Fetch projects from API
        // setProjects(fetchedProjects)
    },[])

    const handleAddProject = async (project: Project) => {
        const newProject = { ...project,id: Date.now().toString() }
        setProjects([...projects,newProject])
        setIsAddDialogOpen(false)
        toast({ title: 'Project added successfully' })
    }

    const handleUpdateProject = async (updatedProject: Project) => {
        setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p))
        setIsEditDialogOpen(false)
        toast({ title: 'Project updated successfully' })
    }

    const handleDeleteProject = async (id: string) => {
        setProjects(projects.filter(p => p.id !== id))
        toast({ title: 'Project deleted successfully' })
    }

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Project Management</h1>
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
                        <TableRow key={project.id}>
                            <TableCell className="font-medium">{project.title}</TableCell>
                            <TableCell>{project.category}</TableCell>
                            <TableCell>
                                <Badge variant={project.projectStatus === 'Completed' ? 'success' : 'default'}>
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
                                <div className="flex space-x-2">
                                    {project.liveLink && (
                                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                                            <Button variant="outline" size="sm">
                                                <ExternalLink className="h-4 w-4 mr-1" /> Live
                                            </Button>
                                        </a>
                                    )}
                                    {project.clientGithub && (
                                        <a href={project.clientGithub} target="_blank" rel="noopener noreferrer">
                                            <Button variant="outline" size="sm">
                                                <Github className="h-4 w-4 mr-1" /> Client
                                            </Button>
                                        </a>
                                    )}
                                    {project.serverGithub && (
                                        <a href={project.serverGithub} target="_blank" rel="noopener noreferrer">
                                            <Button variant="outline" size="sm">
                                                <Github className="h-4 w-4 mr-1" /> Server
                                            </Button>
                                        </a>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setSelectedProject(project)
                                            setIsEditDialogOpen(true)
                                        }}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDeleteProject(project.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-fit h-[90vh] overflow-y-scroll">
                    <DialogHeader>
                        <DialogTitle>Edit Project</DialogTitle>
                    </DialogHeader>
                    {selectedProject && (
                        <ProjectForm project={selectedProject} onSubmit={handleUpdateProject} />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ProjectManagement

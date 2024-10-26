'use client'

import React,{ useState,KeyboardEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from '@/components/ui/select'
import { Project } from '@/types/project'
import dynamic from 'next/dynamic'
import ImageUpload from './ImageUpload'
import { Label } from '@/components/ui/label'
import { Card,CardContent,CardHeader,CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'

const RichTextEditor = dynamic(() => import('react-simple-wysiwyg'),{ ssr: false })

interface ProjectFormProps {
    project?: Project
    onSubmit: (project: Project) => void
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project,onSubmit }) => {
    const [formData,setFormData] = useState<Project>(project || {} as Project)
    const [thumbnailPreview,setThumbnailPreview] = useState<string | null>(project?.thumbnailImage || null)
    const [imagesPreview,setImagesPreview] = useState<string[]>(project?.images || [])

    const [tagInput,setTagInput] = useState('')
    const [techInput,setTechInput] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name,value } = e.target
        setFormData({ ...formData,[name]: value })
    }

    const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>,field: 'tags' | 'technologies') => {
        if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
            e.preventDefault()
            const newValue = e.currentTarget.value.trim()
            if (!formData[field]?.includes(newValue)) {
                setFormData({
                    ...formData,
                    [field]: [...(formData[field] || []),newValue]
                })
            }
            e.currentTarget.value = ''
            if (field === 'tags') setTagInput('')
            if (field === 'technologies') setTechInput('')
        }
    }

    const removeTag = (tag: string,field: 'tags' | 'technologies') => {
        setFormData({
            ...formData,
            [field]: formData[field]?.filter(t => t !== tag) || []
        })
    }

    const handleSelectChange = (name: string,value: string) => {
        setFormData({ ...formData,[name]: value })
    }

    const handleRichTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({ ...formData,fullDescription: e.target.value })
    }

    const handleThumbnailUpload = async (file: File) => {
        // Implement image upload logic here
        // For now, we'll just use a placeholder URL
        const url = URL.createObjectURL(file)
        setFormData({ ...formData,thumbnailImage: url })
        setThumbnailPreview(url)
    }

    const handleImagesUpload = async (files: FileList) => {
        // Implement multiple image upload logic here
        // For now, we'll just use placeholder URLs
        const urls = Array.from(files).map(file => URL.createObjectURL(file))
        setFormData({ ...formData,images: [...(formData.images || []),...urls] })
        setImagesPreview([...imagesPreview,...urls])
    }

    const handleImageDelete = (index: number) => {
        const newImages = [...(formData.images || [])]
        newImages.splice(index,1)
        setFormData({ ...formData,images: newImages })
        setImagesPreview(newImages)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-full mx-auto p-6 rounded-lg ">
            <Card className="overflow-hidden bg-none shadow-none border-none">
                <CardHeader className="bg-primary text-primary-foreground">
                    <CardTitle>Project Information</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Project Title</Label>
                            <Input id="title" name="title" value={formData.title || ''} onChange={handleChange} placeholder="Enter project title" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select name="category" onValueChange={(value) => handleSelectChange('category',value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select project category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="web">Web</SelectItem>
                                    <SelectItem value="mobile">Mobile</SelectItem>
                                    <SelectItem value="desktop">Desktop</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="shortDescription">Short Description</Label>
                        <Input id="shortDescription" name="shortDescription" value={formData.shortDescription || ''} onChange={handleChange} placeholder="Brief overview of the project" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="fullDescription">Full Description</Label>
                        <RichTextEditor
                            value={formData.fullDescription || ''}
                            onChange={handleRichTextChange}
                            className="min-h-[200px] border rounded-md bg-white"
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="overflow-hidden bg-none shadow-none border-none">
                <CardHeader className="bg-primary text-primary-foreground">
                    <CardTitle>Project Media</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Thumbnail Image</Label>
                            <ImageUpload onUpload={handleThumbnailUpload} preview={thumbnailPreview} />
                        </div>
                        <div className="space-y-2">
                            <Label>Project Images</Label>
                            <ImageUpload onUpload={handleImagesUpload} multiple preview={imagesPreview} onDelete={handleImageDelete} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="videoDemo">Video Demo URL</Label>
                        <Input id="videoDemo" name="videoDemo" value={formData.videoDemo || ''} onChange={handleChange} placeholder="Enter video demo URL" />
                    </div>
                </CardContent>
            </Card>

            <Card className="overflow-hidden bg-none shadow-none border-none">
                <CardHeader className="bg-primary text-primary-foreground">
                    <CardTitle>Project Links</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="liveLink">Live Project Link</Label>
                            <Input id="liveLink" name="liveLink" value={formData.liveLink || ''} onChange={handleChange} placeholder="Enter live project URL" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="clientGithub">Client GitHub Repository</Label>
                            <Input id="clientGithub" name="clientGithub" value={formData.clientGithub || ''} onChange={handleChange} placeholder="Enter client GitHub repo URL" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="serverGithub">Server GitHub Repository</Label>
                        <Input id="serverGithub" name="serverGithub" value={formData.serverGithub || ''} onChange={handleChange} placeholder="Enter server GitHub repo URL" />
                    </div>
                </CardContent>
            </Card>

            <Card className="overflow-hidden bg-none shadow-none border-none">
                <CardHeader className="bg-primary text-primary-foreground">
                    <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="projectDuration">Project Duration</Label>
                            <Input id="projectDuration" name="projectDuration" value={formData.projectDuration || ''} onChange={handleChange} placeholder="e.g., 3 months" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="projectTeamSize">Team Size</Label>
                            <Input id="projectTeamSize" name="projectTeamSize" value={formData.projectTeamSize || ''} onChange={handleChange} placeholder="Number of team members" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="projectType">Project Type</Label>
                            <Select name="projectType" onValueChange={(value) => handleSelectChange('projectType',value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select project type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="personal">Personal</SelectItem>
                                    <SelectItem value="client">Client</SelectItem>
                                    <SelectItem value="open-source">Open Source</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="projectStatus">Project Status</Label>
                        <Select name="projectStatus" onValueChange={(value) => handleSelectChange('projectStatus',value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select project status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="in-progress">In Progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="on-hold">On Hold</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Card className="overflow-hidden bg-none shadow-none border-none">
                <CardHeader className="bg-primary text-primary-foreground">
                    <CardTitle>Technical Details</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 p-6">
                    <div className="space-y-2">
                        <Label htmlFor="projectStack">Project Stack</Label>
                        <Textarea
                            id="projectStack"
                            name="projectStack"
                            value={formData.projectStack || ''}
                            onChange={handleChange}
                            placeholder="Describe the technologies used in the project"
                            className="min-h-[100px]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="projectChallenges">Project Challenges</Label>
                        <Textarea
                            id="projectChallenges"
                            name="projectChallenges"
                            value={formData.projectChallenges || ''}
                            onChange={handleChange}
                            placeholder="Describe the main challenges faced during the project"
                            className="min-h-[100px]"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="tags">Tags</Label>
                            <Input
                                id="tags"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={(e) => handleTagKeyDown(e,'tags')}
                                placeholder="Add tags (press Enter to add)"
                            />
                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.tags?.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-sm">
                                        {tag}
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="ml-1 h-4 w-4 p-0"
                                            onClick={() => removeTag(tag,'tags')}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="technologies">Technologies</Label>
                            <Input
                                id="technologies"
                                value={techInput}
                                onChange={(e) => setTechInput(e.target.value)}
                                onKeyDown={(e) => handleTagKeyDown(e,'technologies')}
                                placeholder="Add technologies (press Enter to add)"
                            />
                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.technologies?.map((tech) => (
                                    <Badge key={tech} variant="secondary" className="text-sm">
                                        {tech}
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="ml-1 h-4 w-4 p-0"
                                            onClick={() => removeTag(tech,'technologies')}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Button type="submit" className="w-full">Submit Project</Button>
        </form>
    )
}

export default ProjectForm
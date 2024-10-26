'use client'

import React,{ useState,useRef } from 'react'
import { Plus,Pencil,Trash2,X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card,CardFooter,CardHeader,CardTitle } from '@/components/ui/card'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'

interface Skill {
    category: string
    name: string
    image: string
}

const SkillManagementPage = () => {
    const [skills,setSkills] = useState<Skill[]>([
        {
            category: 'Programming',
            name: 'JavaScript',
            //description: 'Modern programming language for web development',
            image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=500&q=80',
        },
        {
            category: 'Design',
            name: 'UI/UX Design',
            //description: 'Creating user-friendly and visually appealing interfaces',
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&q=80',
        },
        {
            category: 'Data Science',
            name: 'Machine Learning',
            //description: 'Developing algorithms that learn from data',
            image: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=500&q=80',
        },
    ])

    const [editingSkill,setEditingSkill] = useState<Skill | null>(null)

    const handleAddSkill = (newSkill: Skill) => {
        setSkills([...skills,newSkill])
    }

    const handleEditSkill = (updatedSkill: Skill) => {
        setSkills(skills.map((skill) => (skill.name === updatedSkill.name ? updatedSkill : skill)))
    }

    const handleDeleteSkill = (skillName: string) => {
        setSkills(skills.filter((skill) => skill.name !== skillName))
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Skill Management</h1>
            <div className="flex justify-end mb-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Skill
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Skill</DialogTitle>
                        </DialogHeader>
                        <SkillForm onSubmit={handleAddSkill} />
                    </DialogContent>
                </Dialog>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skill) => (
                    <SkillCard
                        key={skill.name}
                        skill={skill}
                        onEdit={() => setEditingSkill(skill)}
                        onDelete={() => handleDeleteSkill(skill.name)}
                    />
                ))}
            </div>
            {editingSkill && (
                <Dialog open={!!editingSkill} onOpenChange={() => setEditingSkill(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Skill</DialogTitle>
                        </DialogHeader>
                        <SkillForm skill={editingSkill} onSubmit={handleEditSkill} />
                    </DialogContent>
                </Dialog>
            )}
        </div>
    )
}

const SkillCard: React.FC<{
    skill: Skill
    onEdit: () => void
    onDelete: () => void
}> = ({ skill,onEdit,onDelete }) => (
    <Card className="overflow-hidden border-none shadow-none rounded-none">
        <CardHeader className="flex flex-row items-center space-x-4 pb-2">
            <div className="relative h-16 w-16 flex-shrink-0">
                <Image
                    src={skill.image}
                    alt={skill.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                />
            </div>
            <div className="flex-grow">
                <CardTitle className="text-lg">{skill.name}</CardTitle>
                <p className="text-sm text-gray-500">{skill.category}</p>
            </div>
        </CardHeader>
        <CardFooter className="flex justify-end space-x-2 pt-2">
            <Button variant="outline" size="sm" onClick={onEdit}>
                <Pencil className="mr-2 h-4 w-4" /> Edit
            </Button>
            <Button variant="destructive" size="sm" onClick={onDelete}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete
            </Button>
        </CardFooter>
    </Card>
)

const SkillForm: React.FC<{
    skill?: Skill
    onSubmit: (skill: Skill) => void
}> = ({ skill,onSubmit }) => {
    const [formData,setFormData] = useState<Skill>(
        skill || {
            category: '',
            name: '',
            image: '',
        }
    )
    const [previewImage,setPreviewImage] = useState<string | null>(skill?.image || null)
    const [isUploading,setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name,value } = e.target
        setFormData({ ...formData,[name]: value })
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleRemoveImage = () => {
        setPreviewImage(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const uploadToImgBB = async (file: File): Promise<string> => {
        const formData = new FormData()
        formData.append('image',file)

        const url = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`

        try {
            const response = await fetch(url,{
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Failed to upload image')
            }

            const data = await response.json()
            return data.data.url
        } catch (error) {
            console.error('Error uploading image:',error)
            throw new Error('Failed to upload image')
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsUploading(true)

        try {
            let imageUrl = formData.image
            if (previewImage && previewImage !== skill?.image) {
                const file = fileInputRef.current?.files?.[0]
                if (file) {
                    imageUrl = await uploadToImgBB(file)
                }
            }

            onSubmit({ ...formData,image: imageUrl })
        } catch (error) {
            console.error('Error submitting form:',error)
            // Handle error (e.g., show error message to user)
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="category">Category</Label>
                <Input
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <Label htmlFor="image">Image</Label>
                <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                />
            </div>
            {previewImage && (
                <div className="relative w-full h-40">
                    <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-md"
                    />
                    <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={handleRemoveImage}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}
            <Button type="submit" disabled={isUploading}>
                {isUploading ? 'Uploading...' : skill ? 'Update Skill' : 'Add Skill'}
            </Button>
        </form>
    )
}

export default SkillManagementPage
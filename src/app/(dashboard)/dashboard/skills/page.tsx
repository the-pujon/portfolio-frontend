/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React,{ useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { useAppSelector } from '@/redux/hook'
import { selectCurrentUser } from '@/redux/features/auth/authSlice'
import {
    useCreateSkillMutation,
    useGetAllSkillsQuery,
    useUpdateSkillMutation,
    useDeleteSkillMutation
} from '@/redux/features/skill/skillApi'
import { toast } from 'sonner'
import { SkillForm } from '@/components/skill/SkillForm'
import { SkillCard } from '@/components/skill/SkillCard'
import { Skill } from '@/types/skill'


const SkillManagementPage = () => {
    const currentUser = useAppSelector(selectCurrentUser)
    const { data: skillsData,isLoading,refetch } = useGetAllSkillsQuery({})
    const [createSkill] = useCreateSkillMutation()
    const [updateSkill] = useUpdateSkillMutation()
    const [deleteSkill] = useDeleteSkillMutation()
    const skills = skillsData?.data

    const [editingSkill,setEditingSkill] = useState<Skill | null>(null)
    const [isAddDialogOpen,setIsAddDialogOpen] = useState(false)

    // Handle adding a new skill
    const handleAddSkill = async (newSkill: Omit<Skill,'_id'>) => {
        try {
            await createSkill({ ...newSkill,userId: currentUser?._id }).unwrap()
            toast.success('Skill added successfully')
            setIsAddDialogOpen(false)
            refetch()
        } catch (error) {
            toast.error('Failed to add skill')
        }
    }

    // Handle editing a skill
    const handleEditSkill = async (updatedSkill: Skill | Omit<Skill,"_id">) => {
        try {
            const skillId = '_id' in updatedSkill ? updatedSkill._id : editingSkill?._id;
            if (!skillId) throw new Error('Skill ID not found');

            await updateSkill({ id: skillId,data: { ...updatedSkill,userId: currentUser?._id } }).unwrap();
            toast.success('Skill updated successfully');
            refetch();
            setEditingSkill(null);
        } catch (error) {
            toast.error('Failed to update skill');
        }
    };

    // Handle deleting a skill
    const handleDeleteSkill = async (skillId: string) => {
        try {
            await deleteSkill({ id: skillId,userId: currentUser?._id }).unwrap()
            toast.success('Skill deleted successfully')
            refetch()
        } catch (error) {
            toast.error('Failed to delete skill')
        }
    }

    // Handle loading state
    if (isLoading) {
        return <div>Loading skills...</div>
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Skill Management</h1>
            <div className="flex justify-end mb-4">
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
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
                {skills?.map((skill: Skill) => (
                    <SkillCard
                        key={skill._id}
                        skill={skill}
                        onEdit={() => setEditingSkill(skill)}
                        onDelete={() => handleDeleteSkill(skill._id)}
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


export default SkillManagementPage

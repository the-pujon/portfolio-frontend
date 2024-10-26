/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React,{ useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog,DialogContent,DialogHeader,DialogTitle,DialogTrigger } from '@/components/ui/dialog'
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from '@/components/ui/table'
import { Plus,Pencil,Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { useForm,Controller } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAppSelector } from '@/redux/hook'
import { selectCurrentUser } from '@/redux/features/auth/authSlice'
import {
    useCreateExperienceMutation,
    useGetAllExperiencesQuery,
    useUpdateExperienceMutation,
    useDeleteExperienceMutation
} from '@/redux/features/experience/experienceApi'

interface Experience {
    _id: string;
    companyName: string;
    position: string;
    startDate: Date;
    endDate: Date;
}

interface ExperienceFormProps {
    experience?: Experience;
    onSubmit: (data: Experience) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ experience,onSubmit }) => {
    const { register,handleSubmit,control,formState: { errors } } = useForm<Experience>({
        defaultValues: experience || {
            companyName: '',
            position: '',
            startDate: new Date(),
            endDate: new Date(),
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" {...register('companyName',{ required: 'Company Name is required' })} />
                {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName.message}</p>}
            </div>
            <div>
                <Label htmlFor="position">Position</Label>
                <Input id="position" {...register('position',{ required: 'Position is required' })} />
                {errors.position && <p className="text-red-500 text-sm">{errors.position.message}</p>}
            </div>
            <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Controller
                    name="startDate"
                    control={control}
                    rules={{ required: 'Start Date is required' }}
                    render={({ field }) => (
                        <Input
                            id="startDate"
                            type="date"
                            {...field}
                            value={field.value instanceof Date ? field.value.toISOString().substr(0,10) : field.value}
                            onChange={(e) => field.onChange(new Date(e.target.value))}
                        />
                    )}
                />
                {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}
            </div>
            <div>
                <Label htmlFor="endDate">End Date</Label>
                <Controller
                    name="endDate"
                    control={control}
                    rules={{ required: 'End Date is required' }}
                    render={({ field }) => (
                        <Input
                            id="endDate"
                            type="date"
                            {...field}
                            value={field.value instanceof Date ? field.value.toISOString().substr(0,10) : field.value}
                            onChange={(e) => field.onChange(new Date(e.target.value))}
                        />
                    )}
                />
                {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate.message}</p>}
            </div>
            <Button type="submit">Submit</Button>
        </form>
    );
};

const ExperienceManagement = () => {
    const currentUser = useAppSelector(selectCurrentUser);
    const userId = currentUser?._id;

    const { data: experiencesData,isLoading,refetch } = useGetAllExperiencesQuery({});
    const experiences = experiencesData?.data;
    const [createExperience] = useCreateExperienceMutation();
    const [updateExperience] = useUpdateExperienceMutation();
    const [deleteExperience] = useDeleteExperienceMutation();

    const [isAddDialogOpen,setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen,setIsEditDialogOpen] = useState(false);
    const [selectedExperience,setSelectedExperience] = useState<Experience | null>(null);

    const handleAddExperience = async (newExperience: Experience) => {
        try {
            await createExperience({ ...newExperience,userId }).unwrap();
            setIsAddDialogOpen(false);
            toast.success('Experience added successfully');
            refetch();
        } catch (error) {
            toast.error('Failed to add experience');
        }
    };

    const handleUpdateExperience = async (updatedExperience: Experience) => {
        try {
            await updateExperience({ id: updatedExperience._id,data: { ...updatedExperience,userId } }).unwrap();
            setIsEditDialogOpen(false);
            toast.success('Experience updated successfully');
            refetch();
        } catch (error) {
            toast.error('Failed to update experience');
        }
    };

    const handleDeleteExperience = async (id: string) => {
        try {
            await deleteExperience({ id,userId }).unwrap();
            toast.success('Experience deleted successfully');
            refetch();
        } catch (error) {
            toast.error('Failed to delete experience');
        }
    };

    if (isLoading) {
        return <div>Loading experiences...</div>;
    }

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Experience Management</h1>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button><Plus className="mr-2 h-4 w-4" /> Add Experience</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Experience</DialogTitle>
                        </DialogHeader>
                        <ExperienceForm onSubmit={handleAddExperience} />
                    </DialogContent>
                </Dialog>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {experiences?.map((experience: Experience) => (
                        <TableRow key={experience._id}>
                            <TableCell>{experience.companyName}</TableCell>
                            <TableCell>{experience.position}</TableCell>
                            <TableCell>{format(new Date(experience.startDate),'MMM yyyy')}</TableCell>
                            <TableCell>{format(new Date(experience.endDate),'MMM yyyy')}</TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setSelectedExperience(experience);
                                            setIsEditDialogOpen(true);
                                        }}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDeleteExperience(experience._id)}
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
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Experience</DialogTitle>
                    </DialogHeader>
                    {selectedExperience && (
                        <ExperienceForm experience={selectedExperience} onSubmit={handleUpdateExperience} />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ExperienceManagement;

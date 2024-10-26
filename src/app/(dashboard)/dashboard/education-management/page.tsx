'use client'

import React,{ useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog,DialogContent,DialogHeader,DialogTitle,DialogTrigger } from '@/components/ui/dialog'
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from '@/components/ui/table'
import { Plus,Pencil,Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { format,parse } from 'date-fns'
import { useForm,Controller } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Education {
    id: string;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: Date;
    endDate: Date;
}

interface EducationFormProps {
    education?: Education;
    onSubmit: (data: Education) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ education,onSubmit }) => {
    const { register,handleSubmit,control,formState: { errors } } = useForm<Education>({
        defaultValues: education || {
            institution: '',
            degree: '',
            fieldOfStudy: '',
            startDate: new Date(),
            endDate: new Date(),
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <Label htmlFor="institution">Institution</Label>
                <Input id="institution" {...register('institution',{ required: 'Institution is required' })} />
                {errors.institution && <p className="text-red-500 text-sm">{errors.institution.message}</p>}
            </div>
            <div>
                <Label htmlFor="degree">Degree</Label>
                <Input id="degree" {...register('degree',{ required: 'Degree is required' })} />
                {errors.degree && <p className="text-red-500 text-sm">{errors.degree.message}</p>}
            </div>
            <div>
                <Label htmlFor="fieldOfStudy">Field of Study</Label>
                <Input id="fieldOfStudy" {...register('fieldOfStudy',{ required: 'Field of Study is required' })} />
                {errors.fieldOfStudy && <p className="text-red-500 text-sm">{errors.fieldOfStudy.message}</p>}
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

const EducationManagement = () => {
    const [educations,setEducations] = useState<Education[]>([]);
    const [isAddDialogOpen,setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen,setIsEditDialogOpen] = useState(false);
    const [selectedEducation,setSelectedEducation] = useState<Education | null>(null);

    const handleAddEducation = (newEducation: Education) => {
        setEducations([...educations,{ ...newEducation,id: Date.now().toString() }]);
        setIsAddDialogOpen(false);
        toast.success('Education added successfully');
    };

    const handleUpdateEducation = (updatedEducation: Education) => {
        setEducations(educations.map(edu => edu.id === updatedEducation.id ? updatedEducation : edu));
        setIsEditDialogOpen(false);
        toast.success('Education updated successfully');
    };

    const handleDeleteEducation = (id: string) => {
        setEducations(educations.filter(edu => edu.id !== id));
        toast.success('Education deleted successfully');
    };

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Education Management</h1>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button><Plus className="mr-2 h-4 w-4" /> Add Education</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Education</DialogTitle>
                        </DialogHeader>
                        <EducationForm onSubmit={handleAddEducation} />
                    </DialogContent>
                </Dialog>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Institution</TableHead>
                        <TableHead>Degree</TableHead>
                        <TableHead>Field of Study</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {educations.map((education) => (
                        <TableRow key={education.id}>
                            <TableCell>{education.institution}</TableCell>
                            <TableCell>{education.degree}</TableCell>
                            <TableCell>{education.fieldOfStudy}</TableCell>
                            <TableCell>{format(education.startDate,'MMM yyyy')}</TableCell>
                            <TableCell>{format(education.endDate,'MMM yyyy')}</TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setSelectedEducation(education);
                                            setIsEditDialogOpen(true);
                                        }}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDeleteEducation(education.id)}
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
                        <DialogTitle>Edit Education</DialogTitle>
                    </DialogHeader>
                    {selectedEducation && (
                        <EducationForm education={selectedEducation} onSubmit={handleUpdateEducation} />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default EducationManagement;

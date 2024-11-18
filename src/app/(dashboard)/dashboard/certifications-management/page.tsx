/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React,{ useState,useRef } from "react";
import { Plus,Pencil,Trash2,X,CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card,CardFooter,CardHeader,CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
    useCreateCertificateMutation,
    useGetAllCertificatesQuery,
    useUpdateCertificateMutation,
    useDeleteCertificateMutation,
} from "@/redux/features/certificate/certificateApi";
import { toast } from "sonner";
import { Certificate } from "@/types/certificate";
import { Badge } from "@/components/ui/badge";

const CertificationsManagement = () => {
    const currentUser = useAppSelector(selectCurrentUser);
    const {
        data: certificatesData,
        isLoading,
        refetch,
    } = useGetAllCertificatesQuery({});
    const [createCertificate] = useCreateCertificateMutation();
    const [updateCertificate] = useUpdateCertificateMutation();
    const [deleteCertificate] = useDeleteCertificateMutation();

    const certificates = certificatesData?.data || [];

    console.log(certificates)

    const [editingCertificate,setEditingCertificate] =
        useState<Certificate | null>(null);

    const handleAddCertificate = async (
        newCertificate: Omit<Certificate,"_id">
    ) => {
        try {
            await createCertificate({
                ...newCertificate,
                userId: currentUser?._id,
            }).unwrap();
            toast.success("Certificate added successfully");
            refetch();
        } catch (error) {
            toast.error("Failed to add certificate");
        }
    };

    const handleEditCertificate = async (
        updatedCertificate: Certificate | Omit<Certificate,"_id">
    ) => {
        try {
            const certificateId =
                "_id" in updatedCertificate
                    ? updatedCertificate._id
                    : editingCertificate?._id;
            if (!certificateId) throw new Error("Certificate ID not found");

            await updateCertificate({
                id: certificateId,
                data: { ...updatedCertificate,userId: currentUser?._id },
            }).unwrap();
            toast.success("Certificate updated successfully");
            refetch();
            setEditingCertificate(null);
        } catch (error) {
            toast.error("Failed to update certificate");
        }
    };

    const handleDeleteCertificate = async (certificateId: string) => {
        try {
            await deleteCertificate({
                id: certificateId,
                userId: currentUser?._id,
            }).unwrap();
            toast.success("Certificate deleted successfully");
            refetch();
        } catch (error) {
            toast.error("Failed to delete certificate");
        }
    };

    if (isLoading) {
        return <div>Loading certificates...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Certifications Management</h1>
            <div className="flex justify-end mb-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Certificate
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Certificate</DialogTitle>
                        </DialogHeader>
                        <CertificateForm onSubmit={handleAddCertificate} />
                    </DialogContent>
                </Dialog>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates?.map((certificate: Certificate) => (
                    <CertificateCard
                        key={certificate._id}
                        certificate={certificate}
                        onEdit={() => setEditingCertificate(certificate)}
                        onDelete={() => handleDeleteCertificate(certificate._id)}
                    />
                ))}
            </div>
            {editingCertificate && (
                <Dialog
                    open={!!editingCertificate}
                    onOpenChange={() => setEditingCertificate(null)}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Certificate</DialogTitle>
                        </DialogHeader>
                        <CertificateForm
                            certificate={editingCertificate}
                            onSubmit={handleEditCertificate}
                        />
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

const CertificateCard: React.FC<{
    certificate: Certificate;
    onEdit: () => void;
    onDelete: () => void;
}> = ({ certificate,onEdit,onDelete }) => (
    <Card className="overflow-hidden border-none shadow-none rounded-none relative">
        <div
            title="issuedAt"
            className="bg-primary/70 tracking-widest text-[10px] w-fit px-1 py-[2px] right-2 top-2 absolute rounded-full text-white"
        >
            <div className="flex gap-1 items-center">
                <CalendarPlus size={15} />
                {certificate.date}
            </div>
        </div>
        <CardHeader className="flex flex-row items-center space-x-4 pb-2">
            <div className="relative h-16 w-16 flex-shrink-0">
                <Image
                    src={certificate.image}
                    alt={certificate.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                />
            </div>
            <div className="flex-grow">
                <CardTitle className="text-lg">{certificate.title}</CardTitle>
                <p className="text-sm text-gray-700">{certificate.issuedBy}</p>
                <p className="text-xs text-gray-500">{certificate.category}</p>
            </div>
        </CardHeader>
        <CardFooter className="flex justify-end space-x-2 pt-2">
            <div className="grid grid-cols-4 w-full ">
                {certificate.skills.map((skill,i) => {
                    return (
                        <Badge
                            title={skill}
                            key={i}
                            className="bg-primary text-white p-[5px] m-1 rounded-md truncate"
                        >
                            {skill.length > 10 ? `${skill.substring(0,15)}...` : skill}
                        </Badge>
                    );
                })}
            </div>
            <div className="flex flex-col justify-between h-full gap-1">
                {" "}
                <Button variant="outline" size="sm" onClick={onEdit}>
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={onDelete}>
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
            </div>
        </CardFooter>
    </Card>
);

const CertificateForm: React.FC<{
    certificate?: Certificate;
    onSubmit: (certificate: Certificate | Omit<Certificate,"_id">) => void;
}> = ({ certificate,onSubmit }) => {
    const [formData,setFormData] = useState<
        Certificate | Omit<Certificate,"_id">
    >(
        certificate || {
            title: "",
            issuedBy: "",
            date: "",
            image: "",
            category: "",
            description: "",
            skills: [],
        }
    );
    const [previewImage,setPreviewImage] = useState<string | null>(
        certificate?.image || null
    );
    const [isUploading,setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [skills,setSkills] = useState<string[]>(formData.skills || []);
    const [skillInput,setSkillInput] = useState("");

    const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && skillInput.trim() !== "") {
            e.preventDefault();
            setSkills([...skills,skillInput.trim()]);
            setSkillInput("");
            setFormData({ ...formData,skills: [...skills,skillInput.trim()] });
        }
    };

    const removeSkill = (skillToRemove: string) => {
        const newSkills = skills.filter((skill) => skill !== skillToRemove);
        setSkills(newSkills);
        setFormData({ ...formData,skills: newSkills });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name,value } = e.target;
        setFormData({ ...formData,[name]: value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setPreviewImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const uploadToImgBB = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append("image",file);

        const url = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`;

        try {
            const response = await fetch(url,{
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to upload image");
            }

            const data = await response.json();
            return data.data.url;
        } catch (error) {
            console.error("Error uploading image:",error);
            throw new Error("Failed to upload image");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUploading(true);

        try {
            let imageUrl = formData.image;
            if (previewImage && previewImage !== certificate?.image) {
                const file = fileInputRef.current?.files?.[0];
                if (file) {
                    imageUrl = await uploadToImgBB(file);
                }
            }

            onSubmit({ ...formData,image: imageUrl });
        } catch (error) {
            console.error("Error submitting form:",error);
            toast.error("Failed to submit form");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <Label htmlFor="issuedBy">Issued By</Label>
                <Input
                    id="issuedBy"
                    name="issuedBy"
                    value={formData.issuedBy}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <Label htmlFor="date">Date</Label>
                <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
            </div>
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
                <Label htmlFor="description">Description</Label>
                <Input
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
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
            <div>
                <Label htmlFor="skills">Skills</Label>
                <Input
                    id="skills"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleSkillKeyDown}
                    placeholder="Press Enter to add a skill"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                    {skills.map((skill,index) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                            {skill}
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="ml-1 h-4 w-4 p-0"
                                onClick={() => removeSkill(skill)}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </Badge>
                    ))}
                </div>
            </div>
            <Button type="submit" disabled={isUploading}>
                {isUploading
                    ? "Uploading..."
                    : certificate
                        ? "Update Certificate"
                        : "Add Certificate"}
            </Button>
        </form>
    );
};

export default CertificationsManagement;

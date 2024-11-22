import React,{ useState,useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Skill } from '@/types/skill';
import { uploadToImgBB } from '@/utils/imgbbUpload';

interface SkillFormProps {
    skill?: Skill;
    onSubmit: (skill: Skill | Omit<Skill,'_id'>) => void;
}


export const SkillForm: React.FC<SkillFormProps> = ({ skill,onSubmit }) => {
    const [formData,setFormData] = useState<Skill | Omit<Skill,'_id'>>(
        skill || { category: '',name: '',image: '' }
    );
    const [previewImage,setPreviewImage] = useState<string | null>(skill?.image || null);
    const [isUploading,setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name,value } = e.target;
        setFormData({ ...formData,[name]: value });
    };

    // Handle image change
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    // Handle image removal
    const handleRemoveImage = () => {
        setPreviewImage(null);
        setFormData((prev) => ({ ...prev,image: '' }));
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUploading(true);

        try {
            let imageUrl = formData.image;
            if (previewImage && previewImage !== skill?.image) {
                const file = fileInputRef.current?.files?.[0];
                if (file) imageUrl = await uploadToImgBB(file); // Upload image to ImgBB
            }

            onSubmit({ ...formData,image: imageUrl });
        } catch (error) {
            console.error('Error submitting form:',error);
            toast.error('Failed to submit form');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="category">Category</Label>
                <Input
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Enter skill category"
                    required
                />
            </div>
            <div>
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter skill name"
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
            <Button type="submit" disabled={isUploading}>
                {isUploading ? 'Uploading...' : skill ? 'Update Skill' : 'Add Skill'}
            </Button>
        </form>
    );
};
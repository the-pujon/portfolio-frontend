'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import React,{ useState,useEffect } from 'react';
import { useForm,Controller } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from '@/redux/hook';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import { useGetProfileByIdQuery,useUpdateProfileMutation } from '@/redux/features/profile/profileApi';
import { toast } from 'sonner';

interface ProfileFormData {
    name: string;
    email: string;
    designation?: string;
    department?: string;
    location: {
        city?: string;
        country?: string;
    };
    heroImage?: string;
    about?: string;
    aboutImage?: string;
    socialMedia: {
        linkedin?: string;
        twitter?: string;
        facebook?: string;
        instagram?: string;
        youtube?: string;
        github?: string;
        leetcode?: string;
    };
    introduction?: string;
    resume?: string;
    projectCategory?: string;
}

const EditProfile = () => {
    const currentUserId = useAppSelector(selectCurrentUser)?._id;
    const { data: responsedProfile,isLoading: isProfileLoading } = useGetProfileByIdQuery(currentUserId);
    const [updateProfile,{ isLoading: isUpdating }] = useUpdateProfileMutation();
    const [isSubmitting,setIsSubmitting] = useState(false);

    console.log("Current Profile Data:",responsedProfile); // Add this line
    //console.log("currentProfile.name",currentProfile?.name)

    const { control,handleSubmit,formState: { errors },reset } = useForm<ProfileFormData>({
        defaultValues: {
            // You would typically fetch the current profile data and set it here
            name: '',
            email: '',
            designation: '',
            department: '',
            location: { city: '',country: '' },
            heroImage: '',
            about: '',
            aboutImage: '',
            socialMedia: {
                linkedin: '',
                twitter: '',
                facebook: '',
                instagram: '',
                youtube: '',
                github: '',
                leetcode: '',
            },
            introduction: '',
            resume: '',
            projectCategory: '',
        },
    });

    useEffect(() => {
        if (responsedProfile?.data) {
            reset({
                name: responsedProfile.data.name || '',
                email: responsedProfile.data.email || '',
                designation: responsedProfile.data.designation || '',
                department: responsedProfile.data.department || '',
                location: {
                    city: responsedProfile.data.location?.city || '',
                    country: responsedProfile.data.location?.country || '',
                },
                heroImage: responsedProfile.data.heroImage || '',
                about: responsedProfile.data.about || '',
                aboutImage: responsedProfile.data.aboutImage || '',
                socialMedia: {
                    linkedin: responsedProfile.data.socialMedia?.linkedin || '',
                    twitter: responsedProfile.data.socialMedia?.twitter || '',
                    facebook: responsedProfile.data.socialMedia?.facebook || '',
                    instagram: responsedProfile.data.socialMedia?.instagram || '',
                    youtube: responsedProfile.data.socialMedia?.youtube || '',
                    github: responsedProfile.data.socialMedia?.github || '',
                    leetcode: responsedProfile.data.socialMedia?.leetcode || '',
                },
                introduction: responsedProfile.data.introduction || '',
                resume: responsedProfile.data.resume || '',
                projectCategory: responsedProfile.data.projectCategory || '',
            });
        }
    },[responsedProfile,reset]);



    const onSubmit = async (data: ProfileFormData) => {
        if (isSubmitting) return; // Prevent multiple submissions
        setIsSubmitting(true);
        console.log("Submitting data:",data);

        try {
            if (!currentUserId) {
                throw new Error("User ID is not available");
            }

            const result = await updateProfile({
                id: currentUserId,
                data: data  // Pass data as a separate property
            }).unwrap();
            console.log("Update result:",result);
            toast.success('Profile updated successfully');
        } catch (error: any) {
            console.error('Update failed:',error);
            toast.error(`Failed to update profile: ${error.message || 'Unknown error'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const socialMediaPlatforms = ['linkedin','twitter','facebook','instagram','youtube','github','leetcode'];

    if (isProfileLoading) {
        return <div>Loading profile...</div>;
    }

    return (
        <Card className="w-full container mx-auto border-none bg-background shadow-none">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary">Personalize Your Professional Profile</CardTitle>
                <p className="text-muted-foreground mt-2">Update your information to showcase your skills and experiences</p>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Controller
                                name="name"
                                control={control}
                                //rules={{ required: 'Name is required',minLength: { value: 2,message: 'Name must be at least 2 characters' } }}
                                render={({ field }) => <Input {...field} />}
                            />
                            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Controller
                                name="email"
                                control={control}
                                //rules={{ required: 'Email is required',pattern: { value: /^\S+@\S+$/i,message: 'Invalid email address' } }}
                                render={({ field }) => <Input {...field} />}
                            />
                            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="designation">Designation</Label>
                            <Controller
                                name="designation"
                                control={control}
                                render={({ field }) => <Input {...field} />}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="department">Department</Label>
                            <Controller
                                name="department"
                                control={control}
                                render={({ field }) => <Input {...field} />}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="location.city">City</Label>
                            <Controller
                                name="location.city"
                                control={control}
                                render={({ field }) => <Input {...field} />}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location.country">Country</Label>
                            <Controller
                                name="location.country"
                                control={control}
                                render={({ field }) => <Input {...field} />}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="heroImage">Hero Image URL</Label>
                        <Controller
                            name="heroImage"
                            control={control}
                            //rules={{ pattern: { value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,message: 'Invalid URL' } }}
                            render={({ field }) => <Input {...field} />}
                        />
                        {errors.heroImage && <p className="text-sm text-red-500">{errors.heroImage.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="about">About</Label>
                        <Controller
                            name="about"
                            control={control}
                            render={({ field }) => <Textarea {...field} />}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="aboutImage">About Image URL</Label>
                        <Controller
                            name="aboutImage"
                            control={control}
                            //rules={{ pattern: { value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,message: 'Invalid URL' } }}
                            render={({ field }) => <Input {...field} />}
                        />
                        {errors.aboutImage && <p className="text-sm text-red-500">{errors.aboutImage.message}</p>}
                    </div>

                    <Separator />

                    <h3 className="text-lg font-semibold">Social Media</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {socialMediaPlatforms.map((platform) => (
                            <div key={platform} className="space-y-2">
                                <Label htmlFor={`socialMedia.${platform}`}>{platform.charAt(0).toUpperCase() + platform.slice(1)}</Label>
                                <Controller
                                    name={`socialMedia.${platform}` as any}
                                    control={control}
                                    //rules={{ pattern: { value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,message: 'Invalid URL' } }}
                                    render={({ field }) => <Input {...field} />}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="introduction">Introduction</Label>
                        <Controller
                            name="introduction"
                            control={control}
                            render={({ field }) => <Textarea {...field} />}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="resume">Resume URL</Label>
                        <Controller
                            name="resume"
                            control={control}
                            //rules={{ pattern: { value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,message: 'Invalid URL' } }}
                            render={({ field }) => <Input {...field} />}
                        />
                        {errors.resume && <p className="text-sm text-red-500">{errors.resume.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="projectCategory">Project Category</Label>
                        <Controller
                            name="projectCategory"
                            control={control}
                            render={({ field }) => <Input {...field} />}
                        />
                    </div>

                    <Button type="submit" className="w-full" disabled={isUpdating || isSubmitting}>
                        {isUpdating || isSubmitting ? 'Updating...' : 'Update Profile'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default EditProfile;

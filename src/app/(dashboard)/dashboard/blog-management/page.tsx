'use client'

import React,{ useState,useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog,DialogContent,DialogHeader,DialogTitle,DialogTrigger } from '@/components/ui/dialog'
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from '@/components/ui/table'
import { Plus,Pencil,Trash2,X } from 'lucide-react'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { useForm,Controller } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import dynamic from 'next/dynamic'

const RichTextEditor = dynamic(() => import('react-simple-wysiwyg'),{ ssr: false })

interface Blog {
    _id: string;
    title: string;
    content: string;
    image: string[];
    author: string;
    category: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

interface BlogFormProps {
    blog?: Blog;
    onSubmit: (data: Blog) => void;
}

const BlogForm: React.FC<BlogFormProps> = ({ blog,onSubmit }) => {
    const { register,handleSubmit,control,setValue,watch,formState: { errors } } = useForm<Blog>({
        defaultValues: blog || {
            title: '',
            content: '',
            image: [],
            author: '',
            category: '',
            tags: [],
        },
    });

    const [tags,setTags] = useState<string[]>(blog?.tags || []);
    const [tagInput,setTagInput] = useState('');
    const [imageFiles,setImageFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const watchedImages = watch('image');

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim() !== '') {
            e.preventDefault();
            setTags([...tags,tagInput.trim()]);
            setValue('tags',[...tags,tagInput.trim()]);
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        const newTags = tags.filter(tag => tag !== tagToRemove);
        setTags(newTags);
        setValue('tags',newTags);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImageFiles([...imageFiles,...Array.from(e.target.files)]);
        }
    };

    const removeImage = (index: number) => {
        const newImages = [...watchedImages];
        newImages.splice(index,1);
        setValue('image',newImages);
    };

    const uploadImages = async () => {
        const uploadedUrls = [];
        for (const file of imageFiles) {
            const formData = new FormData();
            formData.append('image',file);
            try {
                const response = await fetch(`https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY`,{
                    method: 'POST',
                    body: formData,
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                uploadedUrls.push(data.data.url);
            } catch (error) {
                console.error('Error uploading image:',error);
                toast.error(`Failed to upload image: ${file.name}`);
            }
        }
        return uploadedUrls;
    };

    const onSubmitWithImageUpload = async (data: Blog) => {
        const uploadedImageUrls = await uploadImages();
        const updatedData = {
            ...data,
            image: [...(data.image || []),...uploadedImageUrls],
        };
        onSubmit(updatedData);
    };

    return (
        <form onSubmit={handleSubmit(onSubmitWithImageUpload)} className="space-y-4">
            <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...register('title',{ required: 'Title is required' })} />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>
            <div>
                <Label htmlFor="content">Content</Label>
                <Controller
                    name="content"
                    control={control}
                    rules={{ required: 'Content is required' }}
                    render={({ field }) => (
                        <RichTextEditor value={field.value} onChange={field.onChange} />
                    )}
                />
                {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
            </div>
            <div>
                <Label htmlFor="author">Author</Label>
                <Input id="author" {...register('author',{ required: 'Author is required' })} />
                {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}
            </div>
            <div>
                <Label htmlFor="category">Category</Label>
                <Input id="category" {...register('category',{ required: 'Category is required' })} />
                {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
            </div>
            <div>
                <Label htmlFor="tags">Tags</Label>
                <Input
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    placeholder="Press Enter to add a tag"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag,index) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                            {tag}
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="ml-1 h-4 w-4 p-0"
                                onClick={() => removeTag(tag)}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </Badge>
                    ))}
                </div>
            </div>
            <div>
                <Label htmlFor="image">Images</Label>
                <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    ref={fileInputRef}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                    {watchedImages?.map((img,index) => (
                        <div key={index} className="relative">
                            <img src={img} alt={`Blog image ${index + 1}`} className="w-20 h-20 object-cover" />
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute top-0 right-0"
                                onClick={() => removeImage(index)}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </div>
                    ))}
                    {imageFiles.map((file,index) => (
                        <div key={`file-${index}`} className="relative">
                            <img src={URL.createObjectURL(file)} alt={`New image ${index + 1}`} className="w-20 h-20 object-cover" />
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute top-0 right-0"
                                onClick={() => {
                                    const newFiles = [...imageFiles];
                                    newFiles.splice(index,1);
                                    setImageFiles(newFiles);
                                }}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
            <Button type="submit">Submit</Button>
        </form>
    );
};

const BlogManagement = () => {
    const [blogs,setBlogs] = useState<Blog[]>([]);
    const [isAddDialogOpen,setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen,setIsEditDialogOpen] = useState(false);
    const [selectedBlog,setSelectedBlog] = useState<Blog | null>(null);

    const handleAddBlog = (newBlog: Blog) => {
        setBlogs([...blogs,{ ...newBlog,_id: Date.now().toString(),createdAt: new Date(),updatedAt: new Date() }]);
        setIsAddDialogOpen(false);
        toast.success('Blog added successfully');
    };

    const handleUpdateBlog = (updatedBlog: Blog) => {
        setBlogs(blogs.map(blog => blog._id === updatedBlog._id ? { ...updatedBlog,updatedAt: new Date() } : blog));
        setIsEditDialogOpen(false);
        toast.success('Blog updated successfully');
    };

    const handleDeleteBlog = (id: string) => {
        setBlogs(blogs.filter(blog => blog._id !== id));
        toast.success('Blog deleted successfully');
    };

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Blog Management</h1>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button><Plus className="mr-2 h-4 w-4" /> Add Blog</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                        <DialogHeader>
                            <DialogTitle>Add New Blog</DialogTitle>
                        </DialogHeader>
                        <BlogForm onSubmit={handleAddBlog} />
                    </DialogContent>
                </Dialog>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Tags</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Updated At</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {blogs.map((blog) => (
                        <TableRow key={blog._id}>
                            <TableCell>{blog.title}</TableCell>
                            <TableCell>{blog.author}</TableCell>
                            <TableCell>{blog.category}</TableCell>
                            <TableCell>{blog.tags.join(', ')}</TableCell>
                            <TableCell>{format(blog.createdAt,'PPP')}</TableCell>
                            <TableCell>{format(blog.updatedAt,'PPP')}</TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setSelectedBlog(blog);
                                            setIsEditDialogOpen(true);
                                        }}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDeleteBlog(blog._id)}
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
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Edit Blog</DialogTitle>
                    </DialogHeader>
                    {selectedBlog && (
                        <BlogForm blog={selectedBlog} onSubmit={handleUpdateBlog} />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default BlogManagement;

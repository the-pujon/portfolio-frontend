/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React,{ useState,useMemo } from 'react';
import { motion } from 'framer-motion';
import { BlogCard } from '@/components/ui/BlogCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen,Search } from 'lucide-react';
import { useGetAllBlogsQuery } from '@/redux/features/blog/blogApi';

export interface Blog {
    _id: string;
    title: string;
    content: string;
    image: string[];
    author: string;
    category: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
    blogFeedback: {
        blog: string;
        rating: number;
        email: string;
        feedback: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
}

const BlogPage = () => {
    const [searchTerm,setSearchTerm] = useState('');
    const { data: blogsData,isLoading,isError } = useGetAllBlogsQuery({});

    const filteredBlogs = useMemo(() => {
        if (!blogsData?.data) return [];
        return blogsData.data.filter((blog: Blog) =>
            blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    },[searchTerm,blogsData]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20,opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
            },
        },
    };

    if (isLoading) {
        return <div>Loading blogs...</div>;
    }

    if (isError) {
        return <div>Error loading blogs. Please try again later.</div>;
    }

    return (
        <div className="min-h-screen py-24 px-4 relative overflow-hidden bg-gradient-to-b from-primary/10 to-secondary/10">
            <div className="max-w-7xl mx-auto relative">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.div variants={itemVariants} className="text-center mb-3 md:mb-16 relative">
                        <h1 className="text-4xl md:text-7xl font-bold relative z-10 tracking-tight mb-2 md:mb-6">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary/50">
                                Explore
                            </span>{" "}
                            <span className="relative inline-block">
                                <span className="text-foreground">Our</span>
                            </span>{" "}
                            <span className="relative inline-block">
                                <span className="text-foreground">Blog</span>
                                <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-primary/50 via-secondary to-primary animate-shimmer" />
                            </span>
                        </h1>
                        <p className="text-xs mt-4 max-w-3xl mx-auto font-light leading-relaxed">
                            <span className="text-primary">Discover insights</span>{" "}
                            <span className="text-muted-foreground">
                                on the latest tech trends, development tips, and
                            </span>
                            <span className="text-primary animate-pulse ml-1">
                                industry best practices
                            </span>
                        </p>
                        <div className="absolute -top-12 right-1/4 text-primary/20 animate-pulse">
                            <BookOpen className="w-24 h-24" />
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="mb-12">
                        <div className="max-w-xl mx-auto relative">
                            <Label htmlFor="search" className="sr-only">Search blogs</Label>
                            <Input
                                id="search"
                                type="text"
                                placeholder="Search by title, category, or tag..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-primary/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                            />
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary/50" />
                        </div>
                    </motion.div>

                    {filteredBlogs.length === 0 ? (
                        <motion.p variants={itemVariants} className="text-center text-lg text-muted-foreground">
                            No blogs found matching your search.
                        </motion.p>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredBlogs.map((blog: Blog) => (
                                <motion.div key={blog._id} variants={itemVariants}>
                                    <BlogCard blog={blog} />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default BlogPage;

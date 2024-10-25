/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React,{ useState,useMemo } from 'react';
import { motion } from 'framer-motion';
import { BlogCard } from '@/components/ui/BlogCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen,Search } from 'lucide-react';

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

// Demo data based on the Blog interface
const blogs: Blog[] = [
    {
        _id: "1",
        title: "The Future of AI in Web Development",
        content: "Artificial Intelligence is revolutionizing the way we build and interact with websites...",
        image: ["https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWl8ZW58MHx8MHx8fDA%3D"],
        author: "Jane Doe",
        category: "Technology",
        tags: ["AI","Web Development","Future Tech"],
        createdAt: new Date("2023-03-15"),
        updatedAt: new Date("2023-03-16"),
        blogFeedback: [
            {
                blog: "1" as any,
                rating: 4,
                email: "user1@example.com",
                feedback: "Great insights on AI's potential!",
                createdAt: new Date("2023-03-17"),
                updatedAt: new Date("2023-03-17"),
            },
        ],
    },
    {
        _id: "2",
        title: "Mastering React Hooks",
        content: "React Hooks have transformed the way we write functional components...",
        image: ["https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhY3R8ZW58MHx8MHx8fDA%3D"],
        author: "John Smith",
        category: "Programming",
        tags: ["React","JavaScript","Web Development"],
        createdAt: new Date("2023-04-01"),
        updatedAt: new Date("2023-04-02"),
        blogFeedback: [],
    },
];

const BlogPage = () => {
    const [searchTerm,setSearchTerm] = useState('');

    const filteredBlogs = useMemo(() => {
        return blogs.filter(blog =>
            blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    },[searchTerm]);

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
                            {filteredBlogs.map(blog => (
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

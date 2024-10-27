'use client'

import React,{ useState,useEffect,useCallback } from 'react';
import Image from 'next/image';
import { motion,useScroll,useTransform } from 'framer-motion';
import { Calendar,Clock,User,Tag,BookOpen,Star,MessageCircle,Quote } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { BlogFeedbackForm } from '@/components/BlogFeedbackForm';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card,CardContent } from "@/components/ui/card";
import { useGetBlogByIdQuery,useAddFeedbackMutation } from '@/redux/features/blog/blogApi';
import { useParams } from 'next/navigation';

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
    feedback?: {
        rating: number;
        email: string;
        feedback: string;
    }[];
}

const BlogDetailsPage = () => {
    const params = useParams();
    const blogId = params.id as string;

    const { data: blogData,isLoading,isError,refetch } = useGetBlogByIdQuery(blogId);
    const [addFeedback] = useAddFeedbackMutation();

    const [blog,setBlog] = useState<Blog | null>(null);

    useEffect(() => {
        if (blogData) {
            setBlog(blogData.data);
        }
    },[blogData]);

    const { scrollYProgress } = useScroll();
    const backgroundY = useTransform(scrollYProgress,[0,1],['0%','100%']);

    const handleFeedbackSubmit = useCallback(async (newFeedback: {
        rating: number;
        email: string;
        feedback: string;
    }) => {
        if (blog) {
            try {
                await addFeedback({ id: blog._id,data: newFeedback }).unwrap();
                // Refetch the blog data to get the updated feedback
                await refetch();
            } catch (error) {
                console.error('Failed to add feedback:',error);
            }
        }
    },[blog,addFeedback,refetch]);

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
        return <div>Loading blog...</div>;
    }

    if (isError || !blog) {
        return <div>Error loading blog. Please try again later.</div>;
    }

    return (
        <motion.div
            className="min-h-screen h-full py-16 px-4 bg-gradient-to-b from-primary/5 to-secondary/5 relative overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div
                className="absolute inset-0 z-0 opacity-10"
                style={{
                    backgroundImage: `url(${blog.image[0]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    y: backgroundY,
                }}
            />
            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div variants={itemVariants} className="text-center mb-10 md:mb-20 relative">
                    <div className="relative mb-2 mt-10">
                        <h1 className="text-3xl md:text-7xl font-bold relative z-10 tracking-tight mb-4">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary/50">
                                {blog.title.split(' ').slice(0,2).join(' ')}
                            </span>{" "}
                            <span className="relative inline-block">
                                <span className="text-foreground">{blog.title.split(' ').slice(2).join(' ')}</span>
                                <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-primary/50 via-secondary to-primary animate-shimmer" />
                            </span>
                        </h1>
                        <div className="absolute -top-8 right-0 text-primary/20 animate-pulse">
                            <BookOpen className="w-16 h-16" />
                        </div>
                    </div>
                    <p className="text-xs md:text-xl mt-3 max-w-3xl mx-auto font-light leading-relaxed">
                        <span className="text-primary">Exploring {blog.category}</span>{" "}
                        <span className="text-muted-foreground">
                            through comprehensive technical insights and
                        </span>
                        <span className="text-primary animate-pulse ml-1">
                            development perspectives
                        </span>
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-muted-foreground mt-4">
                        <span className="flex items-center gap-2">
                            <User className="w-4 h-4 text-primary" /> {blog.author}
                        </span>
                        <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary" /> {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" /> {Math.ceil(blog.content.split(' ').length / 200)} min read
                        </span>
                    </div>
                </motion.div>

                <motion.div
                    className="mb-12 relative h-[400px] rounded-lg overflow-hidden shadow-2xl"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                >
                    <Image
                        src={blog.image[0]}
                        alt={blog.title}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60" />
                    <div className="absolute bottom-4 left-4 right-4">
                        <Badge className="bg-primary/90 text-primary-foreground px-3 py-1">
                            {blog.category}
                        </Badge>
                    </div>
                </motion.div>

                <motion.div
                    className="richText max-w-none mb-12 bg-background/80 backdrop-blur-sm p-6 rounded-lg shadow-lg"
                    variants={itemVariants}
                >
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </motion.div>

                <motion.div className="mb-12" variants={itemVariants}>
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">Tags</h2>
                    <div className="flex flex-wrap gap-2">
                        {blog.tags.map((tag,index) => (
                            <Badge
                                key={index}
                                variant="secondary"
                                className="text-sm hover:bg-primary hover:text-white transition-colors duration-300 cursor-pointer"
                            >
                                <Tag className="w-3 h-3 mr-1" />
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="mb-24">
                    <h2 className="text-4xl font-bold mb-8 text-foreground flex items-center justify-center">
                        <MessageCircle className="w-10 h-10 mr-3 text-primary" />
                        Reader Feedback
                    </h2>
                    {blog.feedback && blog.feedback.length > 0 ? (
                        <Carousel
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                            className="w-full"
                        >
                            <CarouselContent>
                                {blog.feedback.map((feedback,index) => (
                                    <CarouselItem key={index} className="md:basis-1/2 pl-4">
                                        <motion.div
                                            initial={{ opacity: 0,y: 50 }}
                                            animate={{ opacity: 1,y: 0 }}
                                            transition={{ duration: 0.5,delay: index * 0.1 }}
                                            className="h-full"
                                        >
                                            <Card className="bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-primary/10 h-full flex flex-col">
                                                <CardContent className="p-8 flex flex-col justify-between h-full">
                                                    <div>
                                                        <div className="flex justify-between items-start mb-6">
                                                            <div>
                                                                <p className="font-semibold text-xl text-foreground">{feedback.email.split('@')[0]}</p>
                                                                {/*<p className="text-sm text-muted-foreground">{new Date(feedback.createdAt).toLocaleDateString()}</p>*/}
                                                            </div>
                                                            <div className="flex">
                                                                {[1,2,3,4,5].map((star) => (
                                                                    <Star
                                                                        key={star}
                                                                        className={`w-5 h-5 ${star <= feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="relative">
                                                            <Quote className="absolute top-0 left-0 w-8 h-8 text-primary/20 -translate-x-4 -translate-y-4" />
                                                            <p className="text-foreground text-lg italic bg-primary/5 p-6 rounded-lg">{feedback.feedback}</p>
                                                            <Quote className="absolute bottom-0 right-0 w-8 h-8 text-primary/20 translate-x-4 translate-y-4 rotate-180" />
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <div className="mt-8 flex justify-center gap-4">
                                <CarouselPrevious className="static bg-primary text-primary-foreground hover:bg-primary/90" />
                                <CarouselNext className="static bg-primary text-primary-foreground hover:bg-primary/90" />
                            </div>
                        </Carousel>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0,y: 20 }}
                            animate={{ opacity: 1,y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center p-12 bg-card/30 backdrop-blur-sm rounded-lg border border-primary/10"
                        >
                            <MessageCircle className="w-16 h-16 mx-auto mb-6 text-primary/50" />
                            <p className="text-muted-foreground text-xl">No feedback yet. Be the first to share your thoughts!</p>
                        </motion.div>
                    )}
                </motion.div>

                <motion.div variants={itemVariants}>
                    <h2 className="text-2xl font-semibold mb-6 text-foreground">Share Your Thoughts</h2>
                    <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg shadow-lg">
                        <BlogFeedbackForm blogId={blog._id} onSubmit={handleFeedbackSubmit} />
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default BlogDetailsPage;

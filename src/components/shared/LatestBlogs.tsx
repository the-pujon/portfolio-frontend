/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React,{ useRef } from 'react';
import { motion,useAnimation,useInView } from 'framer-motion';
import { ArrowRight,BookOpen } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { BlogCard } from '../ui/BlogCard';
import { useGetAllBlogsQuery } from '../../redux/features/blog/blogApi';

const LatestBlogs = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref as React.RefObject<Element>);
    const controls = useAnimation();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data: blogsData,isLoading,isError } = useGetAllBlogsQuery({});
    const blogs = blogsData?.data || [];

    React.useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    },[controls,isInView]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
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

    //if (isLoading) {
    //    return <div>Loading blogs...</div>;
    //}

    //if (isError) {
    //    console.log(isError);
    //}

    return (
        <section className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-primary/10 to-secondary/10">
            <motion.div
                ref={ref}
                animate={controls}
                initial="hidden"
                variants={containerVariants}
                className="max-w-7xl mx-auto relative"
            >
                {/* Header section */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-20 gap-8">
                    <div className="text-center sm:text-left relative">
                        <div className="relative">
                            <h2 className="text-6xl md:text-6xl font-bold relative z-10 tracking-tight">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary/50">
                                    Latest
                                </span>{" "}
                                <span className="relative inline-block">
                                    <span className="text-foreground">Tech</span>
                                </span>{" "}
                                <span className="relative inline-block">
                                    <span className="text-foreground">Insights</span>
                                    <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-primary/50 via-secondary to-primary animate-shimmer" />
                                </span>
                            </h2>
                            <div className="absolute -top-8 right-12 text-primary/20 animate-pulse">
                                <BookOpen className="w-16 h-16" />
                            </div>
                        </div>
                        <p className="text-sm md:text-xl mt-8 max-w-3xl font-light leading-relaxed">
                            <span className="text-primary">Exploring ideas</span>{" "}
                            <span className="text-muted-foreground">
                                through comprehensive technical articles and
                            </span>
                            <span className="text-primary animate-pulse ml-1">
                                development insights
                            </span>
                            <span className="block mt-2 text-muted-foreground/80">
                                Sharing knowledge to empower the developer community
                            </span>
                        </p>
                    </div>
                    <Link href="/blog">
                        <Button
                            variant="outline"
                            size="lg"
                            className="group hover:bg-primary hover:text-white transition-all duration-300 border-primary/20 px-8"
                        >
                            View All Posts
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-500" />
                        </Button>
                    </Link>
                </div>

                {/* Updated Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.slice(0,3).map((blog: any) => (
                        <motion.div key={blog._id} variants={itemVariants}>
                            <BlogCard blog={blog} />
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Background Decorations */}
            <motion.div
                className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-primary/10 to-transparent rounded-full filter blur-3xl"
                animate={{
                    scale: [1,1.1,1],
                    opacity: [0.3,0.5,0.3],
                }}
                transition={{ duration: 8,repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-radial from-secondary/10 to-transparent rounded-full filter blur-3xl"
                animate={{
                    scale: [1,1.2,1],
                    opacity: [0.3,0.5,0.3],
                }}
                transition={{ duration: 10,repeat: Infinity }}
            />
        </section>
    );
};

export default LatestBlogs;

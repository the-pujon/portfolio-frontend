import React from 'react';
import { motion,useAnimation,useInView } from 'framer-motion';
import { Calendar,ArrowRight,BookOpen,Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    coverImage: string;
    date: string;
    readTime: string;
    category: string;
    slug: string;
}

const LatestBlogs = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref,{ once: true });
    const controls = useAnimation();

    React.useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    },[controls,isInView]);

    // Mock data with actual Unsplash images
    const blogPosts: BlogPost[] = [
        {
            id: '1',
            title: 'Building Scalable Web Applications with Next.js',
            excerpt: 'Learn how to create performant and scalable web applications using Next.js and React. Discover best practices for server-side rendering, API routes, and deployment strategies...',
            coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80',
            date: '2024-03-15',
            readTime: '5 min read',
            category: 'Web Development',
            slug: 'building-scalable-web-applications'
        },
        {
            id: '2',
            title: 'Modern State Management in React',
            excerpt: 'Exploring different state management solutions in React applications. From Context API to Redux Toolkit, learn which solution fits your needs...',
            coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80',
            date: '2024-03-10',
            readTime: '7 min read',
            category: 'React',
            slug: 'modern-state-management-react'
        },
        {
            id: '3',
            title: 'TypeScript Best Practices for 2024',
            excerpt: 'Essential TypeScript patterns and practices for better code quality. Learn about advanced types, decorators, and error handling strategies...',
            coverImage: 'https://images.unsplash.com/photo-1629904853716-f0bc54eea481?q=80',
            date: '2024-03-05',
            readTime: '6 min read',
            category: 'TypeScript',
            slug: 'typescript-best-practices'
        },
    ];

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

    return (
        <section className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-background/90">
            <motion.div
                ref={ref}
                animate={controls}
                initial="hidden"
                variants={containerVariants}
                className="max-w-7xl mx-auto relative"
            >
                {/* Enhanced header section with View All button */}
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

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post,index) => (
                        <motion.article
                            key={post.id}
                            variants={itemVariants}
                            className="group h-full flex flex-col relative hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-primary/10 overflow-hidden bg-gradient-to-br from-background/80 via-background to-muted/20 backdrop-blur-sm hover:border-primary/30 rounded-lg"
                        >
                            <Link href={`/blog/${post.slug}`} className="h-full">
                                {/* Glowing effect on hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-white/5 to-secondary/10 animate-gradient" />
                                </div>

                                <div className="relative h-48 w-full overflow-hidden">
                                    <Image
                                        src={post.coverImage}
                                        alt={post.title}
                                        layout="fill"
                                        objectFit="cover"
                                        className="transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                                    {/* Category badge */}
                                    <div className="absolute top-4 right-4 z-10">
                                        <Badge className="bg-primary/90 text-primary-foreground px-3 py-1 flex items-center gap-2">
                                            {post.category}
                                        </Badge>
                                    </div>

                                    {/* Date and read time - floating style */}
                                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-sm text-white z-10">
                                        <span className="flex items-center gap-1 bg-background/50 backdrop-blur-sm px-2 py-1 rounded-full">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(post.date).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1 bg-background/50 backdrop-blur-sm px-2 py-1 rounded-full">
                                            <Clock className="w-4 h-4" />
                                            {post.readTime}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-transparent to-muted/5">
                                    {/* Title with gradient effect on hover */}
                                    <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all duration-300 line-clamp-2">
                                        {post.title}
                                    </h3>

                                    {/* Excerpt with fade-in effect */}
                                    <p className="text-muted-foreground mb-6 line-clamp-2 group-hover:text-muted-foreground/80 transition-colors duration-300">
                                        {post.excerpt}
                                    </p>

                                    {/* Enhanced Read More button */}
                                    <div className="mt-auto">
                                        <Button
                                            variant="ghost"
                                            className="w-full group/btn hover:bg-primary hover:text-white border border-primary/20 transition-all duration-300"
                                        >
                                            <span className="flex items-center justify-center gap-2">
                                                Read Article
                                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
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

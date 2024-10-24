"use client";

import React from 'react';
import { motion,AnimatePresence,useScroll,useTransform } from 'framer-motion';
import ProjectCard from '@/components/ui/ProjectCard';
import { Sparkles } from 'lucide-react';

const projects = [
    {
        id: 1,
        title: "Project Management Dashboard",
        description: "A modern project management tool built with React and Node.js.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80",
        technologies: ["React","Node.js","MongoDB"],
        github: {
            client: "https://github.com/client",
            server: "https://github.com/server",
        },
        live: "https://demo.com",
        category: "Full Stack",
        featured: true,
        stats: {
            stars: 128,
            forks: 45,
        },
        status: "Production",
    },
    {
        id: 2,
        title: "E-commerce Platform",
        description: "Full-stack e-commerce solution with payment integration.",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80",
        technologies: ["Next.js","Stripe","Prisma"],
        github: {
            client: "https://github.com/client",
            server: "https://github.com/server",
        },
        live: "https://demo.com",
        category: "E-commerce",
        featured: false,
        stats: {
            stars: 98,
            forks: 30,
        },
        status: "Beta",
    },
    // Add more projects with similar structure
    {
        id: 3,
        title: "Social Media App",
        description: "A social media platform with real-time chat and notifications.",
        image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80",
        technologies: ["React","Firebase","Tailwind CSS"],
        github: {
            client: "https://github.com/client",
            server: "https://github.com/server",
        },
        live: "https://demo.com",
        category: "Social Media",
        featured: true,
        stats: {
            stars: 150,
            forks: 60,
        },
        status: "Production",
    },
    {
        id: 4,
        title: "Weather Forecast App",
        description: "A weather app providing real-time weather updates and forecasts.",
        image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80",
        technologies: ["Vue.js","Node.js","Express"],
        github: {
            client: "https://github.com/client",
            server: "https://github.com/server",
        },
        live: "https://demo.com",
        category: "Utility",
        featured: false,
        stats: {
            stars: 75,
            forks: 20,
        },
        status: "Beta",
    },
    {
        id: 5,
        title: "Fitness Tracker",
        description: "A fitness app to track workouts and monitor progress.",
        image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80",
        technologies: ["React Native","Redux","Firebase"],
        github: {
            client: "https://github.com/client",
            server: "https://github.com/server",
        },
        live: "https://demo.com",
        category: "Health",
        featured: true,
        stats: {
            stars: 200,
            forks: 80,
        },
        status: "Production",
    },
    {
        id: 6,
        title: "Online Learning Platform",
        description: "A platform for online courses and learning resources.",
        image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80",
        technologies: ["Angular","Node.js","MongoDB"],
        github: {
            client: "https://github.com/client",
            server: "https://github.com/server",
        },
        live: "https://demo.com",
        category: "Education",
        featured: false,
        stats: {
            stars: 180,
            forks: 70,
        },
        status: "Beta",
    },
    {
        id: 7,
        title: "Travel Booking App",
        description: "An app for booking flights, hotels, and car rentals.",
        image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80",
        technologies: ["React","GraphQL","Apollo"],
        github: {
            client: "https://github.com/client",
            server: "https://github.com/server",
        },
        live: "https://demo.com",
        category: "Travel",
        featured: true,
        stats: {
            stars: 220,
            forks: 90,
        },
        status: "Production",
    },
    {
        id: 8,
        title: "Recipe Sharing Platform",
        description: "A platform for sharing and discovering new recipes.",
        image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80",
        technologies: ["Vue.js","Firebase","Tailwind CSS"],
        github: {
            client: "https://github.com/client",
            server: "https://github.com/server",
        },
        live: "https://demo.com",
        category: "Food",
        featured: false,
        stats: {
            stars: 130,
            forks: 50,
        },
        status: "Beta",
    },
    {
        id: 9,
        title: "Music Streaming Service",
        description: "A music streaming app with playlists and recommendations.",
        image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80",
        technologies: ["React","Node.js","MongoDB"],
        github: {
            client: "https://github.com/client",
            server: "https://github.com/server",
        },
        live: "https://demo.com",
        category: "Entertainment",
        featured: true,
        stats: {
            stars: 250,
            forks: 100,
        },
        status: "Production",
    },
    {
        id: 10,
        title: "News Aggregator",
        description: "An app that aggregates news from various sources.",
        image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80",
        technologies: ["Angular","Node.js","Express"],
        github: {
            client: "https://github.com/client",
            server: "https://github.com/server",
        },
        live: "https://demo.com",
        category: "News",
        featured: false,
        stats: {
            stars: 160,
            forks: 60,
        },
        status: "Beta",
    },
    {
        id: 11,
        title: "Virtual Reality Experience",
        description: "A VR app for immersive experiences and simulations.",
        image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80",
        technologies: ["Unity","C#","VR"],
        github: {
            client: "https://github.com/client",
            server: "https://github.com/server",
        },
        live: "https://demo.com",
        category: "VR",
        featured: true,
        stats: {
            stars: 300,
            forks: 120,
        },
        status: "Production",
    },
];


const ProjectsPage = () => {

    // Single scroll animation setup
    const { scrollY } = useScroll();
    const headerOpacity = useTransform(scrollY,[0,300],[1,0.7]);
    const headerScale = useTransform(scrollY,[0,300],[1,0.95]);


    return (
        <div className="min-h-screen py-24 px-4 bg-gradient-to-b from-background/95 via-background/50 to-background/95 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto">
                {/* Enhanced Header Section matching TopProjects style */}
                <motion.div
                    style={{ opacity: headerOpacity,scale: headerScale }}
                    className="mb-12 relative text-center"
                >
                    {/* Enhanced header section */}
                    <div className="relative">
                        <h2 className="text-4xl md:text-6xl font-bold relative z-10 tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary/50">
                                Project
                            </span>{" "}
                            <span className="relative inline-block">
                                <span className="text-foreground">Gallery</span>
                                <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-primary/50 via-secondary to-primary animate-shimmer" />
                            </span>
                        </h2>
                        <div className="absolute -top-8 right-12 text-primary/20 animate-pulse">
                            <Sparkles className="w-16 h-16" />
                        </div>
                    </div>
                    <p className="text-xs md:text-xl mt-4 max-w-3xl mx-auto font-light leading-relaxed">
                        <span className="text-primary">Pushing boundaries</span>{" "}
                        <span className="text-muted-foreground">
                            with code that captivates, innovates, and
                        </span>
                        <span className="text-primary animate-pulse ml-1">
                            inspires greatness
                        </span>
                        <span className="block mt-2 text-muted-foreground/80">
                            From concept to reality, every pixel tells a story
                        </span>
                    </p>
                </motion.div>

                {/* Projects Grid - Enhanced Animation */}
                <div className="flex-1">
                    <AnimatePresence mode="wait">
                        {projects.length > 0 ? (
                            <motion.div
                                initial={{ opacity: 0,y: 20 }}
                                animate={{ opacity: 1,y: 0 }}
                                exit={{ opacity: 0,y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {projects.map((project,index) => (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0,y: 20 }}
                                        animate={{ opacity: 1,y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <ProjectCard
                                            project={project}
                                            index={index}
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0,scale: 0.95 }}
                                animate={{ opacity: 1,scale: 1 }}
                                exit={{ opacity: 0,scale: 0.9 }}
                                className="text-center py-12 px-4 rounded-lg border border-primary/10 bg-card/50 backdrop-blur-lg"
                            >
                                <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                                <p className="text-muted-foreground">
                                    Try adjusting your filters to find more projects
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;

"use client";

import React,{ useState,useMemo } from 'react';
import { motion,AnimatePresence,MotionValue,useScroll,useTransform } from 'framer-motion';
import ProjectCard from '@/components/ui/ProjectCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter,X,Code2,Boxes,Sparkles,Layers,Zap,Star,ChevronDown,Rocket } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card,CardContent } from "@/components/ui/card";
import { Collapsible,CollapsibleContent,CollapsibleTrigger } from "@/components/ui/collapsible";

// Sample projects data
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

// Extract unique categories and technologies
const categories = [...new Set(projects.map(project => project.category))];
const technologies = [...new Set(projects.flatMap(project => project.technologies))];

const ProjectsPage = () => {
    const [selectedCategories,setSelectedCategories] = useState<string[]>([]);
    const [selectedTechs,setSelectedTechs] = useState<string[]>([]);
    const [isCategoryOpen,setIsCategoryOpen] = useState(false);
    const [isTechOpen,setIsTechOpen] = useState(true);

    // Single scroll animation setup
    const { scrollY } = useScroll();
    const headerOpacity = useTransform(scrollY,[0,300],[1,0.7]);
    const headerScale = useTransform(scrollY,[0,300],[1,0.95]);

    // Filter animations
    const filterItemVariants = {
        hidden: { opacity: 0,x: -20 },
        visible: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.3,
            },
        }),
    };

    // Updated filter logic for multiple selections
    const filteredProjects = useMemo(() => {
        return projects.filter(project => {
            const matchesCategory = selectedCategories.length === 0 ||
                selectedCategories.includes(project.category);
            const matchesTech = selectedTechs.length === 0 ||
                project.technologies.some(tech => selectedTechs.includes(tech));

            return matchesCategory && matchesTech;
        });
    },[selectedCategories,selectedTechs]);

    // Updated clear filters function
    const clearFilters = () => {
        setSelectedCategories([]);
        setSelectedTechs([]);
    };

    // Helper functions for selection
    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev,category]
        );
    };

    const toggleTech = (tech: string) => {
        setSelectedTechs(prev =>
            prev.includes(tech)
                ? prev.filter(t => t !== tech)
                : [...prev,tech]
        );
    };

    return (
        <div className="min-h-screen py-24 px-4 bg-gradient-to-b from-background/95 via-background/50 to-background/95 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto">
                {/* Enhanced Header Section matching TopProjects style */}
                <motion.div
                    style={{ opacity: headerOpacity,scale: headerScale }}
                    className="mb-20 relative text-center"
                >
                    {/* Enhanced header section */}
                    <div className="relative">
                        <h2 className="text-6xl md:text-6xl font-bold relative z-10 tracking-tight">
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
                    <p className="text-sm md:text-xl mt-8 max-w-3xl mx-auto font-light leading-relaxed">
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

                {/* Main Content Layout */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar - Update Card styling */}
                    <div className="lg:w-80 flex-shrink-0">
                        <Card className="sticky top-24 overflow-hidden border-primary/10 backdrop-blur-xl bg-card/50 shadow-lg hover:shadow-xl transition-all duration-300">
                            <CardContent className="p-0">
                                {/* Filter Header */}
                                <div className="p-6 border-b bg-muted/50">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-full bg-primary/10">
                                            <Layers className="h-5 w-5 text-primary animate-pulse" />
                                        </div>
                                        <h3 className="text-lg font-semibold">Filters</h3>
                                    </div>
                                </div>

                                {/* Scrollable Filter Content */}
                                <div className="overflow-y-auto max-h-[calc(100vh-250px)] scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent">
                                    <div className="p-6 space-y-6">
                                        {/* Technologies Section - Open by default */}
                                        <Collapsible open={isTechOpen} onOpenChange={setIsTechOpen}>
                                            <CollapsibleTrigger className="flex items-center justify-between w-full group">
                                                <div className="flex items-center gap-2">
                                                    <motion.div
                                                        whileHover={{ rotate: 90 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="p-1.5 rounded-md bg-primary/10 group-hover:bg-primary/20"
                                                    >
                                                        <Code2 className="h-4 w-4 text-primary" />
                                                    </motion.div>
                                                    <h4 className="font-medium">Technologies</h4>
                                                </div>
                                                <motion.div
                                                    animate={{ rotate: isTechOpen ? 180 : 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                                </motion.div>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent className="mt-4">
                                                <motion.div
                                                    className="grid grid-cols-2 gap-2"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    {technologies.map((tech,index) => (
                                                        <motion.div
                                                            key={tech}
                                                            variants={filterItemVariants}
                                                            initial="hidden"
                                                            animate="visible"
                                                            custom={index}
                                                        >
                                                            <Badge
                                                                variant={selectedTechs.includes(tech) ? "default" : "outline"}
                                                                className={`
                                                                    w-full justify-start cursor-pointer transition-all duration-300 py-1.5
                                                                    ${selectedTechs.includes(tech)
                                                                        ? 'bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 scale-105'
                                                                        : 'hover:bg-accent hover:scale-105'}
                                                                `}
                                                                onClick={() => toggleTech(tech)}
                                                            >
                                                                <motion.span
                                                                    initial={false}
                                                                    animate={{ scale: selectedTechs.includes(tech) ? 1.05 : 1 }}
                                                                    className="flex items-center gap-2"
                                                                >
                                                                    {tech}
                                                                </motion.span>
                                                            </Badge>
                                                        </motion.div>
                                                    ))}
                                                </motion.div>
                                            </CollapsibleContent>
                                        </Collapsible>

                                        {/* Categories Section */}
                                        <Collapsible open={isCategoryOpen} onOpenChange={setIsCategoryOpen}>
                                            <CollapsibleTrigger className="flex items-center justify-between w-full group">
                                                <div className="flex items-center gap-2">
                                                    <motion.div
                                                        whileHover={{ rotate: 90 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="p-1.5 rounded-md bg-primary/10 group-hover:bg-primary/20"
                                                    >
                                                        <Boxes className="h-4 w-4 text-primary" />
                                                    </motion.div>
                                                    <h4 className="font-medium">Categories</h4>
                                                </div>
                                                <motion.div
                                                    animate={{ rotate: isCategoryOpen ? 180 : 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                                </motion.div>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent className="mt-4">
                                                <motion.div
                                                    className="space-y-2"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    {categories.map((category,index) => (
                                                        <motion.div
                                                            key={category}
                                                            variants={filterItemVariants}
                                                            initial="hidden"
                                                            animate="visible"
                                                            custom={index}
                                                        >
                                                            <Badge
                                                                variant={selectedCategories.includes(category) ? "default" : "outline"}
                                                                className={`
                                                                    w-full justify-start cursor-pointer transition-all duration-300 py-1.5
                                                                    ${selectedCategories.includes(category)
                                                                        ? 'bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 scale-105'
                                                                        : 'hover:bg-accent hover:scale-105'}
                                                                `}
                                                                onClick={() => toggleCategory(category)}
                                                            >
                                                                <motion.span
                                                                    initial={false}
                                                                    animate={{ scale: selectedCategories.includes(category) ? 1.05 : 1 }}
                                                                    className="flex items-center gap-2"
                                                                >
                                                                    {category}
                                                                </motion.span>
                                                            </Badge>
                                                        </motion.div>
                                                    ))}
                                                </motion.div>
                                            </CollapsibleContent>
                                        </Collapsible>

                                        {/* Active Filters */}
                                        <AnimatePresence>
                                            {(selectedCategories.length > 0 || selectedTechs.length > 0) && (
                                                <motion.div
                                                    initial={{ opacity: 0,height: 0 }}
                                                    animate={{ opacity: 1,height: "auto" }}
                                                    exit={{ opacity: 0,height: 0 }}
                                                    className="pt-6 border-t border-primary/10"
                                                >
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center gap-2">
                                                            <Star className="h-4 w-4 text-primary" />
                                                            <span className="text-sm font-medium">Active Filters</span>
                                                        </div>
                                                        {(selectedCategories.length > 0 || selectedTechs.length > 0) && (
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={clearFilters}
                                                                className="h-8 px-2 text-muted-foreground hover:text-destructive"
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </Button>
                                                        )}
                                                    </div>
                                                    <div className="space-y-2">
                                                        {selectedTechs.length > 0 && (
                                                            <motion.div
                                                                className="flex flex-wrap gap-2"
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                            >
                                                                {selectedTechs.map(tech => (
                                                                    <Badge
                                                                        key={tech}
                                                                        variant="secondary"
                                                                        className="flex items-center gap-1 group"
                                                                    >
                                                                        {tech}
                                                                        <X
                                                                            className="h-3 w-3 cursor-pointer group-hover:text-destructive"
                                                                            onClick={() => toggleTech(tech)}
                                                                        />
                                                                    </Badge>
                                                                ))}
                                                            </motion.div>
                                                        )}
                                                        {selectedCategories.length > 0 && (
                                                            <motion.div
                                                                className="flex flex-wrap gap-2"
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                            >
                                                                {selectedCategories.map(category => (
                                                                    <Badge
                                                                        key={category}
                                                                        variant="secondary"
                                                                        className="flex items-center gap-1 group"
                                                                    >
                                                                        {category}
                                                                        <X
                                                                            className="h-3 w-3 cursor-pointer group-hover:text-destructive"
                                                                            onClick={() => toggleCategory(category)}
                                                                        />
                                                                    </Badge>
                                                                ))}
                                                            </motion.div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Projects Grid - Enhanced Animation */}
                    <div className="flex-1">
                        <AnimatePresence mode="wait">
                            {filteredProjects.length > 0 ? (
                                <motion.div
                                    initial={{ opacity: 0,y: 20 }}
                                    animate={{ opacity: 1,y: 0 }}
                                    exit={{ opacity: 0,y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="grid md:grid-cols-2 gap-6"
                                >
                                    {filteredProjects.map((project,index) => (
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
        </div>
    );
};

export default ProjectsPage;

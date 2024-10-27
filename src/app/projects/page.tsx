"use client";

import React from 'react';
import { motion,AnimatePresence,useScroll,useTransform } from 'framer-motion';
import ProjectCard from '@/components/ui/ProjectCard';
import { Sparkles } from 'lucide-react';
import { useGetAllProjectsQuery } from '@/redux/features/project/projectApi';
import { Project } from '@/types/project';



const ProjectsPage = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data: projectsData,isLoading,isError } = useGetAllProjectsQuery({});

    const projects = projectsData?.data || [];

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
                                {projects.map((project: Project,index: number) => (
                                    <motion.div
                                        key={project._id}
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

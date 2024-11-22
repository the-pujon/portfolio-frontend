"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles,Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCard from "../ui/ProjectCard";
import { useGetFeaturedProjectsByPriorityQuery } from "@/redux/features/project/projectApi";
import { Project } from "@/types/project";

const TopProjects = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data: projectsData,isLoading,isError } = useGetFeaturedProjectsByPriorityQuery({});

    const projects = projectsData?.data || [];

    return (
        <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-7xl mx-auto relative"
            >
                {/* Enhanced header section */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-10 sm:mb-16 md:mb-20 gap-6 sm:gap-8">
                    <div className="text-center sm:text-left relative w-full sm:w-2/3">
                        <div className="relative">
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold relative z-10 tracking-tight">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary/50">
                                    Masterpiece
                                </span>{" "}
                                <span className="relative inline-block">
                                    <span className="text-foreground">in</span>
                                </span>{" "}
                                <span className="relative inline-block">
                                    <span className="text-foreground">Motion</span>
                                    <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-primary/50 via-secondary to-primary animate-shimmer" />
                                </span>
                            </h2>
                            <div className="absolute -top-6 -right-6 sm:-top-8 sm:right-0 text-primary/20 animate-pulse">
                                <Sparkles className="w-12 h-12 sm:w-16 sm:h-16" />
                            </div>
                        </div>
                        <p className="text-sm sm:text-base md:text-lg mt-4 sm:mt-6 max-w-3xl font-light leading-relaxed">
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
                    </div>
                    <Button
                        variant="outline"
                        size="lg"
                        className="group hover:bg-primary hover:text-white transition-all duration-300 border-primary/20 px-6 sm:px-8 mt-6 sm:mt-0"
                    >
                        View All Projects
                        <Rocket className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
                    </Button>
                </div>

                {/* Project cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {projects.map((project: Project,index: number) => (
                        <ProjectCard key={project._id} project={project} index={index} />
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default TopProjects;

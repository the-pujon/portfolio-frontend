"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCard from "../ui/ProjectCard";
//import ProjectCard from "./ProjectCard";

const projects = [
  {
    id: 1,
    title: "Project Management Dashboard",
    description:
      "A modern project management tool built with React and Node.js. Features include real-time updates, drag-and-drop tasks, and team collaboration.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
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
    description: "Full-stack e-commerce solution with payment integration",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80",
    technologies: ["Next.js", "Stripe", "Prisma"],
    github: "https://github.com",
    live: "https://demo.com",
    category: "E-commerce",
    featured: false,
    stats: {
      stars: 128,
      forks: 45,
    },
    status: "Production",
  },
  // Add 4 more projects with similar structure
];

const TopProjects = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto relative"
      >
        {/* Enhanced header section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-20 gap-8">
          <div className="text-center sm:text-left relative">
            {" "}
            <div className="relative">
              <h2 className="text-6xl md:text-6xl font-bold relative z-10 tracking-tight">
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
              <div className="absolute -top-8 right-12 text-primary/20 animate-pulse">
                <Sparkles className="w-16 h-16" />
              </div>
            </div>
            <p className="text-sm md:text-xl mt-8 max-w-3xl font-light leading-relaxed">
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
            className="group hover:bg-primary hover:text-white transition-all duration-300 border-primary/20 px-8"
          >
            View All Projects
            <Rocket className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
          </Button>
        </div>

        {/* Simplified project cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default TopProjects;

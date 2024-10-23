import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  ArrowRight,
  Star,
  ArrowUpRight,
  Sparkles,
  Rocket,
  Trophy,
  Zap,
  Award,
  Gem,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

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
    <section className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-background/90">
      {/* Enhanced layered background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_800px_at_50%_-100px,#3b82f620,transparent)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_800px_at_80%_80%,#8b5cf620,transparent)]" />
        <div className="absolute top-1/2 left-1/2 w-full h-full bg-[conic-gradient(from_0deg_at_50%_50%,#3b82f610,#8b5cf610,#3b82f610)] animate-slow-spin" />
      </div>

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
              <div className="absolute -top-8 -right-8 text-primary/20 animate-pulse">
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

        {/* Enhanced project cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <Card className="group h-full flex flex-col relative hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-primary/10 overflow-hidden bg-gradient-to-br from-background/80 via-background to-muted/20 backdrop-blur-sm hover:border-primary/30">
                {/* Glowing effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-white/10 to-secondary/10 animate-gradient -z-10" />
                </div>

                {/* Enhanced status badge */}
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-background/50 backdrop-blur-md border-primary/20 text-primary px-4 py-1.5 flex items-center gap-2 shadow-lg">
                    {project.status === "Production" && (
                      <Zap className="h-3 w-3" />
                    )}
                    {project.status === "Beta" && (
                      <Trophy className="h-3 w-3" />
                    )}
                    {project.status}
                  </Badge>
                </div>

                {/* Enhanced featured badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-primary text-white px-3 py-1 flex items-center gap-2 animate-pulse">
                      <Star className="h-3 w-3" fill="currentColor" />
                      Featured
                    </Badge>
                  </div>
                )}

                <CardContent className="p-0 flex flex-col h-full">
                  {/* Enhanced image container */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px] flex items-end p-6">
                      <AnimatePresence>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          className="flex flex-wrap gap-2"
                        >
                          {/* Enhanced buttons */}
                          <Button
                            size="sm"
                            className="bg-primary/90 hover:bg-primary text-white backdrop-blur-sm hover:scale-105 transition-all"
                            onClick={() => window.open(project.github.client)}
                          >
                            <Github className="h-4 w-4 mr-2" />
                            Client
                          </Button>
                          <Button
                            size="sm"
                            className="bg-primary/90 hover:bg-primary text-white backdrop-blur-sm hover:scale-105 transition-all"
                            onClick={() => window.open(project.github.server)}
                          >
                            <Github className="h-4 w-4 mr-2" />
                            Server
                          </Button>
                          <Button
                            size="sm"
                            className="bg-secondary/90 hover:bg-secondary text-white backdrop-blur-sm hover:scale-105 transition-all"
                            onClick={() => window.open(project.live)}
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Live Demo
                          </Button>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Enhanced content container */}
                  <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-transparent to-muted/5">
                    {/* Title and category */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-xl group-hover:text-primary transition-colors line-clamp-1">
                          {project.title}
                        </h3>
                        <Badge
                          variant="outline"
                          className="bg-muted shrink-0 ml-2"
                        >
                          {project.category}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Push the footer content to the bottom */}
                    <div className="mt-auto space-y-4">
                      {/* Project stats */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          <span>{project.stats.stars}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Github className="h-4 w-4" />
                          <span>{project.stats.forks}</span>
                        </div>
                      </div>

                      {/* Enhanced technology badges */}
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-primary/10">
                        {project.technologies.map((tech, idx) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="bg-primary/5 hover:bg-primary/10 transition-colors hover:scale-105 duration-300"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      {/* Enhanced Show Details button */}
                      <motion.div className="pt-4 z-10 cursor-pointer">
                        <Button
                          variant="ghost"
                          className="w-full group/btn hover:bg-primary hover:text-white border border-primary/20 transition-all duration-300"
                        >
                          <span className="flex items-center gap-2">
                            Explore Project
                            <ArrowUpRight className="h-4 w-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                          </span>
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default TopProjects;

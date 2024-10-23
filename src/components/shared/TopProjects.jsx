import React from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
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
import { Tilt } from "react-tilt"; // Add this package for 3D tilt effects

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
  {
    id: 3,
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
    id: 4,
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
  {
    id: 5,
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
    id: 6,
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
  const { scrollYProgress } = useScroll();
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_800px_at_50%_-100px,#3b82f620,transparent)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[conic-gradient(from_0deg_at_50%_50%,#3b82f610,#8b5cf610,#3b82f610)] rounded-full blur-3xl animate-slow-spin" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_400px_at_50%_50%,rgba(59,130,246,0.1),transparent)] animate-pulse" />
      </div>

      <motion.div
        style={{
          scale: scaleProgress,
          opacity: opacityProgress,
        }}
        className="max-w-7xl mx-auto relative"
      >
        {/* Enhanced timeline line with animated particles */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full">
          <div className="w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary rounded-full"
                animate={{
                  y: [0, 1000],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 10 + 5,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
                style={{
                  left: Math.random() * 40 - 20,
                  top: -20,
                }}
              />
            ))}
          </div>
        </div>

        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="mb-32 relative"
          >
            {/* Enhanced timeline node */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12">
              <motion.div
                className="w-full h-full relative"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-20 blur-sm" />
                <div className="absolute inset-2 rounded-full bg-gradient-to-r from-primary to-secondary" />
                <div className="absolute inset-3 rounded-full bg-background" />
                <div className="absolute inset-4 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse" />
              </motion.div>
            </div>

            {/* Project card with enhanced 3D effects */}
            <div
              className={`flex ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              } w-full`}
            >
              <Tilt
                className={`w-[calc(50%-3rem)] ${
                  index % 2 === 0 ? "pr-8" : "pl-8"
                }`}
                options={{
                  max: 15,
                  scale: 1.05,
                  speed: 1000,
                }}
              >
                <Card className="group relative overflow-hidden backdrop-blur-lg border-primary/20 bg-gradient-to-br from-background/90 to-background/50">
                  {/* Animated gradient border */}
                  <div className="absolute inset-0 p-[1px] bg-gradient-to-r from-transparent via-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-background" />
                  </div>

                  {/* Enhanced hover effects and content */}
                  <CardContent className="relative z-10">
                    {/* Glowing effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-white/10 to-secondary/10 animate-gradient" />
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
                        <motion.div className="pt-4">
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

                  {/* Interactive particle effect on hover */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{
                      background: [
                        "radial-gradient(600px circle at var(--x) var(--y), rgba(59,130,246,0.15), transparent 40%)",
                      ],
                    }}
                    transition={{ duration: 0.2 }}
                    style={{
                      "--x": "50%",
                      "--y": "50%",
                    }}
                  />
                </Card>
              </Tilt>
            </div>

            {/* Enhanced year indicator */}
            <motion.div
              className={`absolute top-0 ${
                index % 2 === 0
                  ? "right-[calc(50%+2rem)]"
                  : "left-[calc(50%+2rem)]"
              }`}
              whileHover={{ scale: 1.1 }}
            >
              <Badge
                variant="outline"
                className="bg-background/50 backdrop-blur-md border-primary/20 px-6 py-2 shadow-lg"
              >
                <motion.span
                  className="inline-block"
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  {new Date().getFullYear()}
                </motion.span>
              </Badge>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TopProjects;

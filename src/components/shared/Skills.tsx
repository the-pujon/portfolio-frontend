"use client";

import React,{ useRef,useEffect } from 'react';
import { motion,useAnimation,useInView } from 'framer-motion';
//import * as motion from 'framer-motion/client';
import { Code,Server,Database,Braces,Palette,Cloud,Star } from 'lucide-react';
import reactImg from '../../assets/react.png';
import Image from 'next/image';

const Skills: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref as React.RefObject<Element>);
    const controls = useAnimation();

    useEffect(() => {
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

    const skillCategories = [
        {
            icon: Code,
            title: "Frontend",
            skills: [
                { name: "React",image: reactImg },
                { name: "Next.js",image: reactImg },
                { name: "TypeScript",image: reactImg },
                { name: "Tailwind CSS",image: reactImg },
                { name: "Redux",image: reactImg },
                { name: "Zustand",image: reactImg },
            ],
        },
        {
            icon: Server,
            title: "Backend",
            skills: [
                { name: "Node.js",image: reactImg },
                { name: "Express",image: reactImg },
                { name: "Python",image: reactImg },
                { name: "Django",image: reactImg },
                { name: "RESTful APIs",image: reactImg },
                { name: "GraphQL",image: reactImg },
            ],
        },
        {
            icon: Database,
            title: "Databases",
            skills: [
                { name: "MongoDB",image: reactImg },
                { name: "PostgreSQL",image: reactImg },
                { name: "MySQL",image: reactImg },
                { name: "Redis",image: reactImg },
                { name: "Prisma",image: reactImg },
                { name: "Mongoose",image: reactImg },
            ],
        },
        {
            icon: Braces,
            title: "Languages",
            skills: [
                { name: "JavaScript",image: reactImg },
                { name: "TypeScript",image: reactImg },
                { name: "Python",image: reactImg },
                { name: "Java",image: reactImg },
                { name: "C++",image: reactImg },
                { name: "SQL",image: reactImg },
            ],
        },
        {
            icon: Palette,
            title: "Design",
            skills: [
                { name: "Figma",image: reactImg },
                { name: "Adobe XD",image: reactImg },
                { name: "UI/UX Design",image: reactImg },
                { name: "Responsive Design",image: reactImg },
            ],
        },
        {
            icon: Cloud,
            title: "DevOps & Tools",
            skills: [
                { name: "Git",image: reactImg },
                { name: "Docker",image: reactImg },
                { name: "CI/CD",image: reactImg },
                { name: "AWS",image: reactImg },
                { name: "Heroku",image: reactImg },
                { name: "Vercel",image: reactImg },
            ],
        },
    ];

    return (
        <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
            <motion.div
                ref={ref}
                animate={controls}
                initial="hidden"
                variants={containerVariants}
                className="max-w-7xl mx-auto"

            >
                <div className="flex flex-col items-center mb-20">
                    <div className="relative">
                        <h2 className="text-6xl md:text-6xl font-bold relative z-10 tracking-tight text-center">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary/50">
                                Technical
                            </span>{" "}
                            <span className="relative inline-block">
                                <span className="text-foreground">Arsenal</span>
                                <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-primary/50 via-secondary to-primary animate-shimmer" />
                            </span>
                        </h2>
                        <div className="absolute -top-8 -right-8 text-primary/20 animate-pulse">
                            <Code className="w-16 h-16" />
                        </div>
                    </div>
                    <p className="text-xl md:text-xl mt-8 max-w-2xl font-light text-center leading-relaxed">
                        <span className="text-primary">Mastering modern technologies</span>{" "}
                        <span className="text-muted-foreground">
                            — from concept to deployment
                        </span>
                        <span className="block mt-2 text-muted-foreground/80">
                            A comprehensive toolkit for building exceptional digital experiences
                        </span>
                    </p>
                </div>

                <div className="relative">
                    {/* Glowing timeline line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-secondary opacity-50 blur-sm" />
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary to-secondary" />

                    {skillCategories.map((category,index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className={`flex items-center mb-2 ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}
                        >
                            <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
                                <motion.div
                                    className="bg-card p-6 rounded-lg shadow-lg relative overflow-hidden group"
                                    whileHover={{ scale: 1.05,boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.3)" }}
                                    transition={{ type: 'spring',stiffness: 300 }}
                                >
                                    {/* Improved background decoration */}
                                    <motion.div
                                        className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full -mr-16 -mt-16"
                                        animate={{
                                            scale: [1,1.2,1],
                                            rotate: [0,90,0],
                                        }}
                                        transition={{ duration: 10,repeat: Infinity,ease: 'easeInOut' }}
                                    />
                                    <h3 className="flex items-center text-2xl font-bold mb-4 text-primary">
                                        <category.icon className="mr-2 h-6 w-6" />
                                        {category.title}
                                    </h3>
                                    <ul className="grid grid-cols-2 gap-4 list-none">
                                        {category.skills.map((skill,skillIndex) => (
                                            <motion.li
                                                key={skillIndex}
                                                className="relative flex gap-2 items-center text-muted-foreground"
                                                whileHover={{ x: 5,color: 'var(--primary)' }}
                                                transition={{ type: 'spring',stiffness: 300 }}
                                            >
                                                <Image
                                                    src={reactImg}
                                                    alt="Alex Johnson"
                                                    width={20}
                                                    height={20}
                                                //className='circle w-full h-full object-cover'
                                                />
                                                {skill.name}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </div>

                            {/* Glowing connector circle */}
                            <div className="w-8 h-8 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary rounded-full border-4 border-background z-10 shadow-lg">
                                <div className="w-full h-full rounded-full bg-primary animate-pulse" />
                            </div>

                            {/* Removed connector line */}
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Enhanced floating icons background */}
            {[Code,Server,Database,Braces,Palette,Cloud,Star].map((Icon,index) => (
                <motion.div
                    key={index}
                    className="absolute text-primary/10"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        fontSize: `${Math.random() * 40 + 20}px`,
                    }}
                    animate={{
                        y: [0,-10,0],
                        rotate: [0,360],
                        scale: [1,1.1,1],
                    }}
                    transition={{
                        duration: Math.random() * 5 + 5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <Icon />
                </motion.div>
            ))}

            {/* Enhanced background decorations */}
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

export default Skills;

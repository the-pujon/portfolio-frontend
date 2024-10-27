"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Palette,Database,Server,Globe,Cloud,Smartphone,Lock,Code } from 'lucide-react';
import { useGetAllSkillsQuery } from '../../redux/features/skill/skillApi';
import Image from 'next/image';

interface Skill {
    _id: string;
    name: string;
    category: 'frontend' | 'backend' | 'design' | 'database' | 'devops' | 'mobile' | 'security';
    image: string;
}



const MySkill: React.FC = () => {
    const { data: skillsData,isLoading,isError } = useGetAllSkillsQuery({});
    const skills = skillsData?.data;

    if (isLoading) {
        return <div>Loading skills...</div>;
    }

    if (isError) {
        return <div>Error loading skills. Please try again later.</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-8 container mx-auto"
        >
            <div className="flex flex-col items-center mb-20">
                <div className="relative">
                    <h2 className="text-6xl md:text-7xl font-bold relative z-10 tracking-tight text-center">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary/50">
                            Tech
                        </span>{" "}
                        <span className="relative inline-block">
                            <span className="text-foreground">Arsenal</span>
                        </span>
                    </h2>
                    <div className="absolute -top-8 -right-8 text-primary/20 animate-pulse">
                        <Code className="w-16 h-16" />
                    </div>
                </div>
                <div className="text-xl md:text-2xl mt-8 max-w-4xl font-light text-center leading-relaxed">
                    <p className="text-muted-foreground">
                        Unleashing a <span className='text-primary font-semibold'>powerhouse of skills</span> to craft
                        <span className='text-secondary font-semibold'> digital marvels</span>
                    </p>
                </div>
                <motion.div
                    className="mt-6 px-6 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium"
                    initial={{ opacity: 0,y: 20 }}
                    animate={{ opacity: 1,y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    From Front-End Finesse to Back-End Brilliance
                </motion.div>
            </div>

            <div className="flex flex-wrap justify-center">
                {skills && skills.map((skill: Skill,index: number) => {
                    return (
                        <motion.div
                            key={skill._id}
                            className="w-32 h-36 m-2"
                            initial={{ opacity: 0,y: 50 }}
                            animate={{ opacity: 1,y: 0 }}
                            transition={{ duration: 0.5,delay: index * 0.1 }}
                        >
                            <motion.div
                                className="hexagon bg-card hover:bg-primary/10 transition-colors duration-300 shadow-lg hover:shadow-xl"
                                whileHover={{ scale: 1.1,rotateY: 180 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="hexagon-content flex flex-col items-center justify-center bg-primary/10">
                                    <motion.div
                                        className="icon-container mb-2"
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Image src={skill.image} alt={skill.name} width={32} height={32} />
                                    </motion.div>
                                    <h3 className="text-base font-semibold text-center">{skill.name}</h3>
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        {
                                            skill.category.toLowerCase() === 'frontend' && <Globe className="w-4 h-4" />
                                        }
                                        {
                                            skill.category.toLowerCase() === 'backend' && <Server className="w-4 h-4" />
                                        }
                                        {
                                            skill.category.toLowerCase() === 'design' && <Palette className="w-4 h-4" />
                                        }
                                        {
                                            skill.category.toLowerCase() === 'database' && <Database className="w-4 h-4" />
                                        }
                                        {
                                            skill.category.toLowerCase() === 'devops' && <Cloud className="w-4 h-4" />
                                        }
                                        {
                                            skill.category.toLowerCase() === 'mobile' && <Smartphone className="w-4 h-4" />
                                        }
                                        {
                                            skill.category.toLowerCase() === 'security' && <Lock className="w-4 h-4" />
                                        }

                                        {skill.category}</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default MySkill;

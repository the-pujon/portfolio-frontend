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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data: skillsData,isLoading,isError,error } = useGetAllSkillsQuery({});
    const skills = skillsData?.data;

    console.log(error)

    //if (isLoading) {
    //    return <div>Loading skills...</div>;
    //}

    //if (isError) {
    //    return <div>Error loading skills. Please try again later.</div>;
    //}

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-4 sm:p-6 md:p-8 container mx-auto"
        >
            <div className="flex flex-col items-center mb-10 sm:mb-16 md:mb-20">
                <div className="relative">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold relative z-10 tracking-tight text-center">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary/50">
                            Tech
                        </span>{" "}
                        <span className="relative inline-block">
                            <span className="text-foreground">Arsenal</span>
                        </span>
                    </h2>
                    <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 md:-top-8 md:-right-8 text-primary/20 animate-pulse">
                        <Code className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16" />
                    </div>
                </div>
                <div className="text-lg sm:text-xl md:text-2xl mt-4 sm:mt-6 md:mt-8 max-w-4xl font-light text-center leading-relaxed px-4">
                    <p className="text-muted-foreground">
                        Unleashing a <span className='text-primary font-semibold'>powerhouse of skills</span> to craft
                        <span className='text-secondary font-semibold'> digital marvels</span>
                    </p>
                </div>
                <motion.div
                    className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 bg-primary/10 rounded-full text-primary text-xs sm:text-sm font-medium"
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
                            className="w-20 sm:w-24 md:w-28 h-24 sm:h-28 md:h-32 m-1 sm:m-2"
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
                                        className="icon-container mb-1"
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Image src={skill.image} alt={skill.name} width={20} height={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
                                    </motion.div>
                                    <h3 className="text-[10px] sm:text-xs md:text-sm font-semibold text-center">{skill.name}</h3>
                                    <span className="text-[8px] sm:text-[10px] md:text-xs text-muted-foreground hidden sm:flex items-center gap-1">
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

                                        <span className="hidden sm:inline">{skill.category}</span>
                                    </span>
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

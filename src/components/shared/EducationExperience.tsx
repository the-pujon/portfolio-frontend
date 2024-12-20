/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React,{ useRef } from 'react';
import { motion,useAnimation,useInView } from 'framer-motion';
import { GraduationCap,Briefcase,Star } from 'lucide-react';
import EducationExperienceCard from '../ui/EducationExperienceCard';
import EducationExperienceMob from './Mobile/EducationExperienceMob';
import { useGetAllEducationsQuery } from '@/redux/features/education/educationApi';
import { useGetAllExperiencesQuery } from '@/redux/features/experience/experienceApi';

const EducationExperience = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref as React.RefObject<Element>);
    const controls = useAnimation();

    const { data: educationsData,isLoading: isEducationLoading } = useGetAllEducationsQuery({});
    const { data: experiencesData,isLoading: isExperienceLoading } = useGetAllExperiencesQuery({});

    React.useEffect(() => {
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

    //if (isEducationLoading || isExperienceLoading) {
    //    return <div>Loading education and experience data...</div>;
    //}

    const educations = educationsData?.data || [];
    const experiences = experiencesData?.data || [];

    // Format education data
    const formattedEducations = educations.map((edu: any) => ({
        ...edu,
        title: edu.degree,
        organization: edu.institution,
        location: edu.fieldOfStudy,
        duration: `${new Date(edu.startDate).getFullYear()} - ${new Date(edu.endDate).getFullYear()}`,
        points: [edu.fieldOfStudy],
        type: 'education'
    }));

    // Format experience data
    const formattedExperiences = experiences.map((exp: any) => ({
        ...exp,
        title: exp.position,
        organization: exp.companyName,
        location: '',
        duration: `${new Date(exp.startDate).getFullYear()} - ${new Date(exp.endDate).getFullYear()}`,
        points: [],
        type: 'experience'
    }));

    // Combine and sort education and experience data
    const timelineData = [...formattedEducations,...formattedExperiences].sort((a,b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );

    return (
        <section id="education-experience" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
            <motion.div
                ref={ref}
                animate={controls}
                initial="hidden"
                variants={containerVariants}
                className="max-w-7xl mx-auto"
            >
                {/* Enhanced Responsive Title Section */}
                <div className="flex flex-col items-center mb-10 sm:mb-16 md:mb-20">
                    <motion.div
                        className="relative mb-4 sm:mb-6"
                        variants={{
                            hidden: { opacity: 0,y: -20 },
                            visible: { opacity: 1,y: 0 }
                        }}
                    >
                        <span className="text-xs sm:text-sm md:text-base font-medium text-primary/80 tracking-wider uppercase mb-2 sm:mb-4 block text-center">
                            Career Milestones & Academic Achievements
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold relative z-10 tracking-tight text-center px-4">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary/50">
                                Building
                            </span>{" "}
                            <span className="relative inline-block">
                                <span className="text-foreground">Excellence</span>
                                <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-primary/50 via-secondary to-primary animate-shimmer" />
                            </span>
                        </h2>
                        <div className="absolute -top-4 sm:-top-6 md:-top-8 -right-4 sm:-right-6 md:-right-8 text-primary/20 animate-pulse">
                            <Briefcase className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
                        </div>
                    </motion.div>

                    <motion.p
                        className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-[90%] sm:max-w-2xl md:max-w-3xl text-center leading-relaxed px-4"
                        variants={{
                            hidden: { opacity: 0,y: 20 },
                            visible: { opacity: 1,y: 0 }
                        }}
                    >
                        From <span className="text-primary font-medium">academic foundations</span> to{" "}
                        <span className="text-primary font-medium">professional triumphs</span>,
                        explore the journey that shapes my expertise in{" "}
                        <span className="text-primary font-medium">full-stack development</span>.
                    </motion.p>

                    <motion.div
                        className="flex flex-wrap justify-center gap-2 mt-4 sm:mt-6 text-xs sm:text-sm text-muted-foreground/60 px-4"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1 }
                        }}
                    >
                        <span className="flex items-center">
                            <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            Education
                        </span>
                        <span className="px-2">•</span>
                        <span className="flex items-center">
                            <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            Experience
                        </span>
                        <span className="px-2">•</span>
                        <span className="flex items-center">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            Achievements
                        </span>
                    </motion.div>
                </div>

                {/* Mobile Layout */}
                <EducationExperienceMob timelineData={timelineData} />

                {/* Desktop Layout */}
                <div className="hidden md:block">
                    <div className="grid grid-cols-2 gap-8 mb-12">
                        <div className="flex flex-col items-center justify-center">
                            <div className="flex items-center mb-2">
                                <Briefcase className="w-5 h-5 lg:w-6 lg:h-6 mr-2 text-primary" />
                                <span className="text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                                    Professional Experience
                                </span>
                            </div>
                            <span className="text-sm lg:text-base text-muted-foreground/60">
                                Building & Leading
                            </span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <div className="flex items-center mb-2">
                                <GraduationCap className="w-5 h-5 lg:w-6 lg:h-6 mr-2 text-primary" />
                                <span className="text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                                    Academic Background
                                </span>
                            </div>
                            <span className="text-sm lg:text-base text-muted-foreground/60">
                                Learning & Growing
                            </span>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-secondary opacity-50 blur-sm" />
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary to-secondary" />

                        {timelineData.map((item,index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="grid grid-cols-2 gap-8 mb-12 relative"
                            >
                                <motion.div
                                    className={`bg-card p-6 rounded-lg shadow-lg relative overflow-hidden ${item.type === 'experience' ? '' : 'col-start-2'}`}
                                    whileHover={{ scale: 1.02,boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.3)" }}
                                    transition={{ type: 'spring',stiffness: 300 }}
                                >
                                    <EducationExperienceCard item={item} />
                                </motion.div>

                                {/* Timeline dot */}
                                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                                    <div className="w-4 h-4 bg-primary rounded-full border-4 border-background" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default EducationExperience;

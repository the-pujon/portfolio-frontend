/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase,GraduationCap } from 'lucide-react';
import EducationExperienceCard from '@/components/ui/EducationExperienceCard';

const EducationExperienceMob = ({ timelineData }: { timelineData: any }) => {

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

    return (
        <div className="block md:hidden space-y-8 sm:space-y-12">
            {/* Work Experience Section */}
            <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-start mb-4 sm:mb-6">
                    <div className="flex items-center">
                        <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary" />
                        <span className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            Professional Experience
                        </span>
                    </div>
                    <span className="text-xs sm:text-sm text-muted-foreground/60 mt-1 sm:mt-0 sm:ml-3">
                        Building & Leading
                    </span>
                </div>
                <div className="space-y-4">
                    {timelineData.map((item: any,index: any) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="bg-card p-4 sm:p-6 rounded-lg shadow-lg relative overflow-hidden"
                            whileHover={{ scale: 1.02,boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.3)" }}
                            transition={{ type: 'spring',stiffness: 300 }}
                        >
                            <EducationExperienceCard item={item.experience} />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Education Section */}
            <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-start mb-4 sm:mb-6">
                    <div className="flex items-center">
                        <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary" />
                        <span className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            Academic Background
                        </span>
                    </div>
                    <span className="text-xs sm:text-sm text-muted-foreground/60 mt-1 sm:mt-0 sm:ml-3">
                        Learning & Growing
                    </span>
                </div>
                <div className="space-y-4">
                    {timelineData.map((item: any,index: any) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="bg-card p-4 sm:p-6 rounded-lg shadow-lg relative overflow-hidden"
                            whileHover={{ scale: 1.02,boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.3)" }}
                            transition={{ type: 'spring',stiffness: 300 }}
                        >
                            <EducationExperienceCard item={item.education} /><EducationExperienceCard item={item.education} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EducationExperienceMob;
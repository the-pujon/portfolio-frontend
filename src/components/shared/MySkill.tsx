import React from 'react';
import { motion } from 'framer-motion';
import { Palette,Database,Server,Globe,Cloud,Smartphone,Lock } from 'lucide-react';

interface Skill {
    name: string;
    category: 'frontend' | 'backend' | 'design' | 'database' | 'devops' | 'mobile' | 'security';
}

const skills: Skill[] = [
    { name: 'React',category: 'frontend' },
    { name: 'TypeScript',category: 'frontend' },
    { name: 'Next.js',category: 'frontend' },
    { name: 'Vue.js',category: 'frontend' },
    { name: 'Node.js',category: 'backend' },
    { name: 'Express',category: 'backend' },
    { name: 'Python',category: 'backend' },
    { name: 'Django',category: 'backend' },
    { name: 'UI/UX Design',category: 'design' },
    { name: 'Figma',category: 'design' },
    { name: 'PostgreSQL',category: 'database' },
    { name: 'MongoDB',category: 'database' },
    { name: 'Docker',category: 'devops' },
    { name: 'Kubernetes',category: 'devops' },
    { name: 'AWS',category: 'devops' },
    { name: 'React Native',category: 'mobile' },
    { name: 'Flutter',category: 'mobile' },
    { name: 'OAuth',category: 'security' },
    { name: 'JWT',category: 'security' },
    { name: 'Figma',category: 'design' },
    { name: 'PostgreSQL',category: 'database' },
    { name: 'MongoDB',category: 'database' },
    { name: 'Docker',category: 'devops' },
    { name: 'Kubernetes',category: 'devops' },
    { name: 'AWS',category: 'devops' },
    { name: 'React Native',category: 'mobile' },
    { name: 'Flutter',category: 'mobile' },
    { name: 'OAuth',category: 'security' },
    { name: 'JWT',category: 'security' },
];

const categoryIcons = {
    frontend: Globe,
    backend: Server,
    design: Palette,
    database: Database,
    devops: Cloud,
    mobile: Smartphone,
    security: Lock,
};

const MySkill: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-8 container mx-auto"
        >
            <h2 className="text-3xl font-bold text-center mb-12 text-primary">My Skills</h2>
            <div className="flex flex-wrap justify-center">
                {skills.map((skill,index) => (
                    <motion.div
                        key={skill.name}
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
                            <div className="hexagon-content flex flex-col items-center justify-center">
                                <motion.div
                                    className="icon-container mb-2"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {React.createElement(categoryIcons[skill.category],{ className: "w-8 h-8 text-primary" })}
                                </motion.div>
                                <h3 className="text-sm font-semibold text-center">{skill.name}</h3>
                                <span className="text-xs text-muted-foreground">{skill.category}</span>
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default MySkill;

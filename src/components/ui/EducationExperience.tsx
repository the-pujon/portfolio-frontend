import React from 'react';
import { motion,useAnimation,useInView } from 'framer-motion';
import { GraduationCap,Calendar,MapPin,Award,Briefcase,Building2,Star } from 'lucide-react';

const EducationExperience = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref,{ once: true });
    const controls = useAnimation();

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

    const timelineData = [
        {
            experience: {
                title: "Senior Full Stack Developer",
                organization: "Tech Company Name",
                location: "City, Country",
                duration: "2021 - Present",
                points: [
                    "Led development of enterprise-scale web applications",
                    "Mentored junior developers and conducted code reviews",
                    "Implemented CI/CD pipelines reducing deployment time by 40%",
                ],
            },
            education: {
                title: "Bachelor of Science in Computer Science",
                organization: "University Name",
                location: "City, Country",
                duration: "2019 - 2023",
                points: [
                    "Graduated with First Class Honours",
                    "Specialized in Software Engineering",
                    "Led multiple academic projects",
                ],
            }
        },
        {
            experience: {
                title: "Full Stack Developer",
                organization: "Startup Name",
                location: "City, Country",
                duration: "2019 - 2021",
                points: [
                    "Developed and maintained multiple client projects",
                    "Implemented responsive designs and RESTful APIs",
                    "Reduced loading times by 60% through optimization",
                ],
            },
            education: {
                title: "Higher Secondary Certificate",
                organization: "College Name",
                location: "City, Country",
                duration: "2017 - 2019",
                points: [
                    "Science Group",
                    "Achieved GPA 5.00",
                    "College Programming Club President",
                ],
            }
        },
    ];

    return (
        <section id="education-experience" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-primary/5 to-secondary/10 relative overflow-hidden">
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
                                Professional
                            </span>{" "}
                            <span className="relative inline-block">
                                <span className="text-foreground">Journey</span>
                                <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-primary/50 via-secondary to-primary animate-shimmer" />
                            </span>
                        </h2>
                        <div className="absolute -top-8 -right-8 text-primary/20 animate-pulse">
                            <Briefcase className="w-16 h-16" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-12">
                    <div className="text-2xl font-bold flex items-center justify-center">
                        <Briefcase className="w-6 h-6 mr-2 text-primary" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            Work Experience
                        </span>
                    </div>
                    <div className="text-2xl font-bold flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 mr-2 text-primary" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            Education
                        </span>
                    </div>
                </div>

                <div className="relative">
                    {/* Central timeline line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-secondary opacity-50 blur-sm" />
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary to-secondary" />

                    {timelineData.map((item,index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="grid grid-cols-2 gap-8 mb-12 relative"
                        >
                            {/* Experience Card */}
                            <motion.div
                                className="bg-card p-6 rounded-lg shadow-lg relative overflow-hidden"
                                whileHover={{ scale: 1.02,boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.3)" }}
                                transition={{ type: 'spring',stiffness: 300 }}
                            >
                                <h3 className="text-xl font-bold text-primary mb-2">{item.experience.title}</h3>
                                <div className="flex items-center text-muted-foreground mb-2">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    <span>{item.experience.duration}</span>
                                </div>
                                <div className="flex items-center text-muted-foreground mb-4">
                                    <Building2 className="w-4 h-4 mr-2" />
                                    <span>{item.experience.organization}, {item.experience.location}</span>
                                </div>
                                <ul className="space-y-2">
                                    {item.experience.points.map((point,i) => (
                                        <li key={i} className="flex items-center text-muted-foreground">
                                            <Star className="w-4 h-4 mr-2 text-primary" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Timeline dot */}
                            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <div className="w-4 h-4 bg-primary rounded-full border-4 border-background" />
                            </div>

                            {/* Education Card */}
                            <motion.div
                                className="bg-card p-6 rounded-lg shadow-lg relative overflow-hidden"
                                whileHover={{ scale: 1.02,boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.3)" }}
                                transition={{ type: 'spring',stiffness: 300 }}
                            >
                                <h3 className="text-xl font-bold text-primary mb-2">{item.education.title}</h3>
                                <div className="flex items-center text-muted-foreground mb-2">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    <span>{item.education.duration}</span>
                                </div>
                                <div className="flex items-center text-muted-foreground mb-4">
                                    <Building2 className="w-4 h-4 mr-2" />
                                    <span>{item.education.organization}, {item.education.location}</span>
                                </div>
                                <ul className="space-y-2">
                                    {item.education.points.map((point,i) => (
                                        <li key={i} className="flex items-center text-muted-foreground">
                                            <Star className="w-4 h-4 mr-2 text-primary" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Background decorations */}
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

export default EducationExperience;

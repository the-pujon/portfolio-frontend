'use client'
import React,{ useRef } from 'react';
import Image from 'next/image';
import { motion,useAnimation,useInView } from 'framer-motion';
import { Brain,Code,Database,Server,Sparkles,Award } from 'lucide-react';
import BannerImage from "@/assets/bannerImage.png";

const About: React.FC<{ about: string,aboutImage: string }> = ({ about,aboutImage }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref as React.RefObject<Element>);
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

    return (
        <section id="about" className="py-12 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-primary/5 to-secondary/10 relative overflow-hidden">
            <motion.div
                ref={ref}
                animate={controls}
                initial="hidden"
                variants={containerVariants}
                className="max-w-7xl mx-auto"
            >
                <div className="flex flex-col items-center mb-12 sm:mb-20">
                    <div className="relative">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold relative z-10 tracking-tight text-center">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary/50">
                                The
                            </span>{" "}
                            <span className="relative inline-block">
                                <span className="text-foreground">Developer&apos;s</span>
                            </span>{" "}
                            <span className="relative inline-block">
                                <span className="text-foreground">Story</span>
                                <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-primary/50 via-secondary to-primary animate-shimmer" />
                            </span>
                        </h2>
                        <div className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 text-primary/20 animate-pulse">
                            <Brain className="w-12 h-12 sm:w-16 sm:h-16" />
                        </div>
                    </div>
                    <div className="text-lg sm:text-xl md:text-xl mt-6 sm:mt-8 max-w-4xl font-light text-center leading-relaxed px-4">
                        <p className="text-muted-forgournd">From learning the fundamentals to mastering <span className='text-primary'>full-stack development</span>, here&apos;s my journey in tech.</p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
                    <motion.div
                        variants={itemVariants}
                        className="w-full lg:w-2/5"
                    >
                        <div className="relative w-full max-w-[300px] sm:max-w-[400px] h-auto aspect-square mx-auto">
                            <Image
                                src={aboutImage || BannerImage}
                                alt="Pujon Das Auvi"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-3xl shadow-2xl transform transition-transform duration-300 z-[1]"
                            />
                            {/*<div className="absolute -top-4 -left-4 w-full h-full border-4 border-primary rounded-3xl z-0" />*/}
                            <motion.div
                                className="absolute -top-4 -left-4 w-full h-full border-4 border-primary rounded-3xl z-0"
                                animate={{ opacity: [0.5,1,0.5] }}
                                transition={{ duration: 2,repeat: Infinity }}
                            />
                            <motion.div
                                className="absolute -bottom-4 -right-4 text-4xl"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20,repeat: Infinity,ease: "linear" }}
                            >
                                <Sparkles className="text-primary" />
                            </motion.div>
                            {[
                                { icon: Award,position: "top-4 right-4",bg: "bg-primary/80" },
                                //{ icon: Book,position: "bottom-4 left-4",bg: "bg-secondary/80" },
                                //{ icon: Globe,position: "top-4 left-4",bg: "bg-accent/80" },
                                //{ icon: Zap,position: "bottom-4 right-4",bg: "bg-warning/80" },
                            ].map((item,index) => (
                                <motion.div
                                    key={index}
                                    className={`absolute ${item.position} ${item.bg} text-background p-2 rounded-full z-[2]`}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <item.icon className="h-6 w-6" />
                                </motion.div>
                            ))}
                        </div>
                        <motion.div
                            variants={itemVariants}
                            className="mt-6 text-center"
                        >
                            <h3 className="text-2xl sm:text-3xl font-bold text-primary">Pujon Das Auvi</h3>
                            <p className="text-lg sm:text-xl text-muted-foreground">Full Stack Developer & Tech Enthusiast</p>
                        </motion.div>
                    </motion.div>

                    <div className="w-full lg:w-3/5">
                        <motion.div variants={itemVariants} className="mb-8 sm:mb-10">
                            <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 tracking-tight">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary/50">
                                    Architect of
                                </span>{" "}
                                <span className="relative inline-block">
                                    <span className="text-foreground">Innovation</span>
                                    <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-primary/50 via-secondary to-primary animate-shimmer" />
                                </span>
                            </h3>
                            <p className="text-base sm:text-lg md:text-lg mb-6 sm:mb-8 font-light leading-relaxed">
                                <span className="text-primary">Transforming visions into reality</span>{" "}
                                <span className="text-muted-foreground">
                                    — where creativity meets precision in every line of
                                </span>{" "}
                                <span className="text-primary animate-pulse">
                                    code
                                </span>
                            </p>
                            <div className="text-muted-foreground text-sm sm:text-base space-y-4 richText" dangerouslySetInnerHTML={{ __html: about }}>

                            </div>
                        </motion.div>

                        <motion.div
                            variants={containerVariants}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                        >
                            {[

                                { icon: Code,title: "Frontend Mastery",description: "Crafting captivating user interfaces with React, Vue, and Angular." },
                                { icon: Server,title: "Backend Expertise",description: "Building robust APIs and services using Node.js, Python, and Go." },
                                { icon: Database,title: "Data Wizardry",description: "Optimizing databases with MongoDB, PostgreSQL, and Redis." },
                                //{ icon: Rocket,title: "Innovative Solutions",description: "Leveraging AI and machine learning for cutting-edge web experiences." },
                            ].map((item,index) => (
                                <motion.div key={index} variants={itemVariants} className="bg-card p-4 rounded-lg shadow-md">
                                    <h4 className="flex items-center text-base font-semibold mb-2 text-primary">
                                        <item.icon className="mr-2 h-5 w-5" />
                                        {item.title}
                                    </h4>
                                    <p className="text-xs text-muted-foreground">{item.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Background decorations */}
            <motion.div
                className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"
                animate={{
                    scale: [1,1.1,1],
                    opacity: [0.3,0.5,0.3],
                }}
                transition={{ duration: 8,repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl"
                animate={{
                    scale: [1,1.2,1],
                    opacity: [0.3,0.5,0.3],
                }}
                transition={{ duration: 10,repeat: Infinity }}
            />
        </section>
    );
};

export default About;

import React from 'react';
import Image from 'next/image';
import { motion,useAnimation,useInView } from 'framer-motion';
import { Brain,Code,Database,Server,Sparkles,Award } from 'lucide-react';
import BannerImage from "@/assets/bannerImage.png";

const About: React.FC = () => {
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

    return (
        <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-primary/5 to-secondary/10 relative overflow-hidden">
            <motion.div
                ref={ref}
                animate={controls}
                initial="hidden"
                variants={containerVariants}
                className="max-w-7xl mx-auto"
            >
                <motion.h2
                    variants={itemVariants}
                    className="text-5xl font-extrabold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
                >
                    About Me
                </motion.h2>

                <div className="flex flex-col lg:flex-row items-center lg:items-center gap-16">
                    <motion.div
                        variants={itemVariants}
                        className="w-full lg:w-2/5"
                    >
                        <div className="relative w-96 h-96 mx-auto lg:w-full lg:h-auto aspect-square">
                            <Image
                                src={BannerImage}
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
                            <h3 className="text-3xl font-bold text-primary">Pujon Das Auvi</h3>
                            <p className="text-xl text-muted-foreground">Full Stack Developer & Tech Enthusiast</p>
                        </motion.div>
                    </motion.div>

                    <div className="w-full lg:w-3/5">
                        <motion.div variants={itemVariants} className="mb-10">
                            <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary flex items-center">
                                <Brain className="mr-2 h-8 w-8 text-primary" /> Who I Am ?
                            </h3>
                            <div className="text-muted-foreground text-sm md:text-base">
                                <p>
                                    Hi, I&apos;m Pujon Das Auvi, a Full-stack Developer based in Dhaka, Bangladesh, with a passion for building scalable, user-friendly web applications. I specialize in both front-end and back-end technologies, allowing me to create seamless, fully integrated web solutions from scratch.

                                    <br />
                                    <br />

                                    On the front end, I work with modern tools like React, Next.js, Redux, Zustand, and Tailwind CSS to design responsive, visually appealing interfaces. I prioritize clean, maintainable code and performance optimization to deliver fast and efficient web experiences.

                                    <br />
                                    <br />

                                    On the back end, my expertise includes Node.js, Express, MongoDB, Mongoose, Prisma, SQL, and PostgreSQL. I focus on building robust RESTful APIs and GraphQL systems, ensuring scalability, security, and efficient database management. Recently, I&apos;ve expanded my skills to include Docker and testing frameworks like Jest and Mocha, further enhancing my DevOps capabilities.

                                    <br />
                                    <br />

                                    Over the years, I have built numerous web applications, from single-page applications to complex e-commerce platforms, portfolio blogs, and beyond. Each project reflects my commitment to delivering high-quality code, optimal performance, and exceptional user experiences.

                                    <br />
                                    <br />

                                    I&apos;m always eager to learn new technologies and tools, and I&apos;m driven by a commitment to creativity and quality in everything I build. Feel free to explore my projects or reach out for collaborations!
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={containerVariants}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6"
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

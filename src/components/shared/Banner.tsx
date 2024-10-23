import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Rocket,Linkedin,GithubIcon,Globe,Code,Database,Server,Wifi,Cloud,Terminal,FacebookIcon,Cpu,Layers,Zap,Handshake } from 'lucide-react';
import { FloatingIcon } from './FloatingIcon';
import { SocialIcons } from './SocialIcons';
import BannerImage from "@/assets/bannerImage.png"

const Banner: React.FC = () => {
    return (
        <section id="home" className="relative min-h-screen overflow-hidden flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/10" />

            {/* Floating coding icons */}
            {[Code,Database,Server,Wifi,Cloud,Terminal,Cpu,Globe,Layers,Zap].map((icon,index) => (
                <FloatingIcon key={index} icon={icon} delay={index * 0.5} />
            ))}

            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center">
                <motion.div
                    initial={{ opacity: 0,x: -50 }}
                    animate={{ opacity: 1,x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full lg:w-1/2 mb-8 lg:mb-0 relative"
                >
                    <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto p-4 sm:p-6 md:p-8 lg:p-10 wrap">
                        <motion.div
                            className="overflow-hidden rounded-full circle shadow-2xl"
                            whileHover={{ scale: 1.05,boxShadow: "0 0 25px rgba(0,0,0,0.3)" }}
                            transition={{ type: "spring",stiffness: 300 }}
                        >
                            <Image
                                src={BannerImage}
                                alt="Alex Johnson"
                                width={800}
                                height={800}
                                className='circle w-full h-full object-cover'
                            />
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0,x: 50 }}
                    animate={{ opacity: 1,x: 0 }}
                    transition={{ duration: 0.8,delay: 0.2 }}
                    className="w-full md:w-1/2 lg:pl-12 text-center md:text-left"
                >
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Pujon Das Auvi</h1>
                    <h2 className="text-lg sm:text-xl lg:text-2xl text-primary mb-6">Full Stack Developer</h2>
                    <p className="text-muted-foreground mb-8 text-sm sm:text-base">
                        Transforming ideas into robust, user-friendly applications. Specializing in React, Node.js, and modern web technologies. Passionate about creating efficient and elegant solutions.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground relative overflow-hidden group border-none text-white w-full sm:w-auto md:text-xs lg:text-sm">
                            <Rocket className="mr-2 h-4 w-4" /> Enter the Codeverse
                            <span className="absolute inset-0 bg-white/30 z-20 transition-transform duration-500 translate-x-full group-hover:translate-x-0" />
                        </Button>
                        <Button variant="outline" className="border-primary text-primary hover:bg-background hover:text-primary relative overflow-hidden group border-none w-full sm:w-auto md:text-xs lg:text-sm">
                            <Handshake className="mr-2 h-4 w-4" /> Initiate Neural Handshake
                            <span className="absolute inset-0 bg-white/30 z-20 transition-transform duration-500 translate-x-full group-hover:translate-x-0" />
                        </Button>
                    </div>
                    <div className="flex justify-center lg:justify-start space-x-6">
                        <SocialIcons icon={Linkedin} link="https://www.linkedin.com/in/alex-johnson-dev/" />
                        <SocialIcons icon={GithubIcon} link="https://github.com/alex-johnson-dev" />
                        <SocialIcons icon={FacebookIcon} link="https://www.facebook.com/alex.johnson.dev" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Banner;

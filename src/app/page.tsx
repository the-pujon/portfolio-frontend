'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion,useAnimation } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Rocket,Linkedin,GithubIcon,Globe,Code,Database,Server,Wifi,Cloud,Terminal,FacebookIcon,Cpu,Layers,Zap,LucideIcon } from 'lucide-react';




const FloatingIcon = ({ icon: Icon,delay }: { icon: LucideIcon,delay: number }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      y: [0,-10,0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: delay,
      },
    });
  },[controls,delay]);

  return (
    <motion.div
      className="absolute text-primary/20"
      //initial={{ opacity: 0 }}
      //animate={{ opacity: 1 }}
      //transition={{ duration: 1 }}
      style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        right: `${Math.random() * 100}%`,
        bottom: `${Math.random() * 100}%`,
      }}
      initial={{ x: Math.random() * 100 + '%',y: Math.random() * 100 + '%' }}
      animate={{
        x: [Math.random() * 100 + '%',Math.random() * 100 + '%'],
        y: [Math.random() * 100 + '%',Math.random() * 100 + '%'],
      }}
      transition={{ duration: 20 + Math.random() * 10,repeat: Infinity,repeatType: 'reverse' }}

    >
      <motion.div animate={controls}>
        <Icon size={32} />
      </motion.div>
    </motion.div>
  );
};

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero Section */}
      <section id="home" className="relative h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/10" />

        {/* Floating coding icons */}
        {[Code,Database,Server,Wifi,Cloud,Terminal,Cpu,Globe,Layers,Zap].map((icon,index) => (
          <FloatingIcon key={index} icon={icon} delay={index * 0.5} />
        ))}

        <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center">
          <motion.div
            initial={{ opacity: 0,x: -50 }}
            animate={{ opacity: 1,x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 mb-8 md:mb-0 relative"
          >
            <div className="w-64 h-64 md:w-96 md:h-96 mx-auto p-10 wrap">
              <motion.div
                className="overflow-hidden rounded-full circle shadow-2xl"
                whileHover={{ scale: 1.05,boxShadow: "0 0 25px rgba(0,0,0,0.3)" }}
                transition={{ type: "spring",stiffness: 300 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
                  alt="Alex Johnson"
                  width={800}
                  height={10}
                  className='circle'
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0,x: 50 }}
            animate={{ opacity: 1,x: 0 }}
            transition={{ duration: 0.8,delay: 0.2 }}
            className="md:w-1/2 md:pl-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Alex Johnson</h1>
            <h2 className="text-xl md:text-2xl text-primary mb-6">Full Stack Developer</h2>
            <p className="text-muted-foreground mb-8">
              Transforming ideas into robust, user-friendly applications. Specializing in React, Node.js, and modern web technologies. Passionate about creating efficient and elegant solutions.
            </p>
            <div className="flex space-x-4 mb-8">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Rocket className="mr-2 h-4 w-4" /> Projects
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Contact Me
              </Button>
            </div>
            <div className="flex space-x-6">
              <SocialIcons icon={Linkedin} link="https://www.linkedin.com/in/alex-johnson-dev/" />
              <SocialIcons icon={GithubIcon} link="https://github.com/alex-johnson-dev" />
              <SocialIcons icon={FacebookIcon} link="https://www.facebook.com/alex.johnson.dev" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function SocialIcons({ icon: Icon,link }: { icon: LucideIcon,link: string }) {
  return (
    <a href={link} className="flex flex-col items-center">
      <Icon size={34} className="text-primary mb-2" />
    </a>
  );
}

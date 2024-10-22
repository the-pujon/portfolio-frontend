'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Code,Rocket,Brain,Globe } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero Section */}
      <section id="home" className="relative h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center">
          <motion.div
            initial={{ opacity: 0,x: -50 }}
            animate={{ opacity: 1,x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 mb-8 md:mb-0"
          >
            <Image
              src="https://example.com/your-image.jpg"
              alt="Alex Johnson"
              width={400}
              height={400}
              className="rounded-lg shadow-2xl"
            />
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
              Crafting elegant solutions to complex problems. Passionate about web technologies and AI integration.
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
              <Skill icon={Code} label="Full Stack" />
              <Skill icon={Brain} label="AI/ML" />
              <Skill icon={Globe} label="Cloud" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Rest of the sections */}
      // ... (keep existing sections)
    </div>
  );
}

function Skill({ icon: Icon,label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <Icon size={24} className="text-primary mb-2" />
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}

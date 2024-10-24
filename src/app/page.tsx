'use client';

import React from 'react';
import Banner from '@/components/shared/Banner';
import About from '@/components/shared/About';
import { FloatingIcon } from '@/components/shared/FloatingIcon';

import { Globe,Code,Database,Server,Wifi,Cloud,Terminal,Cpu,Layers,Zap } from 'lucide-react';
import Skills from '@/components/shared/Skills';
//import MySkill from '@/components/shared/MySkill';
import TopProjects from './../components/shared/TopProjects';
import EducationExperience from '@/components/shared/EducationExperience';




const Home: React.FC = () => {
  return (
    <div className="bg-background text-foreground relative overflow-hidden">
      <div className='fixed inset-0'>
        {[Code,Database,Server,Wifi,Cloud,Terminal,Cpu,Globe,Layers,Zap].map((icon,index) => (
          <FloatingIcon key={index} icon={icon} delay={index * 0.5} />
        ))}
      </div>
      <Banner />
      <About />
      <Skills />
      <TopProjects />
      {/*<MySkill />*/}
      <EducationExperience />
    </div>
  );
}


export default Home;
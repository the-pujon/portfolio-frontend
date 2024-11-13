'use client';

import React from 'react';
import Banner from '@/components/shared/Banner';
import About from '@/components/shared/About';
//import { FloatingIcon } from '@/components/shared/FloatingIcon';

//import { Globe,Code,Database,Server,Wifi,Cloud,Terminal,Cpu,Layers,Zap } from 'lucide-react';
//import Skills from '@/components/shared/Skills';
//import MySkill from '@/components/shared/MySkill';
import TopProjects from './../components/shared/TopProjects';
import EducationExperience from '@/components/shared/EducationExperience';
import LatestBlogs from '@/components/shared/LatestBlogs';
import Certification from '@/components/shared/Certification';
import Contact from '@/components/shared/Contact';
import Skills from '@/components/shared/Skills';
//import { FloatingIcon } from '../components/shared/FloatingIcon';



const Home: React.FC = () => {
  return (
    <div className="bg-background text-foreground relative overflow-hidden">
      {/*<div className='fixed inset-0'>
        {[Code,Database,Server,Wifi,Cloud,Terminal,Cpu,Globe,Layers,Zap].map((icon,index) => (
          <FloatingIcon key={index} icon={icon} delay={index * 0.5} />
        ))}
      </div>*/}
      <Banner />
      <About />
      <Skills />
      {/*<MySkill />*/}
      <TopProjects />

      <EducationExperience />
      <LatestBlogs />
      <Certification />
      <Contact />
    </div>
  );
}

//<Button
//onClick={() => window.open(certificate.credentialLink)}
//className="group relative overflow-hidden bg-primary hover:bg-primary/90 transition-colors duration-300"
//>
//<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
//<span className="relative flex items-center justify-center gap-2">
//    Verify Credential
//    <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
//</span>
//</Button>


export default Home;
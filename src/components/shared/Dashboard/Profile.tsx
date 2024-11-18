/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Linkedin,Twitter,Github,Award,MapPin,Mail,Briefcase,Download,Calendar,ExternalLink,Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Import hooks from Redux slices
import { useGetProfileByIdQuery } from '@/redux/features/profile/profileApi';
import { useGetAllSkillsQuery } from '@/redux/features/skill/skillApi';
import { useGetAllProjectsQuery } from '@/redux/features/project/projectApi';
import { useGetAllExperiencesQuery } from '@/redux/features/experience/experienceApi';
import { useGetAllEducationsQuery } from '@/redux/features/education/educationApi';
import { useAppSelector } from '@/redux/hook';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';

interface CertificateType {
    id: number;
    title: string;
    issuedBy: string;
    date: string;
    image: string;
    credentialLink: string;
    category: string;
    description: string;
    skills: string[];
}

interface ProfileType {
    heroImage: string;
    name: string;
    designation: string;
    location: {
        city: string;
        country: string;
    };
    aboutImage: string;
    email: string;
    department: string;
    socialMedia: {
        linkedin?: string;
        twitter?: string;
        github?: string;
    };
    resume: string;
    about: string;
    certifications: CertificateType[];
    awards: string[];
}

interface SkillType {
    image: string;
    name: string;
    description: string;
}

interface ProjectType {
    thumbnailImage: string;
    title: string;
    shortDescription: string;
    technologies: string[];
    liveLink: string;
}

interface ExperienceType {
    position: string;
    companyName: string;
    startDate: string;
    endDate: string;
}

interface EducationType {
    degree: string;
    fieldOfStudy: string;
    institution: string;
    startDate: string;
    endDate: string;
}

const Profile = () => {
    const currentUser = useAppSelector(selectCurrentUser);
    const profileId = currentUser?._id;



    // Fetch data using hooks
    const { data: profileData,isLoading: profileLoading,error: profileError } = useGetProfileByIdQuery(profileId);
    const { data: skillsData,isLoading: skillsLoading,error: skillsError } = useGetAllSkillsQuery({});
    const { data: projectsData,isLoading: projectsLoading,error: projectsError } = useGetAllProjectsQuery({});
    const { data: experiencesData,isLoading: experiencesLoading,error: experiencesError } = useGetAllExperiencesQuery({});
    const { data: educationsData,isLoading: educationsLoading,error: educationsError } = useGetAllEducationsQuery({});

    // Handle loading and error states
    if (profileLoading || skillsLoading || projectsLoading || experiencesLoading || educationsLoading) {
        return <div>Loading...</div>;
    }

    if (profileError || skillsError || projectsError || experiencesError || educationsError) {
        return <div>Error loading data</div>;
    }

    // Use fetched data
    const profile: ProfileType = profileData?.data || {};
    const skills: SkillType[] = skillsData?.data || [];
    const projects: ProjectType[] = projectsData?.data || [];
    const experiences: ExperienceType[] = experiencesData?.data || [];
    const education: EducationType[] = educationsData?.data || [];

    return (
        <motion.div
            initial={{ opacity: 0,y: 20 }}
            animate={{ opacity: 1,y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto p-6 space-y-8"
        >
            {/* Hero Section */}
            <section className="relative h-96 rounded-xl overflow-hidden">
                <Image
                    objectFit="cover"
                    width={500}
                    height={500}
                    layout="responsive"
                    src={profile.heroImage} alt="Hero" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/20" />
                <div className="absolute bottom-0 left-0 p-8">
                    <h1 className="text-5xl font-bold text-primary mb-2">{profile.name}</h1>
                    <p className="text-2xl text-primary/80 mb-2">{profile.designation}</p>
                    <div className="flex items-center text-lg text-muted-foreground">
                        <MapPin className="w-5 h-5 mr-2" />
                        {profile.location?.city}, {profile.location?.country}
                    </div>
                </div>
            </section>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Sidebar */}
                <aside className="lg:w-1/3 space-y-8 sticky -top-24 self-start">
                    <Image
                        objectFit="cover"
                        width={500}
                        height={500}
                        layout="responsive"
                        src={profile.aboutImage}
                        alt={profile.name}
                        className="w-full rounded-xl shadow-lg"
                    />
                    <div className="space-y-4 bg-secondary/10 p-6 rounded-xl">
                        <div className="flex items-center text-muted-foreground">
                            <Mail className="w-5 h-5 mr-3" />
                            <span>{profile.email}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                            <Briefcase className="w-5 h-5 mr-3" />
                            <span>{profile.department}</span>
                        </div>
                    </div>
                    <div className="bg-secondary/10 p-6 rounded-xl">
                        <h3 className="text-xl font-semibold mb-4">Connect</h3>
                        <div className="flex gap-6">
                            {profile.socialMedia?.linkedin && (
                                <Link
                                    href={profile.socialMedia.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary transition-colors hover:scale-105 duration-300"
                                >
                                    <Linkedin className="w-7 h-7" />
                                </Link>
                            )}
                            {profile.socialMedia?.twitter && (
                                <a href={profile.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                    <Twitter className="w-6 h-6" />
                                </a>
                            )}
                            {profile.socialMedia?.github && (
                                <a href={profile.socialMedia.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                    <Github className="w-6 h-6" />
                                </a>
                            )}
                        </div>
                    </div>
                    <Button variant="default" size="lg" className="w-full" asChild>
                        <a href={profile.resume} target="_blank" rel="noopener noreferrer">
                            <Download className="w-5 h-5 mr-2" />
                            Download Resume
                        </a>
                    </Button>
                </aside>

                {/* Main Content */}
                <main className="lg:w-2/3 space-y-12">
                    {/* About Section */}
                    <section>
                        <h2 className="text-3xl font-semibold mb-4 flex items-center">
                            <Sparkles className="w-8 h-8 mr-2 text-primary" />
                            About
                        </h2>
                        <div className="text-lg text-muted-foreground leading-relaxed richText" dangerouslySetInnerHTML={{ __html: profile.about }} />
                    </section>

                    <Separator />

                    {/* Skills Section */}
                    <section>
                        <h2 className="text-3xl font-semibold mb-6 flex items-center">
                            <Sparkles className="w-8 h-8 mr-2 text-primary" />
                            Skills
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {skills.map((skill,index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-center p-4 bg-secondary/20 rounded-xl shadow-sm"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <img src={skill.image} alt={skill.name} className="w-10 h-10 mr-3" />
                                    <div>
                                        <h4 className="font-semibold">{skill.name}</h4>
                                        <p className="text-sm text-muted-foreground">{skill.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    <Separator />

                    {/* Projects Section */}
                    <section>
                        <h2 className="text-3xl font-semibold mb-6 flex items-center">
                            <Sparkles className="w-8 h-8 mr-2 text-primary" />
                            Projects
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {projects.map((project,index) => (
                                <motion.div
                                    key={index}
                                    className="bg-secondary/20 p-6 rounded-xl shadow-sm"
                                    whileHover={{ y: -5 }}
                                >
                                    <img src={project.thumbnailImage} alt={project.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                                    <p className="text-muted-foreground mb-4">{project.shortDescription}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.map((tech,techIndex) => (
                                            <Badge key={techIndex} variant="secondary">{tech}</Badge>
                                        ))}
                                    </div>
                                    <Button variant="outline" asChild className="w-full">
                                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="w-4 h-4 mr-2" />
                                            View Project
                                        </a>
                                    </Button>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    <Separator />

                    {/* Experience Section */}
                    <section>
                        <h2 className="text-3xl font-semibold mb-6 flex items-center">
                            <Sparkles className="w-8 h-8 mr-2 text-primary" />
                            Experience
                        </h2>
                        <div className="space-y-6">
                            {experiences.map((exp,index) => (
                                <motion.div
                                    key={index}
                                    className="bg-secondary/20 p-6 rounded-xl shadow-sm"
                                    whileHover={{ x: 5 }}
                                >
                                    <h3 className="text-xl font-semibold">{exp.position}</h3>
                                    <p className="text-lg text-muted-foreground">{exp.companyName}</p>
                                    <div className="flex items-center text-sm text-muted-foreground mt-2">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        {new Date(exp.startDate).toLocaleDateString()} - {new Date(exp.endDate).toLocaleDateString()}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    <Separator />

                    {/* Education Section */}
                    <section>
                        <h2 className="text-3xl font-semibold mb-6 flex items-center">
                            <Sparkles className="w-8 h-8 mr-2 text-primary" />
                            Education
                        </h2>
                        <div className="space-y-6">
                            {education.map((edu,index) => (
                                <motion.div
                                    key={index}
                                    className="bg-secondary/20 p-6 rounded-xl shadow-sm"
                                    whileHover={{ x: 5 }}
                                >
                                    <h3 className="text-xl font-semibold">{edu.degree} in {edu.fieldOfStudy}</h3>
                                    <p className="text-lg text-muted-foreground">{edu.institution}</p>
                                    <div className="flex items-center text-sm text-muted-foreground mt-2">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        {new Date(edu.startDate).toLocaleDateString()} - {new Date(edu.endDate).toLocaleDateString()}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    <Separator />

                    {/* Certifications Section */}
                    <section>
                        <h2 className="text-3xl font-semibold mb-6 flex items-center">
                            <Sparkles className="w-8 h-8 mr-2 text-primary" />
                            Certifications
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {profile.certifications.map((cert: CertificateType) => (
                                <motion.div
                                    key={cert.id}
                                    className="bg-secondary/20 p-6 rounded-xl shadow-sm"
                                    whileHover={{ scale: 1.03 }}
                                >
                                    <img src={cert.image} alt={cert.title} className="w-full h-40 object-cover rounded-lg mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">{cert.title}</h3>
                                    <p className="text-muted-foreground mb-2">Issued by: {cert.issuedBy}</p>
                                    <p className="text-muted-foreground mb-2">Date: {cert.date}</p>
                                    <p className="text-muted-foreground mb-4">{cert.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {/*{cert?.skills?.map((skill,index) => (
                                            <Badge key={index} variant="secondary">{skill}</Badge>
                                        ))}*/}
                                    </div>
                                    <Button variant="outline" asChild className="w-full">
                                        <a href={cert.credentialLink} target="_blank" rel="noopener noreferrer">
                                            <Award className="w-4 h-4 mr-2" />
                                            Verify Credential
                                        </a>
                                    </Button>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    <Separator />

                    {/* Awards Section */}
                    <section>
                        <h2 className="text-3xl font-semibold mb-6 flex items-center">
                            <Sparkles className="w-8 h-8 mr-2 text-primary" />
                            Awards
                        </h2>
                        <ul className="space-y-4">
                            {profile.awards.map((award,index) => (
                                <motion.li
                                    key={index}
                                    className="flex items-center text-lg text-muted-foreground bg-secondary/10 p-4 rounded-xl"
                                    whileHover={{ x: 5 }}
                                >
                                    <Award size={24} className="text-primary mr-3" />
                                    {award}
                                </motion.li>
                            ))}
                        </ul>
                    </section>
                </main>
            </div>
        </motion.div>
    );
};

export default Profile;

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Github,Linkedin,Mail,Facebook,Heart,Code,Sparkles,ArrowUpRight } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            icon: Github,
            href: 'https://github.com/yourusername',
            label: 'GitHub',
            color: 'hover:text-[#2ea44f]'
        },
        {
            icon: Linkedin,
            href: 'https://linkedin.com/in/yourusername',
            label: 'LinkedIn',
            color: 'hover:text-[#0077b5]'
        },
        {
            icon: Facebook,
            href: 'https://facebook.com/yourusername',
            label: 'Facebook',
            color: 'hover:text-[#1877f2]'
        },
        {
            icon: Mail,
            href: 'mailto:your@email.com',
            label: 'Email',
            color: 'hover:text-[#ea4335]'
        },
    ];

    const navLinks = [
        { name: 'About',href: '/about' },
        { name: 'Projects',href: '/projects' },
        { name: 'Blog',href: '/blog' },
        { name: 'Contact',href: '/contact' },
    ];

    return (
        <footer className="relative overflow-hidden border-t border-primary/10">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Top Section with Logo and Social Links */}
                <div className="flex flex-col items-center justify-center space-y-6 mb-8">
                    {/* Animated Logo/Name */}
                    <motion.div
                        className="relative"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring",stiffness: 400,damping: 10 }}
                    >
                        <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%] animate-gradient">
                            <Code className="inline-block mr-2 h-8 w-8" />
                            Pujon Das Auvi
                        </h3>
                        <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-primary/50 via-secondary to-primary animate-shimmer" />
                    </motion.div>

                    {/* Social Links */}
                    <div className="flex space-x-6">
                        {socialLinks.map((social) => (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-muted-foreground ${social.color} transition-all duration-300`}
                                whileHover={{ y: -3,scale: 1.15 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <social.icon className="h-6 w-6" />
                            </motion.a>
                        ))}
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-wrap justify-center gap-6 mt-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="group text-muted-foreground hover:text-primary transition-colors relative"
                            >
                                <span className="flex items-center gap-1">
                                    {link.name}
                                    <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </span>
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <p className="text-muted-foreground text-sm flex items-center gap-2 group">
                        <span>Crafted with</span>
                        <span className="inline-flex relative">
                            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
                            <Sparkles className="h-4 w-4 text-yellow-500 absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </span>
                        <span>and</span>
                        <code className="text-primary font-mono">&lt;code/&gt;</code>
                    </p>
                    <p className="text-muted-foreground/80 text-sm">
                        © {currentYear} All rights reserved
                    </p>
                </div>
            </div>

            {/* Enhanced Background Effects */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
            </div>
        </footer>
    );
};

export default Footer;

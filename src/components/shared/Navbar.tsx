'use client'

import React,{ useState,useEffect } from 'react';
import Link from 'next/link';
//import Image from 'next/image';
import { motion,AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { FileText,Menu,X,Home,Briefcase,User,Mail } from 'lucide-react';
import { usePathname } from 'next/navigation';
import BannerImage from "@/assets/bannerImage.png"
import Image from 'next/image';

const Navbar: React.FC = () => {
    const [isOpen,setIsOpen] = useState(false);
    const [scrolled,setScrolled] = useState(false);
    const pathname = usePathname();

    //console.log(pathname)

    const navItems = [
        { name: 'Home',icon: Home,path: '/' },
        { name: 'Projects',icon: Briefcase,path: '/projects' },
        { name: 'Blogs',icon: User,path: '/blog' },
        { name: 'Contact',icon: Mail,path: '#contact' },
        { name: 'Dashboard',icon: Home,path: '/dashboard' }

    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll",handleScroll);
        return () => window.removeEventListener("scroll",handleScroll);
    },[]);

    return (
        <motion.header
            className={`fixed w-full py-4 px-6 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md shadow-md' : 'bg-transparent'
                }`}
        >
            <nav className="container mx-auto flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-3 group">
                    <div className="relative w-10 h-10">
                        <Image
                            src={BannerImage}
                            alt="Pujon Das Logo"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="rounded-full object-cover"
                        />
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-primary"
                            animate={{ scale: [1,1.1,1] }}
                            transition={{ duration: 2,repeat: Infinity }}
                        />
                    </div>
                    <span className="text-xl font-bold text-foreground">Pujon Das</span>
                </Link>

                <div className="hidden lg:flex space-x-1">
                    {navItems.map((item,index) => (
                        <Link
                            key={index}
                            href={item.path}
                            className={`group relative px-3 py-2 text-sm font-medium transition-colors ${pathname === item.path ? "text-primary" : "text-muted-foreground hover:text-primary"
                                }`}
                        >
                            <span className="flex items-center relative z-10">
                                <item.icon className="w-4 h-4 mr-2" />
                                {item.name}
                            </span>
                            <span
                                className={`absolute inset-0 z-0 scale-75 rounded-md bg-primary/10 opacity-0 transition-all duration-300 ${pathname === item.path ? "scale-[100%] opacity-100" : "group-hover:scale-100 group-hover:opacity-100"
                                    }`}
                            />
                            <span
                                className={`absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-primary transition-transform duration-300 ${pathname === item.path ? "scale-x-100" : "group-hover:scale-x-100"
                                    }`}
                            />
                        </Link>
                    ))}
                </div>

                <div className="flex space-x-1">
                    <Button asChild variant="outline" className="relative overflow-hidden group border-none text-white">
                        <Link href="https://drive.google.com/file/d/14HhcrGMJjLBY2iZzgrhxdC5msw3gvxQV/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex items-center">
                            <span className="relative z-10 flex items-center transition-transform duration-500 group-hover:translate-x-1 text-white">
                                <FileText className="mr-2 h-4 w-4" />
                                Resume
                            </span>
                            <span className="absolute inset-0 z-0 bg-primary " />
                            <span className="absolute inset-0 bg-white/30 z-20 transition-transform duration-500 translate-x-full group-hover:translate-x-0" />
                        </Link>
                    </Button>

                    <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={isOpen ? 'close' : 'open'}
                                initial={{ rotate: -90,opacity: 0 }}
                                animate={{ rotate: 0,opacity: 1 }}
                                exit={{ rotate: 90,opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </motion.div>
                        </AnimatePresence>
                    </Button>
                </div>
            </nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0,height: 0 }}
                        animate={{ opacity: 1,height: 'auto' }}
                        exit={{ opacity: 0,height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden overflow-hidden bg-background/95 backdrop-blur-md mt-4 rounded-md shadow-lg"
                    >
                        {navItems.map((item) => (
                            <Link key={item.name} href={item.path}>
                                <motion.span
                                    className={`flex items-center px-6 py-3 text-sm font-medium ${pathname === item.path
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                                        }`}
                                    whileHover={{ x: 5 }}
                                    transition={{ type: 'spring',stiffness: 300,damping: 30 }}
                                >
                                    <item.icon className="w-4 h-4 mr-2" />
                                    {item.name}
                                </motion.span>
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Navbar;

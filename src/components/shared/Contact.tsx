import React from 'react';
import { motion,useAnimation,useInView,AnimatePresence } from 'framer-motion';
import { Mail,Phone,MapPin,Send,MessageSquare,Sparkles,Star,ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const Contact = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref,{ once: true });
    const controls = useAnimation();
    const [hoveredCard,setHoveredCard] = React.useState<number | null>(null);

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
        <section className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-background/90">
            <motion.div
                ref={ref}
                animate={controls}
                initial="hidden"
                variants={containerVariants}
                className="max-w-7xl mx-auto relative"
            >
                {/* Enhanced Header section */}
                <div className="text-center mb-16">
                    <div className="relative inline-block">
                        <motion.span
                            className="text-xs font-medium text-primary/80 tracking-wider uppercase mb-4 block"
                            initial={{ opacity: 0,y: -20 }}
                            animate={{ opacity: 1,y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Let&apos;s Create Something Amazing Together
                        </motion.span>
                        <h2 className="text-6xl font-bold relative z-10 tracking-tight">
                            <motion.span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary/50"
                                initial={{ opacity: 0,x: -20 }}
                                animate={{ opacity: 1,x: 0 }}
                                transition={{ duration: 0.5,delay: 0.2 }}
                            >
                                Get in
                            </motion.span>{" "}
                            <span className="relative inline-block">
                                <motion.span
                                    className="text-foreground"
                                    initial={{ opacity: 0,x: 20 }}
                                    animate={{ opacity: 1,x: 0 }}
                                    transition={{ duration: 0.5,delay: 0.4 }}
                                >
                                    Touch
                                </motion.span>
                                <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-primary/50 via-secondary to-primary animate-shimmer" />
                            </span>
                        </h2>
                        <motion.div
                            className="absolute -top-8 right-12 text-primary/20"
                            animate={{
                                rotate: [0,10,-10,0],
                                scale: [1,1.1,0.9,1]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <MessageSquare className="w-16 h-16" />
                        </motion.div>
                    </div>
                    <motion.p
                        className="text-xl mt-8 max-w-3xl mx-auto font-light leading-relaxed"
                        initial={{ opacity: 0,y: 20 }}
                        animate={{ opacity: 1,y: 0 }}
                        transition={{ duration: 0.5,delay: 0.6 }}
                    >
                        <span className="text-primary">Have a project in mind?</span>{" "}
                        <span className="text-muted-foreground">
                            I&apos;m always open to discussing new projects, creative ideas or
                        </span>{" "}
                        <span className="text-primary animate-pulse">
                            opportunities to be part of your visions
                        </span>
                    </motion.p>
                </div>

                {/* Contact Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Information */}
                    <motion.div variants={itemVariants} className="space-y-8">
                        <h3 className="text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            Let&apos;s Start a Conversation
                        </h3>

                        {/* Contact Cards */}
                        <div className="space-y-4">
                            {[
                                {
                                    icon: Mail,
                                    title: "Drop a Line",
                                    content: "contact@example.com",
                                    link: "mailto:contact@example.com",
                                    gradient: "from-blue-500 to-cyan-500",
                                    description: "Available 24/7 for email inquiries"
                                },
                                {
                                    icon: Phone,
                                    title: "Call Me",
                                    content: "+880 1234-567890",
                                    link: "tel:+8801234567890",
                                    gradient: "from-purple-500 to-pink-500",
                                    description: "Available during business hours"
                                },
                                {
                                    icon: MapPin,
                                    title: "Location",
                                    content: "Dhaka, Bangladesh",
                                    link: "https://maps.google.com",
                                    gradient: "from-amber-500 to-orange-500",
                                    description: "Open for local & remote opportunities"
                                }
                            ].map((item,index) => (
                                <motion.a
                                    key={index}
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-6 rounded-lg border border-primary/10 bg-card hover:bg-primary/5 transition-all duration-500 group relative overflow-hidden"
                                    onHoverStart={() => setHoveredCard(index)}
                                    onHoverEnd={() => setHoveredCard(null)}
                                    whileHover={{
                                        scale: 1.02,
                                        boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.3)"
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {/* Gradient overlay on hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-500">
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                        <div className="flex-grow">
                                            <h4 className="text-sm font-medium text-muted-foreground">
                                                {item.title}
                                            </h4>
                                            <p className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                                                {item.content}
                                            </p>
                                            <AnimatePresence>
                                                {hoveredCard === index && (
                                                    <motion.p
                                                        initial={{ opacity: 0,height: 0 }}
                                                        animate={{ opacity: 1,height: "auto" }}
                                                        exit={{ opacity: 0,height: 0 }}
                                                        className="text-xs text-muted-foreground mt-2"
                                                    >
                                                        {item.description}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                        <motion.div
                                            animate={{ x: hoveredCard === index ? 0 : 10,opacity: hoveredCard === index ? 1 : 0 }}
                                            className="text-primary"
                                        >
                                            <ArrowUpRight className="w-5 h-5" />
                                        </motion.div>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Enhanced Contact Form */}
                    <motion.div variants={itemVariants} className="relative">
                        <div className="p-8 rounded-lg border border-primary/10 bg-card/80 backdrop-blur-sm relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                                    Send Message
                                </h3>
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm text-muted-foreground flex items-center gap-2">
                                                <Star className="w-4 h-4 text-primary" />
                                                Your Name
                                            </label>
                                            <Input
                                                id="name"
                                                placeholder="John Doe"
                                                className="bg-background/50 border-primary/10 focus:border-primary transition-colors duration-300"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm text-muted-foreground flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-primary" />
                                                Your Email
                                            </label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="john@example.com"
                                                className="bg-background/50 border-primary/10 focus:border-primary transition-colors duration-300"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-sm text-muted-foreground flex items-center gap-2">
                                            <MessageSquare className="w-4 h-4 text-primary" />
                                            Subject
                                        </label>
                                        <Input
                                            id="subject"
                                            placeholder="Project Inquiry"
                                            className="bg-background/50 border-primary/10 focus:border-primary transition-colors duration-300"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm text-muted-foreground flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 text-primary" />
                                            Message
                                        </label>
                                        <Textarea
                                            id="message"
                                            placeholder="Your message here..."
                                            className="min-h-[150px] bg-background/50 border-primary/10 focus:border-primary transition-colors duration-300"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full group hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%] hover:bg-right"
                                    >
                                        Send Message
                                        <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </form>
                            </div>

                            {/* Enhanced decorative elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl animate-pulse" />
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Enhanced background decorations */}
            <motion.div
                className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-primary/10 to-transparent rounded-full filter blur-3xl"
                animate={{
                    scale: [1,1.1,1],
                    opacity: [0.3,0.5,0.3],
                }}
                transition={{ duration: 8,repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-radial from-secondary/10 to-transparent rounded-full filter blur-3xl"
                animate={{
                    scale: [1,1.2,1],
                    opacity: [0.3,0.5,0.3],
                }}
                transition={{ duration: 10,repeat: Infinity }}
            />
        </section>
    );
};

export default Contact;

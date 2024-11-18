import React,{ useRef } from 'react';
import { motion,useAnimation,useInView } from 'framer-motion';
import { Award,Medal,Sparkles,Star } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Dialog,DialogContent,DialogTitle } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetAllCertificatesQuery } from '@/redux/features/certificate/certificateApi';
import { Certificate } from '@/types/certificate';

const Certification = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref as React.RefObject<Element>);
    const controls = useAnimation();
    const [selectedImage,setSelectedImage] = React.useState<string | null>(null);
    const {
        data: certificatesData
    } = useGetAllCertificatesQuery({});
    const certificates = certificatesData?.data || []

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

    return (
        <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary/10">
            <motion.div
                ref={ref}
                animate={controls}
                initial="hidden"
                variants={containerVariants}
                className="max-w-7xl mx-auto relative"
            >
                {/* Enhanced header section */}
                <div className="text-center mb-12 sm:mb-16">
                    <div className="relative inline-block">
                        <span className="text-xs sm:text-sm font-medium text-primary/80 tracking-wider uppercase mb-2 sm:mb-4 block">
                            Professional Achievements
                        </span>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold relative z-10 tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary/50">
                                Certified
                            </span>{" "}
                            <span className="relative inline-block">
                                <span className="text-foreground">Excellence</span>
                                <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-primary/50 via-secondary to-primary animate-shimmer" />
                            </span>
                        </h2>
                        <div className="absolute -top-6 -right-6 sm:-top-8 sm:right-0 text-primary/20 animate-pulse">
                            <Award className="w-12 h-12 sm:w-16 sm:h-16" />
                        </div>
                    </div>
                    <p className="text-base sm:text-lg md:text-xl mt-4 sm:mt-6 max-w-3xl mx-auto font-light leading-relaxed">
                        <span className="text-primary">Validated expertise</span>{" "}
                        <span className="text-muted-foreground">
                            through industry-recognized certifications and
                        </span>
                        <span className="text-primary animate-pulse ml-1">
                            professional accreditations
                        </span>
                    </p>
                </div>

                {/* Enhanced Carousel Section */}
                <Carousel
                    opts={{
                        align: "center",
                        loop: true,
                    }}
                    className="w-full max-w-5xl mx-auto"
                >
                    <CarouselContent>
                        {certificates.map((certificate: Certificate) => (
                            <CarouselItem key={certificate._id} className="sm:basis-4/5 md:basis-3/4 lg:basis-full">
                                <Card className="relative overflow-hidden rounded-xl bg-gradient-to-br from-background/80 via-background to-muted/20 backdrop-blur-sm border-primary/10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6">
                                        {/* Left side - Certificate Image */}
                                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                                            <Image
                                                src={certificate.image}
                                                alt={certificate.title}
                                                layout="fill"
                                                objectFit="cover"
                                                className="transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

                                            {/* Quick View Button */}
                                            <Button
                                                onClick={() => setSelectedImage(certificate.image)}
                                                variant="secondary"
                                                size="sm"
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100"
                                            >
                                                View Certificate
                                            </Button>

                                            {/* Floating Badge */}
                                            <Badge className="absolute top-2 right-2 bg-primary/90 text-primary-foreground text-xs">
                                                {certificate.category}
                                            </Badge>
                                        </div>

                                        {/* Right side - Certificate Details */}
                                        <div className="flex flex-col justify-center space-y-4">
                                            {/* Issuer and Title */}
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Medal className="w-4 h-4 text-primary" />
                                                    <span className="text-sm text-muted-foreground">{certificate.issuedBy}</span>
                                                </div>
                                                <h3 className="text-lg sm:text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                                                    {certificate.title}
                                                </h3>
                                                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-2">
                                                    {certificate.description}
                                                </p>
                                            </div>

                                            {/* Skills Section */}
                                            <div className="space-y-2">
                                                <h4 className="text-xs font-medium text-primary flex items-center gap-2">
                                                    <Star className="w-3 h-3" />
                                                    Key Skills
                                                </h4>
                                                <div className="flex flex-wrap gap-1">
                                                    {certificate.skills.map((skill,index) => (
                                                        <Badge
                                                            key={index}
                                                            variant="secondary"
                                                            className="bg-primary/5 hover:bg-primary/10 transition-colors text-xs"
                                                        >
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Date and Actions */}
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <Sparkles className="w-3 h-3 text-primary" />
                                                    <span>Issued: {certificate.date}</span>
                                                </div>

                                                {/*<Button
                                                    onClick={() => window.open(certificate.credentialLink)}
                                                    variant="default"
                                                    size="sm"
                                                    className="w-full group hover:scale-105 transition-transform duration-300"
                                                >
                                                    <span>Verify Credential</span>
                                                    <ExternalLink className="w-3 h-3 ml-2 group-hover:rotate-45 transition-transform duration-300" />
                                                </Button>*/}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="flex items-center justify-center gap-4 mt-6">
                        <CarouselPrevious className="relative static translate-y-0 hover:scale-110 transition-transform duration-300" />
                        <CarouselNext className="relative static translate-y-0 hover:scale-110 transition-transform duration-300" />
                    </div>
                </Carousel>

                {/* Enhanced Certificate Modal */}
                <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>

                    <DialogTitle></DialogTitle>
                    <DialogContent aria-describedby={undefined} className="max-w-4xl w-full p-0 overflow-hidden bg-background/80 backdrop-blur-sm">
                        {selectedImage && (
                            <div className="relative aspect-[16/10] w-full">
                                <Image
                                    src={selectedImage}
                                    alt="Certificate"
                                    layout="fill"
                                    objectFit="contain"
                                    className="p-2"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent pointer-events-none" />
                            </div>
                        )}
                    </DialogContent>
                </Dialog>

                {/* Enhanced Background Decorations */}
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
            </motion.div>
        </section>
    );
};

export default Certification;

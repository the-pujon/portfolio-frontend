/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card,CardContent } from "@/components/ui/card"
import { Carousel,CarouselContent,CarouselItem,CarouselNext,CarouselPrevious,} from "@/components/ui/carousel"
import { Progress } from "@/components/ui/progress"
import { Tabs,TabsContent,TabsList,TabsTrigger } from "@/components/ui/tabs"
import { Github,Globe,Play,Star,Briefcase,Code,Layers } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useGetProjectByIdQuery,useGiveFeedbackMutation } from "@/redux/features/project/projectApi"
import { useParams } from "next/navigation"




export default function ProjectDetails() {
    const [isDescriptionExpanded,setIsDescriptionExpanded] = useState(false);
    const [userRating,setUserRating] = useState(0);
    const [userEmail,setUserEmail] = useState('');
    const [userFeedback,setUserFeedback] = useState('');

    const { id } = useParams();
    const { data: projectData,isLoading } = useGetProjectByIdQuery(id as string);
    const project = projectData?.data;
    console.log(project)

    console.log(isLoading)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [giveFeedback,{ isLoading: feedbackLoading }] = useGiveFeedbackMutation();
    const handleSubmitFeedback = async (e: React.FormEvent) => {
        e.preventDefault();

        const feedbackData = {
            rating: userRating,
            email: userEmail,
            feedback: userFeedback,
            projectId: id as string,
        }

        const res = await giveFeedback(feedbackData);
        console.log(res)
        // Here you would typically send this data to your backend
        //console.log({ rating: userRating,email: userEmail,feedback: userFeedback });

        toast.success("Feedback Submitted");
        // Reset form
        setUserRating(0);
        setUserEmail('');
        setUserFeedback('');
    };

    //console.log(project?.fullDescription?.length)

    return (
        <div className="min-h-screen bg-background p-4 sm:p-4">
            {
                isLoading && <div>Loading...</div>
            }
            <div className="container mx-auto bg-background mt-16 sm:mt-12">
                <div className="p-0 sm:p-8">
                    {/* Enhanced Title Section */}
                    <div className="flex flex-col items-center mb-10 sm:mb-16 md:mb-20">
                        <motion.div
                            className="relative mb-4 sm:mb-6"
                            variants={{
                                hidden: { opacity: 0,y: -20 },
                                visible: { opacity: 1,y: 0 }
                            }}
                        >
                            <span className="text-xs sm:text-sm md:text-base font-medium text-primary/80 tracking-wider uppercase mb-0 sm:mb-4 block text-center">
                                Project Showcase
                            </span>
                            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold relative z-10 tracking-tight text-center sm:px-4">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary/50">
                                    {project?.title}
                                </span>
                            </h2>
                            <div className="absolute -top-4 sm:-top-6 md:-top-8 -right-4 sm:-right-6 md:-right-8 text-primary/20 animate-pulse">
                                <Code className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
                            </div>
                        </motion.div>

                        <motion.p
                            className="text-xs sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-full sm:max-w-2xl md:max-w-3xl text-center leading-relaxed px-2"
                            variants={{
                                hidden: { opacity: 0,y: 20 },
                                visible: { opacity: 1,y: 0 }
                            }}
                        >
                            {project?.shortDescription}
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap justify-center gap-2 mt-2 sm:mt-6 text-xs sm:text-sm text-muted-foreground/60 px-2"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1 }
                            }}
                        >
                            <span className="flex items-center">
                                <Layers className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                {project?.projectType}
                            </span>
                            <span className="px-2">•</span>
                            <span className="flex items-center">
                                <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                {project?.projectStatus}
                            </span>
                            <span className="px-2">•</span>
                            <span className="flex items-center">
                                <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                {project?.projectDuration}
                            </span>
                        </motion.div>
                    </div>

                    {/* Updated buttons section */}
                    <motion.div
                        className="grid grid-cols-2 md:flex md:flex-row justify-center gap-4 mb-8 w-full"
                        variants={{
                            hidden: { opacity: 0,y: 20 },
                            visible: { opacity: 1,y: 0 }
                        }}
                    >
                        <Button asChild variant="default">
                            <a href={project?.liveLink} target="_blank" rel="noopener noreferrer">
                                <Globe className="mr-2 h-4 w-4" /> Live Demo
                            </a>
                        </Button>
                        <Button asChild variant="default">
                            <a href={project?.videoDemo} target="_blank" rel="noopener noreferrer">
                                <Play className="mr-2 h-4 w-4" /> Video Demo
                            </a>
                        </Button>
                        <Button asChild variant="outline">
                            <a href={project?.clientGithub} target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 h-4 w-4" /> Client Repo
                            </a>
                        </Button>
                        <Button asChild variant="outline">
                            <a href={project?.serverGithub} target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 h-4 w-4" /> Server Repo
                            </a>
                        </Button>
                    </motion.div>

                    {/* Responsive Content Section */}
                    <div className="md:hidden">
                        {/* Mobile layout */}
                        <div className="flex flex-col space-y-8">
                            <Carousel className="w-full relative">
                                <CarouselContent>
                                    {project?.images && project?.images.length > 0 ? (
                                        project?.images.map((image: string,index: number) => (
                                            <CarouselItem key={index} className="">
                                                <Image src={image} alt={`Project image ${index + 1}`} width={800} height={450} className="rounded-lg object-cover w-full h-[300px] shadow-lg" />
                                            </CarouselItem>
                                        ))
                                    ) : (
                                        <CarouselItem>
                                            <Image src="/placeholder.svg" alt="Project thumbnail" width={800} height={450} className="rounded-lg object-cover w-full h-[300px] shadow-lg" />
                                        </CarouselItem>
                                    )}
                                </CarouselContent>
                                <CarouselPrevious className="absolute left-2" />
                                <CarouselNext className="absolute right-2" />
                            </Carousel>

                            <div className="space-y-4">
                                <div className="flex items-center justify-center mb-2">
                                    <Layers className="w-5 h-5 mr-2 text-primary" />
                                    <h3 className="text-xl font-semibold text-primary">Project Details</h3>
                                </div>
                                <div className="grid grid-cols-1 gap-2 text-sm">
                                    <p><strong className="text-primary">Category:</strong> {project?.category}</p>
                                    <p><strong className="text-primary">Duration:</strong> {project?.projectDuration}</p>
                                    <p><strong className="text-primary">Team Size:</strong> {project?.projectTeamSize}</p>
                                    <p><strong className="text-primary">Type:</strong> {project?.projectType}</p>
                                    <p><strong className="text-primary">Status:</strong> {project?.projectStatus}</p>
                                    <p><strong className="text-primary">Stack:</strong> {project?.projectStack}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-center mb-2">
                                    <Code className="w-5 h-5 mr-2 text-primary" />
                                    <h3 className="text-xl font-semibold text-primary">Technologies Used</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {project?.technologies?.map((tech: string,index: number) => (
                                        <Badge key={index} variant="secondary">{tech}</Badge>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-primary">Description</h3>
                                <motion.div
                                    initial={{ height: 200,overflow: "hidden" }}
                                    animate={{ height: isDescriptionExpanded ? "auto" : 200 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="richText max-w-none text-sm" dangerouslySetInnerHTML={{ __html: project?.fullDescription || '' }} />
                                </motion.div>
                                {
                                    project?.fullDescription && project?.fullDescription.length > 700 && (
                                        <Button
                                            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                                            variant="ghost"
                                            size="sm"
                                            className="mt-2"
                                        >
                                            {isDescriptionExpanded ? "Read Less" : "Read More"}
                                        </Button>
                                    )
                                }
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-primary">Key Features</h3>
                                <ul className="list-disc list-inside space-y-2 text-sm">
                                    {project?.keyFeatures?.map((feature: string,index: number) => (
                                        <li key={index} className="text-muted-foreground">{feature}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold text-primary">Challenges and Solutions</h3>
                                <div className="space-y-4">
                                    {project?.challenges?.map((challenge: string,index: number) => (
                                        <div key={index} className="bg-primary/10 p-3 rounded-lg text-sm">
                                            <p className="font-semibold mb-1 text-primary">Challenge: {challenge}</p>
                                            <p className="text-muted-foreground">Solution: {project?.solutions?.[index]}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold text-primary">Project Feedback</h3>
                                <div className="space-y-2">
                                    {project?.feedbacks?.map((feedback: any,index: number) => (
                                        <div key={index} className="bg-primary/10 p-3 rounded-lg text-sm">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                                <p className="font-semibold text-primary">{feedback.email}</p>
                                                <div className="flex items-center mt-1 sm:mt-0">
                                                    <span className="mr-2 font-bold text-primary">{feedback.rating}/5</span>
                                                    <Progress value={feedback.rating * 20} className="w-24" />
                                                </div>
                                            </div>
                                            <p className="italic text-muted-foreground">&quot;{feedback.feedback}&quot;</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-primary">Give Your Feedback</h3>
                                <form onSubmit={handleSubmitFeedback} className="space-y-4">
                                    <div>
                                        <Label htmlFor="rating" className="text-primary">Rating</Label>
                                        <div className="flex items-center space-x-1">
                                            {[1,2,3,4,5].map((star) => (
                                                <Button
                                                    key={star}
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className={`p-0 ${userRating >= star ? 'text-primary' : 'text-muted'}`}
                                                    onClick={() => setUserRating(star)}
                                                >
                                                    <Star className="h-5 w-5 fill-current" />
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="email" className="text-primary">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={userEmail}
                                            onChange={(e) => setUserEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="feedback" className="text-primary">Feedback</Label>
                                        <Textarea
                                            id="feedback"
                                            value={userFeedback}
                                            onChange={(e) => setUserFeedback(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <Button type="submit" size="sm">
                                        Submit Feedback
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Desktop layout (unchanged) */}
                    <div className="hidden md:block">
                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <Carousel className="w-full">
                                <CarouselContent>
                                    {project?.images && project?.images.length > 0 ? (
                                        project?.images.map((image: string,index: number) => (
                                            <CarouselItem key={index}>
                                                <Image src={image} alt={`Project image ${index + 1}`} width={800} height={450} className="rounded-lg object-cover w-full h-[300px] md:h-[450px] shadow-lg" />
                                            </CarouselItem>
                                        ))
                                    ) : (
                                        <CarouselItem>
                                            <Image src="/placeholder.svg" alt="Project thumbnail" width={800} height={450} className="rounded-lg object-cover w-full h-[300px] md:h-[450px] shadow-lg" />
                                        </CarouselItem>
                                    )}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>

                            <div className="space-y-6">
                                <Card className="bg-primary/5 shadow-none border border-dotted rounded-none">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-center mb-4">
                                            <Layers className="w-5 h-5 lg:w-6 lg:h-6 mr-2 text-primary" />
                                            <span className="text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                                                Project Details
                                            </span>
                                        </div>
                                        <span className="block text-sm lg:text-base text-muted-foreground/60 text-center mb-4">
                                            Key Information
                                        </span>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                            <p><strong className="text-primary">Category:</strong> {project?.category}</p>
                                            <p><strong className="text-primary">Duration:</strong> {project?.projectDuration}</p>
                                            <p><strong className="text-primary">Team Size:</strong> {project?.projectTeamSize}</p>
                                            <p><strong className="text-primary">Type:</strong> {project?.projectType}</p>
                                            <p><strong className="text-primary">Status:</strong> {project?.projectStatus}</p>
                                            <p><strong className="text-primary">Stack:</strong> {project?.projectStack}</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-primary/5 shadow-none border border-dotted rounded-none hidden lg:block">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-center mb-4">
                                            <Code className="w-5 h-5 lg:w-6 lg:h-6 mr-2 text-primary" />
                                            <span className="text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                                                Technologies Used
                                            </span>
                                        </div>
                                        <span className="block text-sm lg:text-base text-muted-foreground/60 text-center mb-4">
                                            Tools & Languages
                                        </span>
                                        <div className="flex flex-wrap gap-2">
                                            {project?.technologies?.map((tech: string,index: number) => (
                                                <Badge key={index} variant="secondary">{tech}</Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="block lg:hidden w-full col-span-2">
                                <Card className="bg-primary/5 shadow-none border border-dotted rounded-none">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-center mb-4">
                                            <Code className="w-5 h-5 lg:w-6 lg:h-6 mr-2 text-primary" />
                                            <span className="text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                                                Technologies Used
                                            </span>
                                        </div>
                                        <span className="block text-sm lg:text-base text-muted-foreground/60 text-center mb-4">
                                            Tools & Languages
                                        </span>
                                        <div className="flex flex-wrap gap-2">
                                            {project?.technologies?.map((tech: string,index: number) => (
                                                <Badge key={index} variant="secondary">{tech}</Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        <Tabs defaultValue="description" className="w-full">
                            <TabsList className="grid w-full grid-cols-5 mb-8 bg-primary/10">
                                <TabsTrigger value="description">Description</TabsTrigger>
                                <TabsTrigger value="features">Features</TabsTrigger>
                                <TabsTrigger value="challenges">Challenges</TabsTrigger>
                                <TabsTrigger value="feedback">Feedback</TabsTrigger>
                                <TabsTrigger value="give-feedback">Give Feedback</TabsTrigger>
                            </TabsList>
                            <TabsContent value="description">
                                <Card className="bg-primary/0 shadow-none border-none rounded-none">
                                    <CardContent className="p-6">
                                        <motion.div
                                            initial={{ height: 200,overflow: "hidden" }}
                                            animate={{ height: isDescriptionExpanded ? "auto" : 200 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <div className="richText max-w-none" dangerouslySetInnerHTML={{ __html: project?.fullDescription || '' }} />
                                        </motion.div>
                                        {
                                            project?.fullDescription && project?.fullDescription.length > 700 && (
                                                <Button
                                                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                                                    variant="ghost"
                                                    className="mt-4"
                                                >
                                                    {isDescriptionExpanded ? "Read Less" : "Read More"}
                                                </Button>
                                            )
                                        }
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="features">
                                <Card className="bg-primary/0 shadow-none border-none rounded-none">
                                    <CardContent className="p-6">
                                        <h3 className="text-2xl font-semibold mb-4 text-primary">Key Features</h3>
                                        <ul className="list-disc list-inside space-y-2">
                                            {project?.keyFeatures?.map((feature: string,index: number) => (
                                                <li key={index} className="text-muted-foreground">{feature}</li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="challenges">
                                <Card className="bg-primary/0 shadow-none border-none rounded-none">
                                    <CardContent className="p-6">
                                        <h3 className="text-2xl font-semibold mb-4 text-primary">Challenges and Solutions</h3>
                                        <div className="space-y-4">
                                            {project?.challenges?.map((challenge: string,index: number) => (
                                                <div key={index} className="bg-primary/10 p-4 rounded-lg">
                                                    <p className="font-semibold text-lg mb-2 text-primary">Challenge: {challenge}</p>
                                                    <p className="text-muted-foreground">Solution: {project?.solutions?.[index]}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="feedback">
                                <Card className="bg-primary/0 shadow-none border-none rounded-none">
                                    <CardContent className="p-6">
                                        <h3 className="text-2xl font-semibold mb-4 text-primary">Project Feedback</h3>
                                        <div className="space-y-4">
                                            {project?.feedbacks?.map((feedback: any,index: number) => (
                                                <div key={index} className="bg-primary/10 p-4 rounded-lg">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <p className="font-semibold text-primary">{feedback.email}</p>
                                                        <div className="flex items-center">
                                                            <span className="mr-2 font-bold text-lg text-primary">{feedback.rating}/5</span>
                                                            <Progress value={feedback.rating * 20} className="w-24" />
                                                        </div>
                                                    </div>
                                                    <p className="italic text-muted-foreground">&quot;{feedback.feedback}&quot;</p>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="give-feedback">
                                <Card className="bg-primary/0 shadow-none border-none rounded-none">
                                    <CardContent className="p-6">
                                        <h3 className="text-2xl font-semibold mb-4 text-primary">Give Your Feedback</h3>
                                        <form onSubmit={handleSubmitFeedback} className="space-y-4">
                                            <div>
                                                <Label htmlFor="rating" className="text-primary">Rating</Label>
                                                <div className="flex items-center space-x-1">
                                                    {[1,2,3,4,5].map((star) => (
                                                        <Button
                                                            key={star}
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            className={`p-0 ${userRating >= star ? 'text-primary' : 'text-muted'}`}
                                                            onClick={() => setUserRating(star)}
                                                        >
                                                            <Star className="h-6 w-6 fill-current" />
                                                        </Button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <Label htmlFor="email" className="text-primary">Email</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={userEmail}
                                                    onChange={(e) => setUserEmail(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="feedback" className="text-primary">Feedback</Label>
                                                <Textarea
                                                    id="feedback"
                                                    value={userFeedback}
                                                    onChange={(e) => setUserFeedback(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <Button type="submit">
                                                Submit Feedback
                                            </Button>
                                        </form>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}

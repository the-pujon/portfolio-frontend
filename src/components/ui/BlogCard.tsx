import { Calendar,ArrowRight,Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './button';
import { Badge } from './badge';
import { Card } from './card';

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    coverImage: string;
    date: string;
    readTime: string;
    category: string;
    slug: string;
}

interface BlogCardProps {
    post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
    return (
        <Card
            className="group h-full flex flex-col relative hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-primary/10 overflow-hidden bg-gradient-to-br from-background/80 via-background to-muted/20 backdrop-blur-sm hover:border-primary/30"
        >
            <Link href={`/blog/${post.slug}`} className="h-full flex flex-col">
                {/* Glowing effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-white/10 to-secondary/10 animate-gradient -z-10" />
                </div>

                <div className="relative h-48 w-full overflow-hidden">
                    <Image
                        src={post.coverImage}
                        alt={post.title}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500  backdrop-blur-[2px] " />

                    {/* Category badge */}
                    <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-primary/90 text-primary-foreground px-3 py-1 flex items-center gap-2">
                            {post.category}
                        </Badge>
                    </div>

                    {/* Date and read time - floating style */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-sm text-white z-20 ">
                        <span className="flex items-center gap-1 bg-primary/50 backdrop-blur-sm px-2 py-1 rounded-full">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1 bg-primary/50 backdrop-blur-sm px-2 py-1 rounded-full">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                        </span>
                    </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                    {/* Title with gradient effect on hover */}
                    <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all duration-300 line-clamp-2">
                        {post.title}
                    </h3>

                    {/* Excerpt with fade-in effect */}
                    <p className="text-muted-foreground mb-6 line-clamp-2 group-hover:text-muted-foreground/80 transition-colors duration-300">
                        {post.excerpt}
                    </p>

                    {/* Spacer to push button to bottom */}
                    <div className="flex-1"></div>

                    {/* Enhanced Read More button */}
                    <Button
                        variant="ghost"
                        className="w-full group/btn hover:bg-primary hover:text-white border border-primary/20 transition-all duration-300"
                    >
                        <span className="flex items-center justify-center gap-2">
                            Read Article
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
                        </span>
                    </Button>
                </div>
            </Link>
        </Card>
    );
}
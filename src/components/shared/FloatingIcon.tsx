"use client";

import { useAnimation,motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useEffect,useState } from "react";

type RandomPositions = {
    top: number;
    left: number;
    right: number;
    bottom: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    duration: number;
};

export const FloatingIcon = ({ icon: Icon,delay }: { icon: LucideIcon,delay: number }) => {
    const controls = useAnimation();
    const [randomPositions,setRandomPositions] = useState<RandomPositions>({
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        duration: 20,
    });

    useEffect(() => {
        setRandomPositions({
            top: Math.random() * 100,
            left: Math.random() * 100,
            right: Math.random() * 100,
            bottom: Math.random() * 100,
            x1: Math.random() * 100,
            y1: Math.random() * 100,
            x2: Math.random() * 100,
            y2: Math.random() * 100,
            duration: 20 + Math.random() * 10,
        });

        controls.start({
            y: [0,-10,0],
            transition: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: delay,
            },
        });
    },[controls,delay]);

    if (randomPositions.top === 0) {
        return null; // or a loading placeholder
    }

    return (
        <motion.div
            animate={controls}
            className="absolute text-primary/20"
            initial={{ x: `${randomPositions.x1}%`,y: `${randomPositions.y1}%` }}
            transition={{
                duration: randomPositions.duration,
                repeat: Infinity,
                repeatType: 'reverse' as const
            }}
        >
            <motion.div>
                <Icon size={32} />
            </motion.div>
        </motion.div>
    );
};

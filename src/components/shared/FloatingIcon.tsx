import { useAnimation,motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useEffect } from "react";

export const FloatingIcon = ({ icon: Icon,delay }: { icon: LucideIcon,delay: number }) => {
    const controls = useAnimation();

    useEffect(() => {
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

    return (
        <motion.div
            className="absolute text-primary/20"
            //initial={{ opacity: 0 }}
            //animate={{ opacity: 1 }}
            //transition={{ duration: 1 }}
            style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                right: `${Math.random() * 100}%`,
                bottom: `${Math.random() * 100}%`,
            }}
            initial={{ x: Math.random() * 100 + '%',y: Math.random() * 100 + '%' }}
            animate={{
                x: [Math.random() * 100 + '%',Math.random() * 100 + '%'],
                y: [Math.random() * 100 + '%',Math.random() * 100 + '%'],
            }}
            transition={{ duration: 20 + Math.random() * 10,repeat: Infinity,repeatType: 'reverse' }}

        >
            <motion.div animate={controls}>
                <Icon size={32} />
            </motion.div>
        </motion.div>
    );
};
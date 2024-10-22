import { LucideIcon } from "lucide-react";
import { motion } from 'framer-motion';

export function SocialIcons({ icon: Icon,link }: { icon: LucideIcon,link: string }) {
    return (

        <motion.a
            href={link}
            //  className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-purple-500 hover:to-cyan-500"
            className="flex flex-col items-center"
            whileHover={{ scale: 1.2,rotate: 360 }}
            transition={{ type: "spring",stiffness: 260,damping: 20 }}
        >
            <Icon size={24} className="text-primary mb-2" />
        </motion.a>
    );
}

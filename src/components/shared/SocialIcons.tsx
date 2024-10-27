import { LucideIcon } from "lucide-react";
import { motion } from 'framer-motion';
import Link from "next/link";

export function SocialIcons({ icon: Icon,link }: { icon: LucideIcon,link: string }) {
    return (

        <Link href={link} target="_blank" rel="noopener noreferrer">
            <motion.div
                className="flex flex-col items-center"
                whileHover={{ scale: 1.2,rotate: 360 }}
                transition={{ type: "spring",stiffness: 260,damping: 20 }}
            >
                <Icon size={24} className="text-primary mb-2" />
            </motion.div>
        </Link>
    );
}

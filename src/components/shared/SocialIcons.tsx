import { LucideIcon } from "lucide-react";
import { motion } from 'framer-motion';
import Link from "next/link";
import LeetcodeIcon from '@/assets/leetcode2.png';
import Image from "next/image";

export function SocialIcons({ icon: Icon,link,name }: { icon: LucideIcon,link: string,name: string }) {
    return (

        <Link href={link || ''} target="_blank" rel="noopener noreferrer">
            <motion.div
                className="flex flex-col items-center"
                whileHover={{ scale: 1.2,rotate: 360 }}
                transition={{ type: "spring",stiffness: 260,damping: 20 }}
            >
                {name !== 'leetcode' && <Icon size={24} className="text-primary mb-2" />}
                {name === 'leetcode' &&
                    <Image src={LeetcodeIcon} alt="Leetcode" width={26} height={26} className="text-primary mb-2" />
                }
            </motion.div>
        </Link>
    );
}

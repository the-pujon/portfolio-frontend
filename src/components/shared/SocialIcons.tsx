import { LucideIcon } from "lucide-react";

export function SocialIcons({ icon: Icon,link }: { icon: LucideIcon,link: string }) {
    return (
        <a href={link} className="flex flex-col items-center">
            <Icon size={34} className="text-primary mb-2" />
        </a>
    );
}

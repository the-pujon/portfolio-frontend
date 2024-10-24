/* eslint-disable @typescript-eslint/no-explicit-any */
import { Building2,Calendar,Star } from 'lucide-react';
import React from 'react';

const EducationExperienceCard = ({ item }: { item: any }) => {
    return (
        <>
            <h3 className="text-lg sm:text-xl font-bold text-primary mb-2">{item.title}</h3>
            <div className="flex items-center text-muted-foreground mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="text-sm sm:text-base">{item.duration}</span>
            </div>
            <div className="flex items-center text-muted-foreground mb-4">
                <Building2 className="w-4 h-4 mr-2" />
                <span className="text-sm sm:text-base">{item.organization}, {item.location}</span>
            </div>
            <ul className="space-y-2">
                {item.points.map((point: any,i: any) => (
                    <li key={i} className="flex items-center text-muted-foreground">
                        <Star className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                        <span className="text-sm sm:text-base">{point}</span>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default EducationExperienceCard;
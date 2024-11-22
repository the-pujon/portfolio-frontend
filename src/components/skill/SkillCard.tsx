import React from 'react';
import Image from 'next/image';
import { Pencil,Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card,CardFooter,CardHeader,CardTitle } from '@/components/ui/card';
import { Skill } from '@/types/skill';

interface SkillCardProps {
    skill: Skill;
    onEdit: () => void;
    onDelete: () => void;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill,onEdit,onDelete }) => (
    <Card className="overflow-hidden border-none shadow-none rounded-none">
        <CardHeader className="flex flex-row items-center space-x-4 pb-2">
            <div className="relative h-16 w-16 flex-shrink-0">
                <Image
                    src={skill.image}
                    alt={skill.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                />
            </div>
            <div className="flex-grow">
                <CardTitle className="text-lg">{skill.name}</CardTitle>
                <p className="text-sm text-gray-500">{skill.category}</p>
            </div>
        </CardHeader>
        <CardFooter className="flex justify-end space-x-2 pt-2">
            <Button variant="outline" size="sm" onClick={onEdit}>
                <Pencil className="mr-2 h-4 w-4" /> Edit
            </Button>
            <Button variant="destructive" size="sm" onClick={onDelete}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete
            </Button>
        </CardFooter>
    </Card>
);

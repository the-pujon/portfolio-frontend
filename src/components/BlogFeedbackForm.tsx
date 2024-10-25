import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

interface BlogFeedbackFormProps {
    blogId: string;
    onSubmit: (feedback: {
        rating: number;
        email: string;
        feedback: string;
    }) => void;
}

export const BlogFeedbackForm: React.FC<BlogFeedbackFormProps> = ({ blogId, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ rating, email, feedback });
        // Reset form
        setRating(0);
        setEmail('');
        setFeedback('');
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="mt-8 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div>
                <label className="block text-sm font-medium mb-1">Rating</label>
                <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className={`focus:outline-none ${
                                star <= rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                        >
                            <Star className="w-6 h-6" fill={star <= rating ? 'currentColor' : 'none'} />
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                </label>
                <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="feedback" className="block text-sm font-medium mb-1">
                    Feedback
                </label>
                <Textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    required
                    rows={4}
                />
            </div>
            <Button type="submit" className="w-full">
                Submit Feedback
            </Button>
        </motion.form>
    );
};

'use client'

import React,{ useState } from 'react'
import Link from 'next/link'
import { useSigninMutation } from '@/redux/features/auth/authApi'
import { Mail,Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card,CardHeader,CardTitle,CardContent,CardFooter } from '@/components/ui/card'
import { toast } from 'sonner'

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn = () => {
    const [signin,{ isLoading }] = useSigninMutation()
    const [formData,setFormData] = useState<SignInFormData>({
        email: '',
        password: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name,value } = e.target
        setFormData(prev => ({ ...prev,[name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await signin(formData).unwrap()
            toast.success('Signed in successfully')
            // Redirect or further actions here
        } catch (error) {
            toast.error('Invalid email or password. Please try again.')
            console.log(error)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="relative mt-1">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="pl-10"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="relative mt-1">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="pl-10"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col items-center space-y-2">
                    <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
                        Forgot password?
                    </Link>
                    <p className="text-sm text-gray-600">
                        Don&apos;t have an account?
                        <Link href="/auth/signup" className="text-blue-600 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default SignIn

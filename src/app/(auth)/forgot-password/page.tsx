"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

const forgotPasswordSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
})

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const form = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    })

    async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
        setIsLoading(true)
        try {
            // Mock forgot password request
            console.log(values)
            setIsSubmitted(true)
            toast.success("Reset link sent to your email!")
        } catch (error) {
            toast.error("Failed to send reset link. Please try again.")
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    if (isSubmitted) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
                <Card className="w-full max-w-[400px]">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl text-center">Check your email</CardTitle>
                        <CardDescription className="text-center">
                            We have sent a password reset link to your email address.
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button asChild className="w-full">
                            <Link href="/login">Return to login</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
            <Card className="w-full max-w-[400px]">
                <CardHeader className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                        <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                            <Link href="/login"><ArrowLeft className="h-4 w-4" /></Link>
                        </Button>
                        <span className="text-sm font-medium">Back to login</span>
                    </div>
                    <CardTitle className="text-2xl text-center">Forgot password?</CardTitle>
                    <CardDescription className="text-center">
                        Enter your email and we&apos;ll send you a link to reset your password.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="name@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className="w-full" type="submit" disabled={isLoading}>
                                {isLoading && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Send reset link
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

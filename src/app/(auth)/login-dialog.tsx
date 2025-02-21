"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SignUpDialog from "@/app/(auth)/signup-dialog";

export default function LoginDialog({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
    const [error, setError] = useState("");
    const [isSignUpOpen, setSignUpOpen] = useState(false);

    const loginSchema = z.object({
        email: z.string().min(1, "Email is required").email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(loginSchema),
        mode: "onTouched",
        reValidateMode: "onBlur",
    });

    const onSubmit = async ({ email, password }: { email: string; password: string }) => {
        setError("");
        const result = await signIn("credentials", { email, password, redirect: false });

        if (result?.error) {
            setError("Invalid email or password");
            return;
        }
        setTimeout(() => {
            setOpen(false);
        }, 500);
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-md p-6 space-y-6 bg-white rounded-lg shadow-lg">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-gray-900 text-center">Login to ShopEase</DialogTitle>
                        <DialogDescription className="text-sm text-gray-600 text-center">Enter your credentials to continue</DialogDescription>
                    </DialogHeader>

                    {error && <p className="text-red-500 text-center font-medium">{error}</p>}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <Input
                                type="email"
                                {...register("email")}
                                placeholder="Enter your email"
                                className="mt-1 w-full"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <Input
                                type="password"
                                {...register("password")}
                                placeholder="Enter your password"
                                className="mt-1 w-full"
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Logging in..." : "Login"}
                        </Button>
                    </form>

                    <p className="text-center text-gray-600 text-sm">
                        Don&apos;t have an account?{' '}
                        <button
                            onClick={() => {
                                setOpen(false);
                                setSignUpOpen(true);
                            }}
                            className="text-blue-500 font-medium hover:underline"
                        >
                            Sign Up
                        </button>
                    </p>

                </DialogContent>
            </Dialog>
            <SignUpDialog open={isSignUpOpen} setOpen={setSignUpOpen} />
        </>
    );
}

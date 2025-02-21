"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast, { Toaster } from "react-hot-toast";
import { registerUser } from "@/actions/auth";

export default function SignUpDialog({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
    const [user, setUser] = useState({ name: "", email: "", password: "" });

    const signUpSchema = z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().min(1, "Email is required").email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
    });

    const {
        register,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(signUpSchema),
        mode: "onTouched",
        reValidateMode: "onBlur",
    });

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await registerUser(user);
        console.log("result", result)

        if (result.success === false) {
            setTimeout(() => {
                toast.error(result.error || "Registration failed");
            }, 100);
            return;
        }
        else {
            toast.success(result.message || "Registration successful!");
            setTimeout(() => {
                setOpen(false);
            }, 500);

        }
    };

    return (
        <>
            <Toaster position="top-right" />
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-md p-6 space-y-6 bg-white rounded-lg shadow-lg">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-gray-900 text-center">Create an Account</DialogTitle>
                        <DialogDescription className="text-sm text-gray-600 text-center">Sign up to start shopping</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleRegister} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <Input
                                type="text"
                                {...register("name")}
                                placeholder="Enter your name"
                                className="mt-1 w-full"
                                value={user.name}
                                onChange={(e) => setUser({ ...user, name: e.target.value })}
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <Input
                                type="email"
                                {...register("email")}
                                placeholder="Enter your email"
                                className="mt-1 w-full"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
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
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Signing up..." : "Sign Up"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>

    );
}

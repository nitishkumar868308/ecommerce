"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginPage() {
    const [error, setError] = useState("");
    const router = useRouter();

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
        router.push("/dashboard");
    };

    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-sm md:max-w-md p-6 sm:p-8 bg-white shadow-xl rounded-xl border border-gray-300">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6">Login</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            {...register("email")}
                            placeholder="Enter your email"
                            className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Password</label>
                        <input
                            type="password"
                            {...register("password")}
                            placeholder="Enter your password"
                            className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-200"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-center text-gray-600 text-sm mt-4">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-blue-500 font-semibold hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}

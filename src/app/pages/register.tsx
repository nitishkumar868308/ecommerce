"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/actions/auth";
import { userSchema } from "@/validator/userSchema";
import toast, { Toaster } from "react-hot-toast";

export default function RegisterPage() {
    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        // ✅ Validate with Zod
        const validation = userSchema.safeParse(user);
        if (!validation.success) {
            toast.error(validation.error.errors[0].message);
            return;
        }

        const result = await registerUser(user);

        if (!result.success) {
            toast.error(result.error || "Registration failed");
            return;
        }

        toast.success("Registration successful! Redirecting...");
        setTimeout(() => router.push("/dashboard"), 2000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <Toaster position="top-right" />

            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
                <form className="space-y-4" onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition"
                    >
                        Register
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}

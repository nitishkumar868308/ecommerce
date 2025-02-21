/* eslint-disable @typescript-eslint/no-explicit-any */

import { signIn } from "next-auth/react";

export async function registerUser(user: { name: string; email: string; password: string }) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || "User already exists or error occurred");
        }

        // ✅ Register hone ke baad auto-login
        const result = await signIn("credentials", {
            email: user.email,
            password: user.password,
            redirect: false,
        });

        if (result?.error) {
            throw new Error("Login failed after registration");
        }

        return { success: true , message : "Register Successfull!" };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

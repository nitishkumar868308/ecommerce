"use client";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useAuthStore } from "@/store/authStore"; // ✅ Import Zustand store
import { Menu, X, LogOut, UserCircle, ChevronDown, House, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function DefaultPage({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { data: session } = useSession();
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const logoutHandler = async () => {
        logout(); // ✅ Zustand store clear
        await signOut({ callbackUrl: "/" }); // ✅ NextAuth se logout
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 bg-cyan-950 text-white h-full transition-all ${isSidebarOpen ? "w-64" : "w-16"}`}>
                <div className="p-4 flex justify-between items-center">
                    {isSidebarOpen && <h2 className="text-lg font-bold">Ecommerce</h2>}
                    <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </Button>
                </div>
                <nav className="p-4 space-y-2">
                    <a href="#" className="flex p-2 rounded hover:bg-gray-800 items-center">
                        <House className="w-6 h-6" />
                        {isSidebarOpen && <span className="ml-2">Home</span>}
                    </a>
                    <a href="#" className="flex p-2 rounded hover:bg-gray-800 items-center">
                        <Settings className="w-6 h-6" />
                        {isSidebarOpen && <span className="ml-2">Settings</span>}
                    </a>
                    <a href="#" className="flex p-2 rounded hover:bg-gray-800 items-center">
                        <Users className="w-6 h-6" />
                        {isSidebarOpen && <span className="ml-2">Users</span>}
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <div className={`flex-1 flex flex-col transition-all ${isSidebarOpen ? "pl-64" : "pl-16"}`}>
                {/* Header */}
                <header className={`fixed top-0 bg-white shadow p-4 flex justify-between items-center z-50 transition-all ${isSidebarOpen ? "left-64 w-[calc(100%-16rem)]" : "left-16 w-[calc(100%-4rem)]"}`}>
                    <h1 className="text-xl font-bold">Admin Dashboard</h1>
                    <div className="relative dropdown-container">
                        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                            <Image
                                src="/images/profile.jpg"
                                alt="Profile"
                                width={40}
                                height={40}
                                className="rounded-full border border-gray-300"
                            />
                            <span className="hidden md:inline-block font-medium">
                                {session?.user?.name || user?.name || "User"}
                            </span>
                            <ChevronDown className="w-5 h-5 hidden md:inline-block" />
                        </div>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white shadow-md rounded-md overflow-hidden">
                                <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700">
                                    <UserCircle className="w-5 h-5 mr-2" /> Profile
                                </a>
                                <button
                                    onClick={logoutHandler} // ✅ Logout call
                                    className="flex w-full items-center px-4 py-2 hover:bg-gray-700 text-left"
                                >
                                    <LogOut className="w-5 h-5 mr-2" /> Logout
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 pt-16">{children}</main>
            </div>
        </div>
    );
}

"use client";
import { useState } from "react";
import { Menu, ShoppingCart, Search, X, User, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAuthStore } from "@/store/authStore";
import LoginDialog from "@/app/(auth)/login-dialog";
import { useSession, signOut } from "next-auth/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
    const user = useAuthStore((state) => state.user);
    const { data: session } = useSession();
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const logout = useAuthStore((state) => state.logout);

    const currentUser = session?.user || user;

    const logoutHandler = async () => {
        logout(); // ✅ Zustand store clear
        await signOut({ callbackUrl: "/" }); // ✅ NextAuth se logout
    };

    return (
        <header className="w-full px-6 py-4 bg-white shadow-md flex items-center justify-between md:px-10">
            {/* Sidebar Toggle Button */}
            <button onClick={() => setSidebarOpen(true)} className="md:hidden">
                <Menu className="w-6 h-6" />
            </button>

            <h1 className="text-2xl font-bold">ShopEase</h1>

            {/* Search Bar */}
            <div className="flex-1 mx-4 hidden md:block">
                <div className="relative">
                    <Input type="text" placeholder="Search products..." className="pl-10" />
                    <Search className="absolute left-3 top-2 w-5 h-5 text-gray-500" />
                </div>
            </div>

            {/* Cart and User Section */}
            <div className="flex items-center space-x-4">
                <ShoppingCart className="w-6 h-6 cursor-pointer" />
                {currentUser ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex items-center space-x-2 cursor-pointer">
                                <Avatar>
                                    <AvatarImage src={currentUser.image || "/images/profile.jpg"} alt="User" />
                                    {/* <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback> */}
                                </Avatar>
                                <span className="hidden md:block">{currentUser.name}</span>
                            </div>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem className="cursor-pointer">
                                <User className="w-4 h-4 mr-2" />
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={logoutHandler} className="cursor-pointer text-red-500">
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Button onClick={() => setLoginOpen(true)}>Login</Button>
                )}

            </div>

            <LoginDialog open={isLoginOpen} setOpen={setLoginOpen} />

            {/* Sidebar */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setSidebarOpen(false)}>
                    <div className="w-64 h-full bg-white shadow-lg p-4 relative" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4">
                            <X className="w-6 h-6" />
                        </button>
                        <h2 className="text-xl font-semibold mb-6">Menu</h2>
                        <ul className="space-y-4">
                            <li className="cursor-pointer hover:text-blue-600">Home</li>
                            <li className="cursor-pointer hover:text-blue-600">Shop</li>
                            <li className="cursor-pointer hover:text-blue-600">About</li>
                            <li className="cursor-pointer hover:text-blue-600">Contact</li>
                        </ul>
                    </div>
                </div>
            )}
        </header>
    );
}

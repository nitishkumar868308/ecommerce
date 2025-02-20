"use client"
import { useState, useEffect } from "react";
import { Menu, X, LogOut, UserCircle, ChevronDown, House, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Close sidebar by default on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".dropdown-container")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-cyan-950 text-white h-full transition-all ${isSidebarOpen ? "w-64" : "w-16"}`}
      >
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
        <header className="bg-white shadow p-4 flex justify-between items-center relative">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="relative dropdown-container">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <Image src="/images/profile.jpg" alt="Profile" width={40} height={40} className="rounded-full border border-gray-300" />
              <span className="hidden md:inline-block font-medium">Nitish Kumar</span>
              <ChevronDown className="w-5 h-5 hidden md:inline-block" />
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white shadow-md rounded-md overflow-hidden">
                <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700">
                  <UserCircle className="w-5 h-5 mr-2" /> Profile
                </a>
                <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700">
                  <LogOut className="w-5 h-5 mr-2" /> Logout
                </a>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4">
          <Card className="p-4">Welcome to the Admin Dashboard!</Card>
        </main>
      </div>
    </div>
  );
}

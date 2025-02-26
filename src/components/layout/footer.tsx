import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {/* Logo & About */}
                <div>
                    <h2 className="text-2xl font-bold">ShopEase</h2>
                    <p className="text-gray-400 mt-3">Premium quality products at the best prices.</p>
                </div>

                {/* Navigation */}
                <div>
                    <h3 className="text-lg font-semibold">Quick Links</h3>
                    <ul className="mt-3 space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-white transition">Home</a></li>
                        <li><a href="#" className="hover:text-white transition">Shop</a></li>
                        <li><a href="#" className="hover:text-white transition">About</a></li>
                        <li><a href="#" className="hover:text-white transition">Contact</a></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-lg font-semibold">Follow Us</h3>
                    <div className="mt-3 flex gap-3">
                        <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-blue-500 transition">
                            <FaFacebookF size={20} />
                        </a>
                        <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-blue-400 transition">
                            <FaTwitter size={20} />
                        </a>
                        <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-pink-500 transition">
                            <FaInstagram size={20} />
                        </a>
                        <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-blue-700 transition">
                            <FaLinkedinIn size={20} />
                        </a>
                    </div>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="text-lg font-semibold">Subscribe</h3>
                    <p className="text-gray-400 mt-2">Get updates on new products & offers.</p>
                    <div className="mt-3 flex items-center gap-2">
                        <Input type="email" placeholder="Your email" className="bg-gray-800 text-white border-none" />
                        <Button className="bg-blue-600 hover:bg-blue-700">Subscribe</Button>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} ShopEase. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;

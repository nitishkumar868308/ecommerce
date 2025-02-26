import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div className="bg-white p-6 shadow-lg rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
                    <form className="space-y-4">
                        <Input type="text" placeholder="Your Name" className="w-full" required />
                        <Input type="email" placeholder="Your Email" className="w-full" required />
                        <Textarea placeholder="Your Message" className="w-full" rows={5} required />
                        <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">Send Message</Button>
                    </form>
                </div>

                {/* Contact Information */}
                <div className="bg-gray-100 p-6 shadow-lg rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                    <p className="text-gray-600 mb-4">Feel free to reach out to us through any of the following channels:</p>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <Mail className="w-6 h-6 text-blue-600" />
                            <span>info@yourcompany.com</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Phone className="w-6 h-6 text-blue-600" />
                            <span>+1 234 567 890</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <MapPin className="w-6 h-6 text-blue-600" />
                            <span>123 Main Street, City, Country</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

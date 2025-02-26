// import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { FaUsers, FaLightbulb, FaChartLine } from "react-icons/fa";

export default function AboutPage() {
    const team = [
        { name: "John Doe", role: "Founder & CEO", image: "/images/about1.jpg" },
        { name: "Jane Smith", role: "CTO", image: "/images/about2.jpg" },
        { name: "Emily Johnson", role: "Lead Designer", image: "/images/about3.jpg" },
    ];
    return (
        <div className="w-full py-12 px-6 md:px-12 lg:px-20 bg-gray-50">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">About Us</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Welcome to ShopEase! We are dedicated to providing the best shopping experience with high-quality products and exceptional customer service.
                </p>
            </div>

            {/* Mission & Vision Section */}
            <div className="grid md:grid-cols-3 gap-8 mt-12">
                <Card className="text-center p-6 shadow-lg">
                    <FaUsers className="text-blue-600 text-4xl mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Our Team</h3>
                    <p className="text-gray-600">A passionate team dedicated to excellence.</p>
                </Card>
                <Card className="text-center p-6 shadow-lg">
                    <FaLightbulb className="text-yellow-500 text-4xl mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                    <p className="text-gray-600">To revolutionize the shopping experience with innovation.</p>
                </Card>
                <Card className="text-center p-6 shadow-lg">
                    <FaChartLine className="text-green-600 text-4xl mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                    <p className="text-gray-600">To be the most customer-centric platform in the world.</p>
                </Card>
            </div>

            {/* Team Section */}
            <div className="mt-16 text-center">
                <h3 className="text-3xl font-bold mb-8">Meet Our Team</h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {team.map((member, index) => (
                        <Card key={index} className="shadow-md p-4 text-center">
                            <CardContent>
                                <Avatar className="w-24 h-24 mx-auto mb-4">
                                    <AvatarImage src={member.image} alt={member.name} />
                                </Avatar>
                                <h3 className="text-xl font-semibold">{member.name}</h3>
                                <p className="text-gray-600">{member.role}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Call to Action */}
            <div className="mt-12 text-center">
                <h3 className="text-2xl font-semibold">Join Us Today</h3>
                <p className="text-gray-600 mb-4">Be part of our journey in redefining online shopping.</p>
                {/* <Button className="bg-blue-600 text-white px-6 py-3 hover:bg-blue-700">Get in Touch</Button> */}
            </div>
        </div>
    );
}

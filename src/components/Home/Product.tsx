import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import AddToCart from "../shared/add-to-cart";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

export default function Product() {
    const products = [
        {
            image: "/images/p11-1.jpg",
            title: "Smartwatch Series 7",
            description: "Advanced health tracking & sleek design.",
            price: "$299",
        },
        {
            image: "/images/p11-2.jpg",
            title: "Wireless Headphones",
            description: "Noise cancellation & immersive sound.",
            price: "$199",
        },
        {
            image: "/images/p12-1.jpg",
            title: "Smartphone Pro Max",
            description: "Powerful performance & stunning display.",
            price: "$999",
        },
        {
            image: "/images/p12-2.jpg",
            title: "Laptop Ultra 2024",
            description: "Lightweight with an all-day battery life.",
            price: "$1,299",
        },
        {
            image: "/images/p13-2.jpg",
            title: "Gaming Console X",
            description: "4K gaming with next-gen performance.",
            price: "$499",
        },
        {
            image: "/images/p14-2.jpg",
            title: "4K Smart TV",
            description: "Ultra HD entertainment experience.",
            price: "$799",
        },
        {
            image: "/images/p21-1.jpg",
            title: "Tablet Pro",
            description: "Best for work and entertainment.",
            price: "$599",
        },
        {
            image: "/images/p23-2.jpg",
            title: "Wireless Earbuds",
            description: "Compact & powerful sound experience.",
            price: "$149",
        },
    ];

    return (
        <div className="py-10">
            {/* Section Heading */}
            <div className="w-full max-w-6xl mx-auto px-4">
                <h2 className="text-4xl font-bold text-left mb-6 text-gray-900">Products</h2>
            </div>

            {/* Product Carousel */}
            <div className="w-full flex flex-col items-center overflow-hidden">
                <Carousel className="w-full max-w-6xl relative">
                    <CarouselContent className="flex items-stretch">
                        {products.map((product, index) => (
                            <CarouselItem
                                key={index}
                                className="flex basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 p-3"
                            >
                                <Card className="relative shadow-lg rounded-xl overflow-hidden border bg-white transform transition-all hover:scale-105 hover:shadow-xl group flex flex-col w-full">
                                    {/* Product Image */}
                                    <CardContent className="relative w-full aspect-[3/4]">
                                        <Image
                                            src={product.image}
                                            alt={product.title}
                                            fill
                                            className="object-contain"
                                            sizes="(max-width: 768px)"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    </CardContent>

                                    {/* Product Title (Fixed Width) */}
                                    <div className="p-4 flex flex-col items-center text-center w-full">
                                        <h3 className="text-lg font-semibold text-gray-900 whitespace-nowrap truncate w-full">
                                            {product.title}
                                        </h3>
                                    </div>

                                    {/* Hover Effect (Description & Price) */}
                                    <div className="absolute inset-0 bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center text-center p-4">
                                        <p className="text-sm">{product.description}</p>
                                        <p className="text-xl font-bold mt-2">{product.price}</p>
                                        <AddToCart />
                                    </div>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Navigation Buttons (Now Positioned Outside) */}
                    <CarouselPrevious className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 sm:p-2 hover:bg-gray-200" />
                    <CarouselNext className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 sm:p-2 hover:bg-gray-200" />

                </Carousel>
            </div>
        </div>
    );
}

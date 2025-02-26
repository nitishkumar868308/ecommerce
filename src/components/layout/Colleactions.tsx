"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import AddToCart from "../shared/add-to-cart";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";

//Dummy Product Data (Replace with API Data)
const products = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    category: ["Wearable", "Audio", "Mobile", "Computers"][i % 4],
    price: (i + 1) * 50 + 99,
    image: `/images/p${(i % 6) + 1}-1.jpg`,
}));

const categories = ["All", "Wearable", "Audio", "Mobile", "Computers"];
const sortOptions = ["Default", "Price: Low to High", "Price: High to Low"];

const Collections = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("Default");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8;

    //Filtering Products
    let filteredProducts = products.filter(
        (product) =>
            (selectedCategory === "All" || product.category === selectedCategory) &&
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    //Sorting Products
    if (sortOrder === "Price: Low to High") {
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "Price: High to Low") {
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    }

    //Pagination Logic
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-center mb-8">Collections</h1>

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-between gap-3 md:gap-4 mb-6">
                {/* Search Box */}
                <div className="relative flex-1 min-w-[200px]">
                    <Input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Category Filter */}
                <Select onValueChange={(value) => { setSelectedCategory(value); setCurrentPage(1); }} defaultValue="All">
                    <SelectTrigger className="w-full md:w-52 px-4 py-2 rounded-md border bg-white shadow-sm">
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((category, index) => (
                            <SelectItem key={index} value={category}>
                                {category}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Sort Order */}
                <Select onValueChange={(value) => { setSortOrder(value); setCurrentPage(1); }} defaultValue="Default">
                    <SelectTrigger className="w-full md:w-52 px-4 py-2 rounded-md border bg-white shadow-sm">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        {sortOptions.map((option, index) => (
                            <SelectItem key={index} value={option}>
                                {option}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {paginatedProducts.length > 0 ? (
                    paginatedProducts.map((product) => (
                        <Card key={product.id} className="shadow-md border rounded-lg overflow-hidden transition-transform hover:scale-105">
                            <CardContent className="p-4 flex flex-col items-center">
                                <div className="relative w-full aspect-[4/3]">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-contain rounded-md"
                                    />
                                </div>

                                {/* Product Details */}
                                <div className="text-center mt-4 flex flex-col flex-grow">
                                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                                    <p className="text-sm text-gray-600">{product.category}</p>
                                    <p className="text-lg font-bold text-blue-600 mt-1">${product.price}</p>
                                </div>

                                <AddToCart />
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p className="text-center text-gray-500 w-full">No products found.</p>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <Pagination className="mt-8 flex justify-center">
                    <PaginationContent className="flex items-center gap-2 bg-white shadow-md p-3 rounded-lg">
                        {/* Previous Button */}
                        <PaginationPrevious
                            className={`cursor-pointer px-4 py-2 rounded-md transition 
                    ${currentPage === 1 ? "opacity-50 cursor-not-allowed pointer-events-none" : "bg-gray-200 hover:bg-gray-300"}
                `}
                            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                        >
                            Previous
                        </PaginationPrevious>

                        {/* Page Numbers */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <PaginationItem
                                key={page}
                                className={`cursor-pointer px-4 py-2 rounded-md transition ${currentPage === page ? "bg-blue-600 text-white font-bold" : "bg-gray-100 hover:bg-gray-200"
                                    }`}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </PaginationItem>
                        ))}

                        {/* Next Button */}
                        <PaginationNext
                            className={`cursor-pointer px-4 py-2 rounded-md transition 
                    ${currentPage === totalPages ? "opacity-50 cursor-not-allowed pointer-events-none" : "bg-gray-200 hover:bg-gray-300"}
                `}
                            onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                        >
                            Next
                        </PaginationNext>
                    </PaginationContent>
                </Pagination>
            )}

        </div>
    );
};

export default Collections;

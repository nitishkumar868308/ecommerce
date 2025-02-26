'use client'

import * as React from 'react'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import Link from 'next/link'
import { Button } from '../ui/button'

export default function Slider() {
    const pluginRef = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    )

    const images = [
        {
            image: "/images/banner1.jpg",
            title: "Experience the Future of Shopping",
            url: "/explore",
            buttonCaption: "Shop Now"
        },
        {
            image: "/images/banner2.jpg",
            title: "Discover the Latest Trends",
            url: "/new-arrivals",
            buttonCaption: "Shop Now"
        },
        {
            image: "/images/banner3.jpg",
            title: "Exclusive Deals Just for You",
            url: "/deals",
            buttonCaption: "Shop Now"
        },
        {
            image: "/images/banner4.jpg",
            title: "New Item...",
            url: "/deals",
            buttonCaption: "Shop Now"
        }
    ]

    return (
        <Carousel
            dir='ltr'
            plugins={[pluginRef.current]}
            className='w-full mx-auto relative'
            onMouseEnter={() => pluginRef.current.stop()}
            onMouseLeave={() => pluginRef.current.reset()}
        >
            <CarouselContent>
                {images.map((item, index) => (
                    <CarouselItem key={index}>
                        <Link href={item.url} className='block relative w-full h-full'>
                            <div className='flex aspect-[16/6] items-center justify-center p-6 relative'>
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className='object-cover'
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent" />
                                <div className='absolute w-1/3 left-16 md:left-32 top-1/2 transform -translate-y-1/2'>
                                    <h2
                                        className="text-white font-extrabold leading-tight drop-shadow-lg
                                            text-2xl sm:text-4xl md:text-5xl lg:text-6xl"
                                    >
                                        {item.title}
                                    </h2>
                                    <Button className='hidden md:block mt-4'>
                                        {item.buttonCaption}
                                    </Button>
                                </div>
                            </div>
                        </Link>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className='left-4 md:left-12' />
            <CarouselNext className='right-4 md:right-12' />
        </Carousel>
    )
}
import React, { useState, useEffect, useRef } from 'react';

export default function GalleryCarousel({ images, onImageClick }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [itemsPerView, setItemsPerView] = useState(4);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    // Responsive breakpoints
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setItemsPerView(1);
            } else if (window.innerWidth < 1024) {
                setItemsPerView(2);
            } else {
                setItemsPerView(4);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Auto-play
    useEffect(() => {
        if (!isPaused && images.length > itemsPerView) {
            const interval = setInterval(() => {
                nextSlide();
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [currentIndex, isPaused, itemsPerView, images.length]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - itemsPerView ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - itemsPerView : prevIndex - 1
        );
    };

    const handleTouchStart = (e) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchStartX.current - touchEndX.current > 50) {
            nextSlide();
        }
        if (touchStartX.current - touchEndX.current < -50) {
            prevSlide();
        }
    };

    if (!images || images.length === 0) return null;

    const maxIndex = Math.max(0, images.length - itemsPerView);
    const progress = (currentIndex / maxIndex) * 100;

    return (
        <div
            className="relative group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Main Carousel Container */}
            <div className="overflow-hidden rounded-2xl">
                <div
                    className="flex transition-transform duration-700 ease-out"
                    style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
                >
                    {images.map((image) => (
                        <div
                            key={image.id}
                            className="flex-shrink-0 px-2"
                            style={{ width: `${100 / itemsPerView}%` }}
                        >
                            <div
                                className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group/item border-2 border-white/20 hover:border-white/50 transition-all duration-300 shadow-lg hover:shadow-2xl"
                                onClick={() => onImageClick(image)}
                            >
                                <img
                                    src={`/gtac${image.image_path}`}
                                    alt={image.title || 'Gallery image'}
                                    className="w-full h-full object-cover transform group-hover/item:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    {image.title && (
                                        <p className="text-white font-medium truncate w-full">{image.title}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons - Only show if there are more images than viewable */}
            {images.length > itemsPerView && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/90 text-white hover:text-gtac-700 p-3 rounded-full backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 disabled:opacity-0 translate-x-4 group-hover:translate-x-0"
                        aria-label="Previous slide"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/90 text-white hover:text-gtac-700 p-3 rounded-full backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 disabled:opacity-0 -translate-x-4 group-hover:translate-x-0"
                        aria-label="Next slide"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Progress Bar */}
                    <div className="absolute -bottom-8 left-0 right-0 px-4">
                        <div className="max-w-xs mx-auto h-1 bg-white/20 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-white/80 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${Math.max(10, (100 / (images.length - itemsPerView + 1)))}%`, transform: `translateX(${currentIndex * 100}%)` }}
                            ></div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

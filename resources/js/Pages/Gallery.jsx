import MainLayout from '../Layouts/MainLayout';
import { useState } from 'react';

export default function Gallery({ images }) {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <MainLayout>
            <div className="bg-gradient-to-r from-gtac-600 to-gtac-700 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-4">Classroom Gallery</h1>
                    <p className="text-xl text-white/90">
                        Take a virtual tour of our state-of-the-art facilities and learning spaces.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {images && images.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {images.map((image) => (
                            <div
                                key={image.id}
                                className="aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition"
                                onClick={() => setSelectedImage(image)}
                            >
                                <img
                                    src={`/gtac${image.image_path}`}
                                    alt={image.title || 'Gallery image'}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No gallery images available at the moment.</p>
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300"
                    >
                        ×
                    </button>
                    <div className="max-w-4xl w-full">
                        <img
                            src={`/gtac${selectedImage.image_path}`}
                            alt={selectedImage.title || 'Gallery image'}
                            className="w-full h-auto rounded-lg"
                        />
                        {(selectedImage.title || selectedImage.description) && (
                            <div className="mt-4 text-white text-center">
                                {selectedImage.title && <h3 className="text-xl font-semibold mb-2">{selectedImage.title}</h3>}
                                {selectedImage.description && <p className="text-gray-300">{selectedImage.description}</p>}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </MainLayout>
    );
}


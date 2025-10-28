import MainLayout from '../Layouts/MainLayout';
import { useState } from 'react';

export default function Home({ homePage, courses, galleryImages, vision, mission, about, latitude, longitude, address }) {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <MainLayout>
            {/* Hero Section */}
            <section id="home" className="relative min-h-screen flex items-center justify-center text-white overflow-hidden parallax-section" style={{ backgroundImage: 'url(/images/homeBg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/60"></div>
                
                <div className="absolute inset-0 opacity-10 parallax-bg">
                    <div className="absolute inset-0 bg-pattern opacity-30"></div>
                </div>
                <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-20 scroll-reveal">
                    <div className="animate-fade-in">
                        {/* Logo Display */}
                        <div className="flex items-center justify-center gap-4 md:gap-8 animate-slide-up">
                            {/* GTAC Logo */}
                            <div className="flex-shrink-0 bg-white/70 rounded-full p-1">
                                <img 
                                    src="/images/gtacLogo.png" 
                                    alt="GTAC Logo" 
                                    className="h-20 md:h-27 w-auto"
                                />
                            </div>
                            
                            {/* Center Text */}
                            <div className="flex flex-col items-center">
                                <h1 className="text-5xl md:text-7xl lg:text-9xl xl:text-[6rem] font-black text-gtac-600 mb-2 tracking-tight text-[#41b926]" 
                                    style={{ 
                                        textShadow: '3px 3px 0px rgba(197, 197, 197, 0.3), 6px 6px 0px rgba(224, 222, 222, 0.2), 9px 9px 0px rgba(0,0,0,0.1)',
                                        WebkitTextStroke: '1px rgba(0,0,0,0.3)'
                                    }}>
                                    GENESIS
                                </h1>
                            </div>
                            
                            {/* TESDA Logo */}
                            <div className="flex-shrink-0 bg-white/70 rounded-full p-1">
                                <img 
                                    src="/images/tesdaLogo.png" 
                                    alt="TESDA Logo" 
                                    className="h-20 md:h-27 w-auto"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col items-center mb-12 mt-4">
                                <h2 className="text-sm md:text-lg lg:text-3xl font-bold text-white uppercase">
                                    Training & Assessment Center Inc.
                                </h2>
                            </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up delay-200">
                            <a
                                href="#courses"
                                className="bg-white text-gtac-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 hover:scale-105 transition transform"
                            >
                                Explore Courses
                            </a>
                            <a
                                href="#contact"
                                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gtac-600 transition transform hover:scale-105"
                            >
                                Get In Touch
                            </a>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </section>

            {/* About Section */}
            {homePage && (
                <section id="about" className="py-20 bg-gray-50 scroll-reveal">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl font-bold text-center mb-12 text-gtac-600">About GTAC</h2>
                        <div className="prose max-w-4xl mx-auto text-gray-700 scroll-reveal" dangerouslySetInnerHTML={{ __html: homePage.content }} />
                    </div>
                </section>
            )}

            {/* Courses Section */}
            <section id="courses" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 scroll-reveal">
                        <h2 className="text-4xl font-bold mb-4 text-gtac-600">Our Courses</h2>
                        <p className="text-xl text-gray-600">Discover our comprehensive range of courses</p>
                    </div>
                    {courses && courses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {courses.map((course) => (
                                <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition hover:-translate-y-2 scroll-reveal">
                                    <div className="p-6">
                                        {course.category && (
                                            <span className="inline-block bg-gtac-100 text-gtac-800 text-xs px-2 py-1 rounded mb-2">
                                                {course.category}
                                            </span>
                                        )}
                                        <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                                        <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
                                        {course.level && (
                                            <p className="text-sm text-gray-500 mb-2"><strong>Level:</strong> {course.level}</p>
                                        )}
                                        {course.duration && (
                                            <p className="text-sm text-gray-500 mb-4"><strong>Duration:</strong> {course.duration}</p>
                                        )}
                                        <div className="flex justify-between items-center">
                                            <span className="text-gtac-600 hover:text-gtac-700 font-medium cursor-pointer">
                                                Learn More →
                                            </span>
                                            {course.brochure_path && (
                                                <a href={course.brochure_path} download className="text-sm text-gray-500 hover:text-gray-700">
                                                    Download PDF
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No courses available at the moment.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Core Values Section */}
            <section id="values" className="py-20 bg-gtac-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 scroll-reveal">
                    <h2 className="text-4xl font-bold text-center mb-16 text-gtac-600">Core Values</h2>
                    <div className="space-y-6">
                        {/* G - Growth */}
                        <div className="flex items-start gap-6 p-4">
                            <div className="flex-shrink-0">
                                <svg className="w-20 h-20 text-gtac-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5 0-1.38 1.12-2.5 2.5-2.5 1.38 0 2.5 1.12 2.5 2.5 0 1.38-1.12 2.5-2.5 2.5z"/>
                                    <circle cx="12" cy="7" r="2" fill="currentColor"/>
                                </svg>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-2">
                                    <span className="text-5xl font-bold text-gtac-600">G</span>
                                    <span className="text-2xl font-bold text-gtac-700">- Growth</span>
                                </div>
                                <p className="text-gray-600 text-lg">We are committed to continuous learning and self-improvement to ensure professional and personal development for our trainees and staff.</p>
                            </div>
                        </div>

                        {/* E - Excellence */}
                        <div className="flex items-start gap-6 p-4">
                            <div className="flex-shrink-0">
                                <svg className="w-20 h-20 text-gtac-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 15.9V19H7v2h10v-2h-4v-3.1a5.01 5.01 0 0 0 3.61-4.96V7c0-1.1-.9-2-2-2z"/>
                                </svg>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-2">
                                    <span className="text-5xl font-bold text-gtac-600">E</span>
                                    <span className="text-2xl font-bold text-gtac-700">- Excellence</span>
                                </div>
                                <p className="text-gray-600 text-lg">We uphold the highest standards in technical-vocational education, ensuring our graduates are well-equipped for success.</p>
                            </div>
                        </div>

                        {/* N - Nurturing */}
                        <div className="flex items-start gap-6 p-4">
                            <div className="flex-shrink-0">
                                <svg className="w-20 h-20 text-gtac-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-2">
                                    <span className="text-5xl font-bold text-gtac-600">N</span>
                                    <span className="text-2xl font-bold text-gtac-700">- Nurturing</span>
                                </div>
                                <p className="text-gray-600 text-lg">We create a supportive and inclusive learning environment that fosters personal and career growth.</p>
                            </div>
                        </div>

                        {/* E - Empowerment */}
                        <div className="flex items-start gap-6 p-4">
                            <div className="flex-shrink-0">
                                <svg className="w-20 h-20 text-gtac-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7zM9 4v5h6V4z"/>
                                </svg>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-2">
                                    <span className="text-5xl font-bold text-gtac-600">E</span>
                                    <span className="text-2xl font-bold text-gtac-700">- Empowerment</span>
                                </div>
                                <p className="text-gray-600 text-lg">We equip individuals with the skills and confidence to achieve financial independence and career success.</p>
                            </div>
                        </div>

                        {/* S - Service */}
                        <div className="flex items-start gap-6 p-4">
                            <div className="flex-shrink-0">
                                <svg className="w-20 h-20 text-gtac-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-2">
                                    <span className="text-5xl font-bold text-gtac-600">S</span>
                                    <span className="text-2xl font-bold text-gtac-700">- Service</span>
                                </div>
                                <p className="text-gray-600 text-lg">We are dedicated to making a positive impact on society by providing quality education that transforms lives.</p>
                            </div>
                        </div>

                        {/* I - Integrity */}
                        <div className="flex items-start gap-6 p-4">
                            <div className="flex-shrink-0">
                                <svg className="w-20 h-20 text-gtac-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-2">
                                    <span className="text-5xl font-bold text-gtac-600">I</span>
                                    <span className="text-2xl font-bold text-gtac-700">- Integrity</span>
                                </div>
                                <p className="text-gray-600 text-lg">We operate with honesty, transparency, and accountability in all our dealings with students, partners, and stakeholders.</p>
                            </div>
                        </div>

                        {/* S - Sustainability */}
                        <div className="flex items-start gap-6 p-4">
                            <div className="flex-shrink-0">
                                <svg className="w-20 h-20 text-gtac-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                                </svg>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-2">
                                    <span className="text-5xl font-bold text-gtac-600">S</span>
                                    <span className="text-2xl font-bold text-gtac-700">- Sustainability</span>
                                </div>
                                <p className="text-gray-600 text-lg">We commit to sustainable practices in education and operations for a better tomorrow.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section with Parallax */}
            <section id="gallery" className="relative py-20 bg-gradient-to-b from-gtac-600 to-gtac-700 text-white overflow-hidden parallax-section">
                <div className="absolute inset-0 bg-black/10 parallax-bg"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 scroll-reveal">
                        <h2 className="text-4xl font-bold mb-4">Classroom Gallery</h2>
                        <p className="text-xl text-white/90">Take a virtual tour of our facilities</p>
                    </div>
                    {galleryImages && galleryImages.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {galleryImages.map((image, index) => (
                                <div
                                    key={image.id}
                                    className="aspect-square overflow-hidden rounded-lg cursor-pointer transform hover:scale-105 transition shadow-lg hover:shadow-xl"
                                    onClick={() => setSelectedImage(image)}
                                >
                                    <img
                                        src={image.image_path}
                                        alt={image.title || 'Gallery image'}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-white/80 text-lg">No gallery images available at the moment.</p>
                        </div>
                    )}
                </div>

                {/* Lightbox Modal */}
                {selectedImage && (
                    <div
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10"
                        >
                            ×
                        </button>
                        <div className="max-w-4xl w-full">
                            <img
                                src={selectedImage.image_path}
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
            </section>

            {/* Vision & Mission Section */}
            <section id="vision-mission" className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 scroll-reveal">
                    {/* About */}
                    {about && (
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                            <h2 className="text-3xl font-bold mb-6 text-gtac-600">About Us</h2>
                            <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: about.content }} />
                        </div>
                    )}

                    {/* Vision */}
                    {vision && (
                        <div className="bg-gtac-50 rounded-lg shadow-lg p-8 mb-8">
                            <h2 className="text-3xl font-bold mb-6 text-gtac-600">Our Vision</h2>
                            <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: vision.content }} />
                        </div>
                    )}

                    {/* Mission */}
                    {mission && (
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h2 className="text-3xl font-bold mb-6 text-gtac-600">Our Mission</h2>
                            <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: mission.content }} />
                        </div>
                    )}

                    {!vision && !mission && !about && (
                        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                            <p className="text-gray-500 text-lg">Content will be added soon.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 scroll-reveal">
                        <h2 className="text-4xl font-bold mb-4 text-gtac-600">Contact Us</h2>
                        <p className="text-xl text-gray-600">We'd love to hear from you</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Contact Form */}
                        <div className="bg-white rounded-lg shadow-lg p-8 scroll-reveal">
                            <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
                            <form id="contact-form" className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gtac-500 focus:border-gtac-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gtac-500 focus:border-gtac-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                                    <textarea
                                        rows="5"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gtac-500 focus:border-gtac-500"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-gtac-600 text-white py-3 rounded-md font-semibold hover:bg-gtac-700 transition"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>

                    {/* Contact Info */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-2">Email</h4>
                                <a href="mailto:GTACINC2024@YAHOO.COM" className="text-gtac-600 hover:text-gtac-700">
                                    GTACINC2024@YAHOO.COM
                                </a>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-2">Phone</h4>
                                <a href="tel:+63495447609" className="text-gtac-600 hover:text-gtac-700 block">
                                    (049) 544-7609
                                </a>
                                <a href="tel:+639282084959" className="text-gtac-600 hover:text-gtac-700 block">
                                    0928-208-4959
                                </a>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-2">Address</h4>
                                <p className="text-gray-600">Phase 2, Lynville Subd.<br />Brgy. Bagumbayan, Santa Cruz, Laguna</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-2">Facebook</h4>
                                <a href="#" target="_blank" className="text-gtac-600 hover:text-gtac-700">
                                    GENESIS TAC
                                </a>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>

            {/* Location Section */}
            <section id="location" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 scroll-reveal">
                        <h2 className="text-4xl font-bold mb-4 text-gtac-600">Find Us</h2>
                        <p className="text-xl text-gray-600">Visit our school and experience our facilities</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Map */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
                                <iframe
                                    className="absolute inset-0 w-full h-full"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    src={`https://www.google.com/maps?q=${latitude},${longitude}&hl=en&z=14&output=embed`}
                                />
                            </div>
                        </div>

                        {/* Location Details */}
                        <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col justify-between">
                            <h3 className="text-2xl font-bold mb-6 text-gtac-600">Location Details</h3>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-semibold text-gray-700 mb-2">Training & Assessment Center, Inc.</h4>
                                    <p className="text-gray-600">Phase 2, Lynville Subd.<br />Brgy. Bagumbayan, Santa Cruz, Laguna</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-700 mb-2">Contact Information</h4>
                                    <div className="flex items-center gap-2 justify-between">
                                    <div>
                                    <p className="text-gray-600 mb-1">📞 (049) 544-7609</p>
                                    <p className="text-gray-600 mb-1">📱 0928-208-4959</p>
                                    </div>
                                    <div>

                                    <p className="text-gray-600 mb-1">✉️ GTACINC2024@YAHOO.COM</p>
                                    <p className="text-gtac-600 mt-2">📘 Facebook: GENESIS TAC</p>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8">
                                <a
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gtac-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-gtac-700 transition inline-block"
                                >
                                    Get Directions
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}

import MainLayout from '../Layouts/MainLayout';
import { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';

export default function Home({ homePage, courses, galleryImages, vision, mission, about, teamMembers, homeSettings, latitude, longitude, address }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const { flash } = usePage().props;
    
    // Default settings if not provided
    const settings = homeSettings || {};

    // Contact form
    const { data: contactData, setData: setContactData, post: contactPost, processing: contactProcessing, errors: contactErrors, reset: contactReset } = useForm({
        email: '',
        has_driver_license: '',
        interested_course: '',
        full_name: '',
        contact_number: '',
        email_address: '',
        exact_address: '',
        civil_status: '',
        working_industry: '',
    });

    const handleContactSubmit = (e) => {
        e.preventDefault();
        contactPost('/contact', {
            preserveScroll: true,
            onSuccess: () => {
                contactReset();
            },
        });
    };

    // Helper function to format HTML content - handles malformed HTML and plain text
    const formatHtmlContent = (content) => {
        if (!content) return '';
        
        // Clean up the content
        let cleaned = content.trim();
        
        // If content already has proper HTML tags, return as is
        if (cleaned.includes('<p>') || cleaned.includes('<ul>') || cleaned.includes('<ol>') || cleaned.includes('<div>')) {
            // Fix orphaned closing tags at the start
            cleaned = cleaned.replace(/^<\/(p|div|span)>/gi, '');
            
            // Remove any orphaned closing tags that appear before opening tags
            cleaned = cleaned.replace(/<\/p>\s*(?=<p>)/gi, '');
            
            // Fix cases where there's text followed by </p> without opening <p>
            cleaned = cleaned.replace(/^([^<]+)<\/p>/g, '<p>$1</p>');
            
            return cleaned;
        }
        
        // If content has some HTML tags but not paragraphs, try to preserve structure
        if (cleaned.includes('<') && cleaned.includes('>')) {
            // Fix orphaned closing tags
            cleaned = cleaned.replace(/^<\/(p|div|span)>/gi, '');
            return cleaned;
        }
        
        // Plain text - wrap in paragraphs
        const paragraphs = cleaned.split(/\n\s*\n/).filter(p => p.trim());
        return paragraphs.map(p => `<p>${p.trim()}</p>`).join('');
    };

    return (
        <MainLayout>
            {/* Hero Section */}
            <section id="home" className="relative min-h-screen flex items-center justify-center text-white overflow-hidden parallax-section" style={{ backgroundImage: `url(${settings.hero_background_image || '/storage/images/homeBg.jpg'})`, backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat' }}>
                {/* Dark overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>
                
                <div className="absolute inset-0 opacity-10 parallax-bg">
                    <div className="absolute inset-0 bg-pattern opacity-30"></div>
                </div>
                <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-20 scroll-reveal">
                    <div className="animate-fade-in">
                        {/* Center Text */}
                        <div className="flex flex-col items-center mb-8 animate-slide-up">
                            <h1 className="text-6xl md:text-8xl lg:text-9xl xl:text-[9rem] font-black text-white mb-4 tracking-tight font-montserrat drop-shadow-2xl" 
                                style={{ 
                                    textShadow: '2px 2px 8px rgba(0,0,0,0.5), 0 0 30px rgba(55, 88, 74, 0.3)',
                                    letterSpacing: '-0.02em'
                                }}>
                                {settings.hero_title || 'GENESIS'}
                            </h1>
                            <div className="h-1 w-24 bg-gtac-400 mb-6 rounded-full"></div>
                            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-white/95 uppercase font-montserrat tracking-wider">
                                {settings.hero_subtitle || 'Training & Assessment Center Inc.'}
                            </h2>
                            { (settings.hero_tagline || '“Empowering Skills. Building Careers. Transforming Lives.”') && (
                                <p className="mt-0 text-base md:text-lg lg:text-xl text-white/90 italic max-w-3xl mx-auto font-light">
                                    {settings.hero_tagline || '“Empowering Skills. Building Careers. Transforming Lives.”'}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up delay-200 mt-8">
                            <a
                                href={settings.hero_button_1_link || '#courses'}
                                className="bg-white text-gtac-700 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gtac-50 hover:scale-105 transition-all duration-300 transform shadow-lg hover:shadow-xl font-montserrat"
                            >
                                {settings.hero_button_1_text || 'Explore Courses'}
                            </a>
                            <a
                                href={settings.hero_button_2_link || '#contact'}
                                className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-gtac-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-montserrat"
                            >
                                {settings.hero_button_2_text || 'Get In Touch'}
                            </a>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <svg className="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </section>

            {/* About Section */}
            {homePage && (
                <section id="about" className="pt-24 pb-14 bg-white scroll-reveal">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-5xl font-bold mb-4 text-gtac-700 font-montserrat">About Us</h2>
                            <div className="h-1 w-20 bg-gtac-600 mx-auto rounded-full"></div>
                        </div>
                        <div className="prose prose-lg max-w-7xl mx-auto text-gray-700 scroll-reveal  p-8 md:p-12" dangerouslySetInnerHTML={{ __html: formatHtmlContent(about.content) }}  />
                    </div>
                </section>
            )}

            {/* Team Section */}
            {teamMembers && teamMembers.length > 0 && (
                <section id="team" className="py-24 bg-gtac-50 to-white scroll-reveal">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Orange Banner Header */}
                        <div className="text-gtac-700 py-6 mb-8 rounded-t-2xl">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                                <h2 className="text-5xl font-bold mb-4 text-gtac-700 font-montserrat">Our Dedicated Team</h2>
                                <div className="h-1 w-20 bg-gtac-600 mx-auto rounded-full"></div>
                            </div>
                        </div>
                        
                        {/* Introductory Text */}
                        <div className="max-w-4xl mx-auto mb-12 text-center">
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Welcome to the heart of Genesis Training & Assessment Center Inc. (GTAC), where our commitment to excellence and passion for empowering individuals converge. Our team is dedicated to being the preferred choice for career development. Join us as we empower individuals, shaping futures, and bridging the gap between aspirations and achievements. Welcome to GTAC – where skills meet success.
                            </p>
                        </div>

                        {/* Team Members Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                            {teamMembers.map((member) => (
                                <div key={member.id} className="flex flex-col items-center text-center scroll-reveal">
                                    {/* Circular Profile Image */}
                                    <div className="mb-6 relative">
                                        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                            {member.image_path ? (
                                                <img 
                                                    src={member.image_path} 
                                                    alt={member.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gtac-200 flex items-center justify-center">
                                                    <span className="text-4xl font-bold text-gtac-600">
                                                        {member.name.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Member Info */}
                                    <div className="w-full">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2 font-montserrat">{member.name}</h3>
                                        {member.position && (
                                            <p className="text-lg text-gtac-600 font-semibold mb-3">{member.position}</p>
                                        )}
                                        {member.bio && (
                                            <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Courses Section */}
            <section id="courses" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 scroll-reveal">
                        <h2 className="text-5xl font-bold mb-4 text-gtac-700 font-montserrat">Our Courses</h2>
                        <div className="h-1 w-20 bg-gtac-600 mx-auto rounded-full mb-4"></div>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Discover our comprehensive range of courses designed to enhance your skills and advance your career</p>
                    </div>
                    {courses && courses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {courses.map((course) => (
                                <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 scroll-reveal border border-gray-100 group">
                                    {course.image_path && (
                                        <div className="w-full h-56 overflow-hidden bg-gray-200">
                                            <img 
                                                src={course.image_path} 
                                                alt={course.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                    )}
                                    <div className="p-6">
                                        {course.category && (
                                            <span className="inline-block bg-gtac-100 text-gtac-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                                                {course.category}
                                            </span>
                                        )}
                                        <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-gtac-700 transition-colors">{course.title}</h3>
                                        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{course.description}</p>
                                        <div className="space-y-2 mb-4">
                                            {course.level && (
                                                <p className="text-sm text-gray-600"><span className="font-semibold text-gtac-700">Level:</span> {course.level}</p>
                                            )}
                                            {course.duration && (
                                                <p className="text-sm text-gray-600"><span className="font-semibold text-gtac-700">Duration:</span> {course.duration}</p>
                                            )}
                                        </div>
                                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                            <span className="text-gtac-600 hover:text-gtac-700 font-semibold cursor-pointer flex items-center gap-2 group-hover:gap-3 transition-all">
                                                Learn More <span className="text-lg">→</span>
                                            </span>
                                            {course.brochure_path && (
                                                <a href={course.brochure_path} download className="text-sm text-gray-500 hover:text-gtac-600 transition-colors flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                    PDF
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-gray-50 rounded-2xl">
                            <p className="text-gray-500 text-lg">No courses available at the moment.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Core Values Section */}
            <section id="values" className="py-24 bg-gradient-to-b from-gtac-50 to-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-reveal">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold mb-4 text-gtac-700 font-montserrat">Core Values</h2>
                        <div className="h-1 w-20 bg-gtac-600 mx-auto rounded-full mb-4"></div>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">The principles that guide everything we do</p>
                    </div>
                    <div className="space-y-8">
                        {/* G - Growth */}
                        <div className="flex items-start gap-6 p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                            <div className="flex-shrink-0">
                                <div className="w-20 h-20 bg-gtac-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-12 h-12 text-gtac-600" fill="currentColor" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-3">
                                    <span className="text-5xl font-black text-gtac-600">{settings.value_g_letter || 'G'}</span>
                                    <span className="text-2xl font-bold text-gtac-700 font-montserrat">- {settings.value_g_title || 'Growth'}</span>
                                </div>
                                <p className="text-gray-600 text-lg leading-relaxed">{settings.value_g_description || 'We are committed to continuous learning and self-improvement to ensure professional and personal development for our trainees and staff.'}</p>
                            </div>
                        </div>

                        {/* E - Excellence */}
                        <div className="flex items-start gap-6 p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                            <div className="flex-shrink-0">
                                <div className="w-20 h-20 bg-gtac-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-12 h-12 text-gtac-600" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5q0 .807-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33 33 0 0 1 2.5.5m.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935m10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-3">
                                    <span className="text-5xl font-black text-gtac-600">{settings.value_e_letter || 'E'}</span>
                                    <span className="text-2xl font-bold text-gtac-700 font-montserrat">- {settings.value_e_title || 'Excellence'}</span>
                                </div>
                                <p className="text-gray-600 text-lg leading-relaxed">{settings.value_e_description || 'We uphold the highest standards in technical-vocational education, ensuring our graduates are well-equipped for success.'}</p>
                            </div>
                        </div>

                        {/* N - Nurturing */}
                        <div className="flex items-start gap-6 p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                            <div className="flex-shrink-0">
                                <div className="w-20 h-20 bg-gtac-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-12 h-12 text-gtac-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-3">
                                    <span className="text-5xl font-black text-gtac-600">{settings.value_n_letter || 'N'}</span>
                                    <span className="text-2xl font-bold text-gtac-700 font-montserrat">- {settings.value_n_title || 'Nurturing'}</span>
                                </div>
                                <p className="text-gray-600 text-lg leading-relaxed">{settings.value_n_description || 'We create a supportive and inclusive learning environment that fosters personal and career growth.'}</p>
                            </div>
                        </div>

                        {/* E - Empowerment */}
                        <div className="flex items-start gap-6 p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                            <div className="flex-shrink-0">
                                <div className="w-20 h-20 bg-gtac-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-12 h-12 text-gtac-600" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-3">
                                    <span className="text-5xl font-black text-gtac-600">{settings.value_e2_letter || 'E'}</span>
                                    <span className="text-2xl font-bold text-gtac-700 font-montserrat">- {settings.value_e2_title || 'Empowerment'}</span>
                                </div>
                                <p className="text-gray-600 text-lg leading-relaxed">{settings.value_e2_description || 'We equip individuals with the skills and confidence to achieve financial independence and career success.'}</p>
                            </div>
                        </div>

                        {/* S - Service */}
                        <div className="flex items-start gap-6 p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                            <div className="flex-shrink-0">
                                <div className="w-20 h-20 bg-gtac-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-12 h-12 text-gtac-600" fill="currentColor" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0m3.041 9a1 1 0 0 0-.946.674l-.172.499a1 1 0 0 1-.403.515l-.803.517a1 1 0 0 0-.458.84v.455a1 1 0 0 0 1 1h.257c.192 0 .38.055.542.16l.762.491a1 1 0 0 0 .282.123A7 7 0 0 0 14.82 9.57a1 1 0 0 0-.085-.061l-.315-.204a1 1 0 0 0-.977-.06l-.169.082a1 1 0 0 1-.742.051l-1.02-.33A1 1 0 0 0 11.205 9zm-5.832 2.655a.302.302 0 1 0-.298.52l.762.325.48.232A.386.386 0 1 0 6.321 12h-.417a.7.7 0 0 1-.418-.139zM8 1a7 7 0 0 0-6.387 9.864l.754-1.285a1 1 0 0 1 1.546-.225l1.074 1.005a.986.986 0 0 0 1.36-.011l.038-.037a.88.88 0 0 0 .26-.754c-.075-.549.37-1.035.92-1.1.728-.086 1.587-.324 1.728-.957.086-.386-.115-.83-.361-1.2-.208-.312 0-.8.374-.8.122 0 .24-.055.318-.15l.393-.474c.196-.237.49-.368.797-.403.554-.065 1.407-.277 1.582-.973.185-.731-.986-.944-.998-1.62A7 7 0 0 0 8 1m.524 8.963a.413.413 0 1 0-.783-.183v.028a.46.46 0 0 1-.137.326l-.113.107a.36.36 0 0 0 .5.518l.193-.187a.6.6 0 0 0 .12-.166zm3.374-4.444c-.252-.244-.681-.139-.931.107-.256.251-.578.406-.918.585-.338.177-.264.625.101.735a.48.48 0 0 0 .345-.027l1.278-.617a.484.484 0 0 0 .125-.783"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-3">
                                    <span className="text-5xl font-black text-gtac-600">{settings.value_s_letter || 'S'}</span>
                                    <span className="text-2xl font-bold text-gtac-700 font-montserrat">- {settings.value_s_title || 'Service'}</span>
                                </div>
                                <p className="text-gray-600 text-lg leading-relaxed">{settings.value_s_description || 'We are dedicated to making a positive impact on society by providing quality education that transforms lives.'}</p>
                            </div>
                        </div>

                        {/* I - Integrity */}
                        <div className="flex items-start gap-6 p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                            <div className="flex-shrink-0">
                                <div className="w-20 h-20 bg-gtac-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-12 h-12 text-gtac-600" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56"/>
                                    <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-3">
                                    <span className="text-5xl font-black text-gtac-600">{settings.value_i_letter || 'I'}</span>
                                    <span className="text-2xl font-bold text-gtac-700 font-montserrat">- {settings.value_i_title || 'Integrity'}</span>
                                </div>
                                <p className="text-gray-600 text-lg leading-relaxed">{settings.value_i_description || 'We operate with honesty, transparency, and accountability in all our dealings with students, partners, and stakeholders.'}</p>
                            </div>
                        </div>

                        {/* S - Sustainability */}
                        <div className="flex items-start gap-6 p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                            <div className="flex-shrink-0">
                                <div className="w-20 h-20 bg-gtac-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-12 h-12 text-gtac-600" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M9.302 1.256a1.5 1.5 0 0 0-2.604 0l-1.704 2.98a.5.5 0 0 0 .869.497l1.703-2.981a.5.5 0 0 1 .868 0l2.54 4.444-1.256-.337a.5.5 0 1 0-.26.966l2.415.647a.5.5 0 0 0 .613-.353l.647-2.415a.5.5 0 1 0-.966-.259l-.333 1.242zM2.973 7.773l-1.255.337a.5.5 0 1 1-.26-.966l2.416-.647a.5.5 0 0 1 .612.353l.647 2.415a.5.5 0 0 1-.966.259l-.333-1.242-2.545 4.454a.5.5 0 0 0 .434.748H5a.5.5 0 0 1 0 1H1.723A1.5 1.5 0 0 1 .421 12.24zm10.89 1.463a.5.5 0 1 0-.868.496l1.716 3.004a.5.5 0 0 1-.434.748h-5.57l.647-.646a.5.5 0 1 0-.708-.707l-1.5 1.5a.5.5 0 0 0 0 .707l1.5 1.5a.5.5 0 1 0 .708-.707l-.647-.647h5.57a1.5 1.5 0 0 0 1.302-2.244z"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-3">
                                    <span className="text-5xl font-black text-gtac-600">{settings.value_s2_letter || 'S'}</span>
                                    <span className="text-2xl font-bold text-gtac-700 font-montserrat">- {settings.value_s2_title || 'Sustainability'}</span>
                                </div>
                                <p className="text-gray-600 text-lg leading-relaxed">{settings.value_s2_description || 'We commit to sustainable practices in education and operations for a better tomorrow.'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section with Parallax */}
            <section id="gallery" className="relative py-24 bg-gradient-to-b from-gtac-600 to-gtac-700 text-white overflow-hidden parallax-section">
                <div className="absolute inset-0 bg-black/20 parallax-bg"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 scroll-reveal">
                        <h2 className="text-5xl font-bold mb-4 font-montserrat">Classroom Gallery</h2>
                        <div className="h-1 w-20 bg-white/80 mx-auto rounded-full mb-4"></div>
                        <p className="text-xl text-white/95 max-w-2xl mx-auto">Take a virtual tour of our facilities</p>
                    </div>
                    {galleryImages && galleryImages.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {galleryImages.map((image, index) => (
                                <div
                                    key={image.id}
                                    className="aspect-square overflow-hidden rounded-xl cursor-pointer transform hover:scale-110 transition-all duration-500 shadow-xl hover:shadow-2xl group border-2 border-white/20 hover:border-white/50"
                                    onClick={() => setSelectedImage(image)}
                                >
                                    <img
                                        src={image.image_path}
                                        alt={image.title || 'Gallery image'}
                                        className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white/10 rounded-2xl backdrop-blur-sm">
                            <p className="text-white/90 text-lg">No gallery images available at the moment.</p>
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
            <section id="vision-mission" className="py-24 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-reveal">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold mb-4 text-gtac-700 font-montserrat">Vision & Mission</h2>
                        <div className="h-1 w-20 bg-gtac-600 mx-auto rounded-full mb-4"></div>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Our commitment to excellence and service</p>
                    </div>
                    
                    {/* About */}
                    {/* {about && (
                        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8 border border-gray-100">
                            <h2 className="text-3xl font-bold mb-6 text-gtac-700 font-montserrat">About Us</h2>
                            <div className="prose prose-lg max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: formatHtmlContent(about.content) }} />
                        </div>
                    )} */}

                    {/* Vision */}
                    {vision && (
                        <div className="bg-gradient-to-br from-gtac-50 to-gtac-100 rounded-2xl shadow-xl p-8 md:p-12 mb-8 border border-gtac-200">
                            <h2 className="text-3xl font-bold mb-6 text-gtac-700 font-montserrat">Our Vision</h2>
                            <div className="prose prose-lg max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: formatHtmlContent(vision.content) }} />
                        </div>
                    )}

                    {/* Mission */}
                    {mission && (
                        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
                            <h2 className="text-3xl font-bold mb-6 text-gtac-700 font-montserrat">Our Mission</h2>
                            <div className="prose prose-lg max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: formatHtmlContent(mission.content) }} />
                        </div>
                    )}

                    {!vision && !mission && !about && (
                        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                            <p className="text-gray-500 text-lg">Content will be added soon.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 bg-gtac-50 to-white test">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 scroll-reveal">
                        <h2 className="text-5xl font-bold mb-4 text-gtac-700 font-montserrat">Contact Us</h2>
                        <div className="h-1 w-20 bg-gtac-600 mx-auto rounded-full mb-4"></div>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">We'd love to hear from you. Get in touch with us today!</p>
                    </div>
                    <div className="max-w-7xl mx-auto">
                        {/* Contact Form */}
                        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 scroll-reveal border border-gray-100">
                            <h3 className="text-2xl font-bold mb-6 text-gtac-700 font-montserrat">Enrollment Inquiry</h3>
                            
                            {flash?.success && (
                                <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                                    {flash.success}
                                </div>
                            )}

                            <form onSubmit={handleContactSubmit} className="space-y-5">
                                {/* Top Section - Email, Driver's License, Course */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
                                        <input
                                            type="email"
                                            required
                                            value={contactData.email}
                                            onChange={(e) => setContactData('email', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gtac-500 focus:border-gtac-500 transition-all"
                                            placeholder="your.email@example.com"
                                        />
                                        {contactErrors.email && <div className="text-red-500 text-sm mt-1">{contactErrors.email}</div>}
                                    </div>

                                    {/* Course Selection */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Interested Course <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={contactData.interested_course}
                                            onChange={(e) => setContactData('interested_course', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gtac-500 focus:border-gtac-500 transition-all"
                                            required
                                        >
                                            <option value="">Select a course</option>
                                            <option value="Caregiving-Elderly NCII">Caregiving-Elderly NCII</option>
                                            <option value="HEO-Forklift NCII">HEO-Forklift NCII</option>
                                            <option value="Computer Systems Servicing NCII">Computer Systems Servicing NCII</option>
                                            <option value="Content Creation">Content Creation</option>
                                            <option value="Bread and Pastry Production NCII">Bread and Pastry Production NCII</option>
                                        </select>
                                        {contactErrors.interested_course && <div className="text-red-500 text-sm mt-1">{contactErrors.interested_course}</div>}
                                    </div>
                                    {/* Driver's License */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Do you have a valid driver's license? <span className="text-red-500">*</span>
                                        </label>
                                        <div className="flex gap-4 mt-3">
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="has_driver_license"
                                                    value="yes"
                                                    checked={contactData.has_driver_license === 'yes'}
                                                    onChange={(e) => setContactData('has_driver_license', e.target.value)}
                                                    className="mr-2"
                                                    required
                                                />
                                                <span className="text-gray-700">Yes</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="has_driver_license"
                                                    value="no"
                                                    checked={contactData.has_driver_license === 'no'}
                                                    onChange={(e) => setContactData('has_driver_license', e.target.value)}
                                                    className="mr-2"
                                                    required
                                                />
                                                <span className="text-gray-700">No</span>
                                            </label>
                                        </div>
                                        {contactErrors.has_driver_license && <div className="text-red-500 text-sm mt-1">{contactErrors.has_driver_license}</div>}
                                    </div>
                                </div>

                                {/* Personal Information Section */}
                                <div className="border-t border-gray-300 pt-6 mt-6">
                                    <h3 className="text-xl font-bold mb-4 text-gtac-700">Personal Information</h3>

                                    {/* Row 1: Full Name and Contact Number */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        {/* Full Name */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                FULL NAME (Name, Middle Name, Surname) <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={contactData.full_name}
                                                onChange={(e) => setContactData('full_name', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gtac-500 focus:border-gtac-500 transition-all"
                                                placeholder="First Middle Last Name"
                                            />
                                            {contactErrors.full_name && <div className="text-red-500 text-sm mt-1">{contactErrors.full_name}</div>}
                                        </div>

                                        {/* Contact Number */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                CONTACT NO. <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                value={contactData.contact_number}
                                                onChange={(e) => setContactData('contact_number', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gtac-500 focus:border-gtac-500 transition-all"
                                                placeholder="09XX-XXX-XXXX"
                                            />
                                            {contactErrors.contact_number && <div className="text-red-500 text-sm mt-1">{contactErrors.contact_number}</div>}
                                        </div>
                                    </div>

                                    {/* Row 2: Civil Status */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        {/* Civil Status */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                CIVIL STATUS <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                required
                                                value={contactData.civil_status}
                                                onChange={(e) => setContactData('civil_status', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gtac-500 focus:border-gtac-500 transition-all"
                                            >
                                                <option value="">Select Civil Status</option>
                                                <option value="Single">Single</option>
                                                <option value="Married">Married</option>
                                                <option value="Widowed">Widowed</option>
                                                <option value="Divorced">Divorced</option>
                                                <option value="Separated">Separated</option>
                                            </select>
                                            {contactErrors.civil_status && <div className="text-red-500 text-sm mt-1">{contactErrors.civil_status}</div>}
                                        </div>
                                        {/* Working Industry/Experience */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                WORKING INDUSTRY/WORKING EXPERIENCE <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={contactData.working_industry}
                                                onChange={(e) => setContactData('working_industry', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gtac-500 focus:border-gtac-500 transition-all"
                                                placeholder="e.g., IT, Healthcare, Education, etc."
                                            />
                                            {contactErrors.working_industry && <div className="text-red-500 text-sm mt-1">{contactErrors.working_industry}</div>}
                                        </div>
                                    </div>

                                    {/* Row 3: Exact Address and Working Industry */}
                                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">
                                        {/* Exact Address */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                EXACT ADDRESS <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                rows="1"
                                                required
                                                value={contactData.exact_address}
                                                onChange={(e) => setContactData('exact_address', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gtac-500 focus:border-gtac-500 transition-all resize-none"
                                                placeholder="Street, Barangay, City, Province"
                                            />
                                            {contactErrors.exact_address && <div className="text-red-500 text-sm mt-1">{contactErrors.exact_address}</div>}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={contactProcessing}
                                        className="bg-gtac-600 w-full md:w-auto text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-gtac-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {contactProcessing ? 'Submitting...' : 'Submit Inquiry'}
                                    </button>
                                </div>
                            </form>
                        </div>

                    {/* Contact Info */}
                    {/* <div className="bg-gradient-to-br from-gtac-50 to-white rounded-2xl shadow-xl p-8 md:p-10 border border-gtac-100">
                        <h3 className="text-2xl font-bold mb-6 text-gtac-700 font-montserrat">Get in Touch</h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-gtac-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-gtac-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-700 mb-1">Email</h4>
                                    <a href={`mailto:${settings.contact_email || 'GTACINC2024@YAHOO.COM'}`} className="text-gtac-600 hover:text-gtac-700 transition-colors">
                                        {settings.contact_email || 'GTACINC2024@YAHOO.COM'}
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-gtac-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-gtac-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-700 mb-2">Phone</h4>
                                    {settings.contact_phone_1 && (
                                        <a href={`tel:${settings.contact_phone_1.replace(/\D/g, '')}`} className="text-gtac-600 hover:text-gtac-700 block transition-colors">
                                            {settings.contact_phone_1}
                                        </a>
                                    )}
                                    {settings.contact_phone_2 && (
                                        <a href={`tel:${settings.contact_phone_2.replace(/\D/g, '')}`} className="text-gtac-600 hover:text-gtac-700 block transition-colors">
                                            {settings.contact_phone_2}
                                        </a>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-gtac-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-gtac-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-700 mb-2">Address</h4>
                                    <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: settings.contact_address || 'Phase 2, Lynville Subd.<br />Brgy. Bagumbayan, Santa Cruz, Laguna' }} />
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-gtac-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-gtac-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-700 mb-2">Facebook</h4>
                                    <a href={settings.contact_facebook_url || '#'} target="_blank" rel="noopener noreferrer" className="text-gtac-600 hover:text-gtac-700 transition-colors">
                                        {settings.contact_facebook || 'GENESIS TAC'}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    </div>
                </div>
            </section>

            {/* Location Section */}
            <section id="location" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 scroll-reveal">
                        <h2 className="text-5xl font-bold mb-4 text-gtac-700 font-montserrat">Find Us</h2>
                        <div className="h-1 w-20 bg-gtac-600 mx-auto rounded-full mb-4"></div>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Visit our school and experience our facilities</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Map */}
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-2xl">
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
                        <div className="bg-gradient-to-br from-gtac-50 to-white rounded-2xl shadow-xl p-8 md:p-10 flex flex-col justify-between border border-gtac-100">
                            <h3 className="text-2xl font-bold mb-6 text-gtac-700 font-montserrat">Location Details</h3>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-semibold text-gray-700 mb-2">Training & Assessment Center, Inc.</h4>
                                    <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: settings.location_address || 'Phase 2, Lynville Subd.<br />Brgy. Bagumbayan, Santa Cruz, Laguna' }} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-700 mb-2">Contact Information</h4>
                                    <div className="flex items-center gap-2 justify-between">
                                    <div>
                                    {settings.contact_phone_1 && <p className="text-gray-600 mb-1">📞 {settings.contact_phone_1}</p>}
                                    {settings.contact_phone_2 && <p className="text-gray-600 mb-1">📱 {settings.contact_phone_2}</p>}
                                    </div>
                                    <div>

                                    {settings.contact_email && <p className="text-gray-600 mb-1">✉️ {settings.contact_email}</p>}
                                    {settings.contact_facebook && <p className="text-gtac-600 mt-2">📘 Facebook: {settings.contact_facebook}</p>}
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8">
                                <a
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gtac-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gtac-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-flex items-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                    </svg>
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

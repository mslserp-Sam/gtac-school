import MainLayout from '../Layouts/MainLayout';

export default function VisionMission({ vision, mission, about }) {
    return (
        <MainLayout>
            <div className="bg-gradient-to-r from-gtac-600 to-gtac-700 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-4">Our Vision & Mission</h1>
                    <p className="text-xl text-white/90">
                        Building a brighter future through quality education and continuous innovation.
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* About Section */}
                {about && (
                    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                        <h2 className="text-3xl font-bold mb-6 text-gtac-600">About Us</h2>
                        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: about.content }} />
                    </div>
                )}

                {/* Vision Section */}
                {vision && (
                    <div className="bg-gtac-50 rounded-lg shadow-lg p-8 mb-8">
                        <h2 className="text-3xl font-bold mb-6 text-gtac-600">Our Vision</h2>
                        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: vision.content }} />
                    </div>
                )}

                {/* Mission Section */}
                {mission && (
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-3xl font-bold mb-6 text-gtac-600">Our Mission</h2>
                        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: mission.content }} />
                    </div>
                )}

                {/* Default content if no data */}
                {!vision && !mission && !about && (
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                        <p className="text-gray-500 text-lg">Content will be added soon.</p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}


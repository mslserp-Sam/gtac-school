import MainLayout from '../Layouts/MainLayout';

export default function Location({ latitude, longitude, address }) {
    const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&hl=en&z=14&output=embed`;

    return (
        <MainLayout>
            <div className="bg-gradient-to-r from-gtac-600 to-gtac-700 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-4">Find Us</h1>
                    <p className="text-xl text-white/90">
                        Visit our school and experience our facilities first-hand.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Map */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <iframe
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            src={mapUrl}
                        />
                    </div>

                    {/* Location Details */}
                        <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-bold mb-6 text-gtac-600">Location Details</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-2">Address</h3>
                                <p className="text-gray-600">{address}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-2">Coordinates</h3>
                                <p className="text-gray-600">Lat: {latitude}, Long: {longitude}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-2">Hours</h3>
                                <p className="text-gray-600">Monday - Friday: 8:00 AM - 5:00 PM</p>
                                <p className="text-gray-600">Saturday: 9:00 AM - 1:00 PM</p>
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
        </MainLayout>
    );
}


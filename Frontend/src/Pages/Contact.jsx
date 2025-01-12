import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import RegisterHead from "../Components/Header/RegisterHeader/RegisterHead";
import RegisterFooter from "../Components/Footer/RegisterFooter";

function Contact() {
    const locations = [
      {
        city: "Manjeri",
        title: "Way To Nikah, First Floor",
        building: "Peacock Building",
        address: "Near Government Hospital, Kacheripadi",
        location: "Manjeri, Kerala, India",
        call: "Call: 9714545490",
      },
      {
        city: "Chavakkad",
        title: "Way To Nikah, 15/210, Budha Complex",
        building: "Above Catholic Syrian Bank",
        address: "Bypass Road, Chavakkad, Thrissur, Kerala, India",
        call: "Call: 8943544445",
      },
      {
        city: "Palakkad",
        title: "Way To Nikah, 21/845,First Floor",
        building: "Pearl Complex,Near Hanafi Juma Masjid",
        address: "Coimbatore Road,Kallekkuthupalam, Palakkad -678001",
        call: "Mob: 7592881100",
      },
    ];
  
    return (
      <div className="flex flex-col min-h-screen">
        <div>
          <RegisterHead />
        </div>
        <div className="flex-grow bg-gradient-to-b from-primary">
          <main className="container mx-auto px-4 py-12">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold text-white mb-8">
                Our Locations
              </h1>
  
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {locations.map((location, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm border border-green-100 p-6 hover:shadow-md transition-shadow"
                  >
                    <h2 className="text-xl font-semibold text-green-800 mb-2">
                      {location.city}
                    </h2>
                    <div className="space-y-2 text-gray-600">
                      <p className="font-medium">{location.title}</p>
                      <p>{location.building}</p>
                      <p>{location.address}</p>
                      <p className="text-green-600">{location.call}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
        <div className="mt-auto">
          <RegisterFooter />
        </div>
      </div>
    );
  }
  
  export default Contact;
  
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import RegisterHead from "../Components/Header/RegisterHeader/RegisterHead";
import RegisterFooter from "../Components/Footer/RegisterFooter";

export default function AboutUs() {
  return (
    <>
      <div>
        <RegisterHead />
      </div>
      <div className="w-full min-h-screen bg-gradient-to-b from-primary">
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-white  mb-6">About Us</h1>
            <div className="space-y-4">
              <p className="text-white">
                WaytoNikah.com is a premium matrimonial website for global
                Muslims. Our aim is to help Muslims to find their suitable life
                partner in an Islamic way. We do not support anything that's not
                Halal in Islam so WaytoNikah.com is not a dating portal at all.
                Only matured Muslim men and women with an intention of marriage
                are allowed to register at WaytoNikah.com.
              </p>
              <p className="text-white">
                We are among the most trustworthy and technically advanced
                matrimonial portals. WaytoNikah.com will make your matrimonial
                searches and online-match making a simple, easy and happy
                experience. No wonder as the number of memberships of
                WaytoNikah.com is greatly increasing day by day.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-green-100 p-6">
              <h2 className="text-xl font-semibold  mb-4">
                Highlights of WaytoNikah.com
              </h2>
              <ul className="space-y-3">
                {[
                  "Global and wide set of profiles",
                  "Free and easy profile registration",
                  "Registered profiles are manually screened or validated to ensure that they meet the norms of our site",
                  "Email & mobile alerts when members contact each other",
                  "Safe and secure site. 100% privacy guaranteed",
                ].map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
        <RegisterFooter/>

      </div>
    </>
  );
}

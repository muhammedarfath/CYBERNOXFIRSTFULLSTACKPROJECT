import React from "react";
import provide1 from "../../../assets/Chating Icon.png";
import provide2 from "../../../assets/Customer Service Icon.png";
import provide3 from "../../../assets/Verified Icon (1).png";
import provide4 from "../../../assets/User Add Icon.png";
import provide5 from "../../../assets/Local Search Icon.png";
import provide6 from "../../../assets/Notification Icon.png";


function OurServicesCard() {
  return (
    <div className="lg:w-1/2 flex justify-center text-white">
      <div className="flex flex-col gap-6 w-full">
        <div className="relative bg-gray-200 text-gray-800 rounded-lg shadow-xl border border-gray-300 max-w-full overflow-hidden">
          <div className="flex items-center p-4">
            <img
              className="object-cover w-12 h-12 rounded-lg"
              src={provide4}
              alt="Best Matches"
            />
            <div className="ml-3 overflow-hidden">
              <p className="font-medium text-gray-900 text-sm sm:text-base">
                Best Matches
              </p>
              <p className="max-w-xs text-sm text-gray-500 truncate">
                We connect you with the best possible matches based on your
                preferences and interests, making your experience truly
                tailored.
              </p>
            </div>
          </div>
        </div>

        <div className="relative bg-gray-200 text-gray-800 rounded-lg shadow-xl border border-gray-300 max-w-full overflow-hidden">
          <div className="flex items-center p-4">
            <img
              className="object-cover w-12 h-12 rounded-lg"
              src={provide2}
              alt="24/7 Customer Service"
            />
            <div className="ml-3 overflow-hidden">
              <p className="font-medium text-gray-900 text-sm sm:text-base">
                24/7 Customer Service
              </p>
              <p className="max-w-xs text-sm text-gray-500 truncate">
                Our dedicated customer service team is available around the
                clock to assist you with any questions or concerns you may have.
              </p>
            </div>
          </div>
        </div>

        <div className="relative bg-gray-200 text-gray-800 rounded-lg shadow-xl border border-gray-300 max-w-full overflow-hidden">
          <div className="flex items-center p-4">
            <img
              className="object-cover w-12 h-12 rounded-lg"
              src={provide3}
              alt="Genuine Contacts"
            />
            <div className="ml-3 overflow-hidden">
              <p className="font-medium text-gray-900 text-sm sm:text-base">
                Genuine Contacts
              </p>
              <p className="max-w-xs text-sm text-gray-500 truncate">
                Connect with authentic individuals who share your values and
                interests. Our platform ensures genuine profiles and
                interactions.
              </p>
            </div>
          </div>
        </div>

        <div className="relative bg-gray-200 text-gray-800 rounded-lg shadow-xl border border-gray-300 max-w-full overflow-hidden">
          <div className="flex items-center p-4">
            <img
              className="object-cover w-12 h-12 rounded-lg"
              src={provide1}
              alt="Easy Communication"
            />
            <div className="ml-3 overflow-hidden">
              <p className="font-medium text-gray-900 text-sm sm:text-base">
                Easy Communication
              </p>
              <p className="max-w-xs text-sm text-gray-500 truncate">
                Stay in touch easily with our intuitive messaging system,
                designed to make communication with your matches effortless and
                smooth.
              </p>
            </div>
          </div>
        </div>

        <div className="relative bg-gray-200 text-gray-800 rounded-lg shadow-xl border border-gray-300 max-w-full overflow-hidden">
          <div className="flex items-center p-4">
            <img
              className="object-cover w-12 h-12 rounded-lg"
              src={provide5}
              alt="Local Search"
            />
            <div className="ml-3 overflow-hidden">
              <p className="font-medium text-gray-900 text-sm sm:text-base">
                Local Search
              </p>
              <p className="max-w-xs text-sm text-gray-500 truncate">
                Easily find and connect with people in your area using our
                localized search feature, ensuring you're always in touch with
                nearby users.
              </p>
            </div>
          </div>
        </div>

        <div className="relative bg-gray-200 text-gray-800 rounded-lg shadow-xl border border-gray-300 max-w-full overflow-hidden">
          <div className="flex items-center p-4">
            <img
              className="object-cover w-12 h-12 rounded-lg"
              src={provide6}
              alt="Notification Alert"
            />
            <div className="ml-3 overflow-hidden">
              <p className="font-medium text-gray-900 text-sm sm:text-base">
                Notification Alert
              </p>
              <p className="max-w-xs text-sm text-gray-500 truncate">
                Receive real-time notifications about important activities, so
                you never miss an update or interaction on your profile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurServicesCard;

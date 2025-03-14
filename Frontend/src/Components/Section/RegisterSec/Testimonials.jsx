import { useState } from "react";
import { FaStar, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import mycom from "../../../assets/logo PNG M.png";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      couple: "ZOYA & UMAR",
      image: mycom,
      text: `"My journey with Nikah Forever was just amazing and finally, I met my Mr. Perfect in the way I wanted him and now I'm living my married life happily. I'm so thankful to Nikah forever and the team who are doing such a great job and I do appreciate you!"`,
    },
    {
      id: 2,
      couple: "HASHIM & HIBA",
      image: mycom,
      text: `"As parents, we were looking for a trustworthy matrimonial company to help find a suitable match for our daughter. Nikah Forever exceeded our expectations with their personalized approach and understanding of our family's values."`,
    },
    {
      id: 3,
      couple: "ALBINA & SAMAD",
      image: mycom,
      text: `"Alhamdulilah we are so happy with this platform. She is also very happy in her life so I suggest each and every person trust this platform tysm nikahforever.com"`,
    },
    {
      id: 4,
      couple: "RIZWAN & FATIMA",
      image: mycom,
      text: `"Thank you Nikah Forever for helping me find the perfect match. This platform is truly a blessing for those looking for a partner with shared values."`,
    },
    {
      id: 5,
      couple: "AHMED & AISHA",
      image: mycom,
      text: `"We were hesitant at first, but Nikah Forever made everything so easy and comfortable. Truly grateful for their support and dedication."`,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= testimonials.length ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-16 px-4 relative">
      <h2 className="text-center text-4xl font-bold mb-12 text-[#444444]">
        WHAT PEOPLE ARE SAYING
      </h2>
      <div className="relative max-w-7xl mx-auto overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${(currentIndex * 100) / (window.innerWidth < 768 ? 1 : 2)}%)`,
          }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4 text-center"
            >
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden">
                    <img
                      src={testimonial.image}
                      alt={`${testimonial.couple}'s photo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="w-5 h-5 text-black" />
                  ))}
                </div>
                <h3 className="text-gray-600 font-medium mb-4">
                  – {testimonial.couple}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {testimonial.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-button p-4 rounded-full shadow-lg hover:bg-[#ff8787] transition"
        >
          <FaChevronLeft className="text-white w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-button p-4 rounded-full shadow-lg hover:bg-[#ff8787] transition"
        >
          <FaChevronRight className="text-white w-5 h-5" />
        </button>
      </div>
    </section>
  );
}

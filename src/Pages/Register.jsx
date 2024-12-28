import { AnimatedTestimonials } from "../Components/ui/animated-testimonials";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import RegisterFooter from "../Components/Footer/RegisterFooter";
import RegisterHead from "../Components/Header/RegisterHeader/RegisterHead";
import RegisterForm from "../Components/Section/RegisterSec/RegisterForm";
import FindUs from "../Components/Section/RegisterSec/FindUs";
import OurServices from "../Components/Section/RegisterSec/OurServices";
import TeamInfo from "../Components/Section/RegisterSec/TeamInfo";
import WhyChoose from "../Components/Section/RegisterSec/WhyChoose";

export function Register() {
  const testimonials = [
    {
      src: "https://i.pinimg.com/736x/cc/ad/32/ccad32362b224d1351d2063ee1fa224d.jpg",
    },
    {
      src: "	https://i.pinimg.com/736x/92/50/ed/9250ed2b94920b019e53b6688e1f4704.jpg",
    },
    {
      src: "	https://i.pinimg.com/736x/0a/83/df/0a83df03f7d50d00851d287f786f5bab.jpg",
    },
    {
      src: "	https://i.pinimg.com/736x/9f/1a/07/9f1a07710169640ab453ac2aeaffdcfe.jpg",
    },
    {
      src: "	https://i.pinimg.com/736x/43/4f/7e/434f7eba9de37100bc0b6c2add9f2192.jpg",
    },
  ];
  return (
    <div>
      <div className="">
        <RegisterHead />
      </div>
      <div className="h-full w-full bg-gradient-to-b from-primary p-5 rounded-b-full">
        <div className="flex lg:flex-row flex-col">
          <div className="lg:w-1/2 w-full flex items-center justify-center">
            <div className="w-full">
              <AnimatedTestimonials
                testimonials={testimonials}
                autoplay={true}
              />
            </div>
          </div>
          <div className="lg:w-1/2 w-full flex items-center justify-center">
            <RegisterForm />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold md:text-7xl text-4xl text-center p-11 text-[#444444]">
            India's Best Matrimony <br /> Website
          </h1>
          <div className="border rounded-full p-2 border-[#444444]">
            <MdKeyboardDoubleArrowDown className="text-7xl text-[#444444]" />
          </div>
        </div>
      </div>
      <FindUs />
      <OurServices />
      <TeamInfo />
      <WhyChoose />
      <RegisterFooter />
    </div>
  );
}

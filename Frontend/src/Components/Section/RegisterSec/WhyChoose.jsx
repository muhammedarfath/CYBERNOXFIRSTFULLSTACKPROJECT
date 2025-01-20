import React from "react";

function WhyChoose() {
  return (
    <div className="p-8 w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-col gap-9 text-center">
        <h1 className="font-extrabold text-3xl ">
          Why Choose [Your Matrimony Name]?
        </h1>

        <div className="container mx-auto md:w-[80rem] w-[20rem] p-2">
          <p className="text-lg leading-relaxed">
            At [Your Matrimony Name], we aim to create meaningful connections
            that last a lifetime. With advanced matchmaking algorithms, verified
            profiles, and a commitment to security, we make finding your perfect
            match easier and safer. Whether you're looking for someone who
            shares your interests, values, or cultural background, we are here
            to help you every step of the way.
            <br />
            <br />
            Our service is designed with a personal touch, ensuring each user
            feels valued and supported. From Aadhar-based OTP verification for
            profile authenticity to 24/7 customer support, we strive to make
            your journey special and stress-free. Join thousands of happy
            couples who found their forever partner with us.
          </p>
        </div>
      </div>
    </div>
  );
}

export default WhyChoose;

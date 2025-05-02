import React from "react";

const ScreenPage: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center   lg:min-h-[100vh] md:min-h-[80vh]  min-h-[50vh] top-[80px]  text-white px-4 overflow-hidden">
      {/* Background video for desktop */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="    absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="https://supreme-group.vercel.app/static/media/automotive.224e7418884105595114.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      

      {/* Static image fallback for mobile */}
      <div
        className="block md:hidden absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/path-to-mobile-fallback.jpg')" }}
      ></div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

      {/* Text content */}
      <div className="relative z-10 text-center">
        <p className="lg:text-[22px] md:text-[19px] sm:text-[16px] font-[400] text-white mb-[40px]">Performance in motion</p>
        <h1 className=" lg:text-[48px] md:text-[39px] text-[35px] font-semibold mt-2">
          Soft Trims and <span className="text-[#00bfff] " > NVH Solutions</span>
        </h1>
        <p className="lg:text-[48px] md:text-[39px] text-[35px] text-white mt-2">
          for seamless rides
        </p>
      </div>
    </div>
  );
};
 
export default ScreenPage;

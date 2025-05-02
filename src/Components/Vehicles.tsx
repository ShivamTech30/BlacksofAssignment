import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from "react-transition-group"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import images used for both tab thumbnails and main display
import completeBody from '../assets/MainTruck.png'; // Main image for commercial complete body
import passengerBody from '../assets/Passenger.png'; // Main image for passenger complete body
// import front from '../assets/Front.png'; // Unused but kept for potential expansion
import cabin from '../assets/Cabin.png'; // Cabin image for commercial
// import trunk from '../assets/Trunk.png'; // Trunk image used as engine for commercial
// import exterior from '../assets/Exterior.png'; // Unused but kept for potential expansion
import engine from '../assets/Trunk.png'; // Engine image (reuses Trunk.png)

// Define the structure of image data used in arrays
interface ImageData {
  id: string; // Unique identifier for each image
  title: string; // Display title for the image
  tabImage: string; // Thumbnail image for tab navigation
  image: string; // Main image to display
}

// Main component for the image slider
const ImageSlider: React.FC = () => {
  // State to track the active passenger image index
  const [activePassengerIndex, setActivePassengerIndex] = useState<number>(0);
  // State to track the active commercial image index
  const [activeCommercialIndex, setActiveCommercialIndex] = useState<number>(0);
  // State to store the ScrollTrigger instance for controlling scroll animations
  const [scrollTrigger, setScrollTrigger] = useState<ScrollTrigger | null>(null);
  // State to determine if the viewport is desktop-sized (>= 1024px)
  const [isDesktop] = useState<boolean>(window.innerWidth >= 1024);
  // State to toggle between passenger (0) and commercial (1) image sets
  const [imageSlideIndex, setImageSlideIndex] = useState<number>(0);

  // Refs to access the DOM elements of the passenger and commercial images
  const passengerImageRef = useRef<HTMLImageElement>(null);
  const commercialImageRef = useRef<HTMLImageElement>(null);
  // Ref to the section element that ScrollTrigger will pin and animate
  const sectionRef = useRef<HTMLElement>(null);

  // Array of passenger vehicle images (currently only one item)
  const passengerImages: ImageData[] = [
    { id: '4', title: 'Complete Body', tabImage: passengerBody, image: passengerBody },
    // { id: '2', title: 'Front', tabImage: front, image: front },
    // { id: '3', title: 'Cabin', tabImage: cabin, image: cabin },
    // { id: '4', title: 'Trunk', tabImage: trunk, image: trunk },
    // { id: '5', title: 'Exterior', tabImage: exterior, image: exterior },
  ];

  // Array of commercial vehicle images
  const commercialImages: ImageData[] = [
    { id: '1', title: 'Complete Body', tabImage: completeBody, image: completeBody },
    { id: '2', title: 'Engine', tabImage: engine, image: engine },
    { id: '3', title: 'Cabin', tabImage: cabin, image: cabin },
  ];

  // Effect to set up GSAP animations and ScrollTrigger on desktop view
  useEffect(() => {
    if (isDesktop) {
      // Register ScrollTrigger plugin with GSAP
      gsap.registerPlugin(ScrollTrigger);

      // Create a GSAP context scoped to sectionRef for cleanup
      const ctx = gsap.context(() => {
        // Define the animation timeline, initially paused
        const tl = gsap.timeline({ paused: true });

        // Animation sequence: Start with passenger images visible and static
        tl.from('.animated-heading', {
          y: '30vh', // Move heading up from 30% of viewport height
          duration: 2,
          ease: 'easeInOut',
        })
          .from('.slider-parent', {
            y: '40vh', // Move slider bar up from 40% of viewport height
            opacity: 1, // Start fully visible
            duration: 2.5,
            ease: 'easeInOut',
          }, 0.5) // Start 0.5s after previous animation
          .from('.card-details-1', {
            y: '40vh', // Animate passenger card up
            opacity: 0,
            duration: 2,
            ease: 'easeInOut',
          }, 0.7)
          .from('.card-details-2', {
            y: '40vh', // Animate commercial card up (initially hidden)
            opacity: 0,
            duration: 2,
            ease: 'easeInOut',
          }, 0.8)
          .from('.image-slide-1', {
            y: '50vh', // Animate passenger image up and stay visible
            opacity: 0,
            duration: 2,
            ease: 'easeInOut',
          }, 1.1)
          .from('.controls-slide-1', {
            y: 50, // Animate passenger tabs up
            opacity: 0,
            duration: 2,
            ease: 'easeInOut',
          }, 2)
          .addLabel('passengerStatic', 4.1) // Label where passenger images stay static
          .addLabel('commercialStart', 12) // Label for commercial section start
          .to('.image-slide-1', {
            y: -100, // Move passenger image up and out when scrolling to commercial
            opacity: 0,
            scale: 0.5,
            duration: 3,
            ease: 'easeInOut',
            onUpdate: () => setImageSlideIndex(0), // Ensure passenger view (though transitioning out)
          }, 'commercialStart')
          .to('.controls-slide-1', {
            y: 100, // Move passenger tabs down and out
            opacity: 0,
            duration: 1,
            ease: 'easeInOut',
          }, 'commercialStart+=0.5')
          .to('.image-slide-2', {
            top: -20, // Move commercial image into view
            opacity: 1,
            scale: 1,
            duration: 4,
            ease: 'easeInOut',
            onUpdate: () => {
              setImageSlideIndex(1); // Switch to commercial view
              setActiveCommercialIndex(0); // Default to first commercial image
            },
          }, 'commercialStart')
          .to('.card-details-1', {
            opacity: 0.2, // Fade out passenger card
            duration: 2,
            ease: 'easeInOut',
          }, 'commercialStart+=0.5')
          .to('.slider-height', {
            y: '100%', // Extend slider bar to full height
            duration: 2,
            ease: 'easeInOut',
          }, 'commercialStart+=0.5')
          .to('.card-details-2', {
            opacity: 1, // Fade in commercial card
            duration: 2,
            ease: 'easeInOut',
          }, 'commercialTransition+=0.5')
          .from('.commercial-controls', {
            y: 50, // Animate commercial tabs up
            opacity: 0,
            duration: 1,
            ease: 'easeInOut',
          }, 'commercialStart+=2');

        // Create ScrollTrigger to control the timeline with scroll
        const st = ScrollTrigger.create({
          animation: tl,
          trigger: sectionRef.current, // Pin and animate this section
          start: 'top top', // Start when top of section hits top of viewport
          end: 'bottom -200%', // Extend end point for scrolling effect
          scrub: 3, // Smoothly scrub animation over 3 seconds
          pin: true, // Pin the section during scroll
          snap: {
            snapTo: 'labels', // Snap to timeline labels (passengerStatic, commercialStart)
            delay: 0,
            duration: 1,
            ease: 'easeInOut',
          },
          onUpdate: (self) => {
            // Switch image sets based on scroll progress
            const progress = self.progress;
            if (progress > 0.5) {
              setImageSlideIndex(1); // Show commercial images
            } else {
              setImageSlideIndex(0); // Show passenger images
            }
          },
        });

        // Store the ScrollTrigger instance for later control
        setScrollTrigger(st);
      }, sectionRef);

      // Cleanup GSAP context on unmount
      return () => ctx.revert();
    }
  }, [isDesktop]);

  // Function to manually scroll to a specific offset in the timeline
  const handleScroll = (offset: number) => {
    if (scrollTrigger) {
      const targetScroll = scrollTrigger.start + (offset / 2) * (scrollTrigger.end - scrollTrigger.start);
      scrollTrigger.scroll(targetScroll); // Scroll to calculated position
    }
  };

  // Handler for clicking passenger tab buttons
  const handlePassengerTabClick = (index: number) => {
    setActivePassengerIndex(index); // Update active passenger image
    setImageSlideIndex(0); // Ensure passenger images are shown
  };

  // Handler for clicking commercial tab buttons
  const handleCommercialTabClick = (index: number) => {
    setActiveCommercialIndex(index); // Update active commercial image
    setImageSlideIndex(1); // Ensure commercial images are shown
  };

  return (
    <div className="pt-[88px]   md:pt-12 lg:pt-16 pb-4 sm:pb-8 md:pb-12 lg:pb-16 bg-black">
      {/* Main section containing the slider */}
      <section ref={sectionRef} className="bg-black pt-4 sm:pt-8 md:pt-12 lg:pt-16 pb-4 sm:pb-8 md:pb-12 lg:pb-16 text-white lg:h-screen lg:overflow-hidden">
        <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-12 flex flex-col h-full justify-between gap-2 sm:gap-4 md:gap-6 lg:gap-10">
          {/* Heading with animation */}
          <h2 className="animated-heading w-full mx-auto text-center text-white font-light text-[20px] sm:text-[28px] md:text-[36px] lg:text-[48px] pt-2 sm:pt-4 md:pt-6 lg:pt-6 z-10">
            Evolving the drive with <span className="font-bold">360-degree</span>
            <br className="hidden sm:block md:block lg:block" /> comprehensive solutions
          </h2>

          {/* Desktop layout with cards and images */}
          <div className="hidden lg:grid grid-cols-[35%_65%] relative">
            <div className="cards-wrp pl-14 self-center ml-[15%] relative 2xl:ml-[25%] 2xl:py-10 py-5 flex flex-col">
              {/* Passenger vehicle card */}
              <button onClick={() => handleScroll(2)} className="card-details-1 text-left">
                <h3 className="font-medium text-white pb-2 text-xl">Passenger vehicles</h3>
                <h6 className="font-light text-white 2xl:text-lg">
                  Revving up innovation from <br /> interior to exterior.
                </h6>
              </button>
              {/* Commercial vehicle card */}
              <button onClick={() => handleScroll(6)} className="card-details-2 opacity-20 mt-14 text-left">
                <h3 className="font-medium text-white pb-2 text-xl">Commercial vehicles</h3>
                <h6 className="font-light text-white 2xl:text-lg">
                  Advancing engineering <br /> for heavy-duty vehicles.
                </h6>
              </button>
              {/* Slider bar for visual transition */}
              <div className="slider-parent absolute left-0 h-full w-[2px] rounded-md bg-gray-600 top-0">
                <div className="slider-height h-[50%] w-[2px] bg-white rounded-md" />
              </div>
            </div>

            {/* Image display area */}
            <div className="relative flex items-center">
              {/* Passenger image with CSSTransition */}
              <CSSTransition
                in={imageSlideIndex === 0}
                timeout={4000}
                classNames="fade-show"
                nodeRef={passengerImageRef}
              >
                <img
                  ref={passengerImageRef}
                  className="w-auto max-h-[360px] min-h-[230px] 2xl:h-[40vh] h-24 mx-auto image-slide-1"
                  src={passengerImages[activePassengerIndex].image}
                  alt={passengerImages[activePassengerIndex].title}
                />
              </CSSTransition>
              {/* Commercial image with CSSTransition */}
              <CSSTransition
                in={imageSlideIndex === 1}
                timeout={3000}
                classNames="fade-show"
                nodeRef={commercialImageRef}
              >
                <img
                  ref={commercialImageRef}
                  className="w-auto max-h-[360px] scale-105 min-h-[230px] 2xl:h-[40vh] h-24 mx-auto image-slide-2 absolute top-[80vh] left-1/2 -translate-x-1/2"
                  src={commercialImages[activeCommercialIndex].image}
                  alt={commercialImages[activeCommercialIndex].title}
                />
              </CSSTransition>
            </div>
          </div>

          {/* Desktop tab controls */}
          <div className="hidden lg:flex justify-end items-center relative container mx-auto">
            <div className="flex justify-center w-[640px] xl:w-[720px] 2xl:w-[900px] relative">
              {/* Passenger tab buttons */}
              <div className="grid grid-cols-5 gap-4 controls-slide-1">
                {passengerImages.map((image, index) => (
                  <TabButton
                    key={image.id}
                    {...image}
                    index={index}
                    activeIndex={activePassengerIndex}
                    onClick={handlePassengerTabClick}
                  />
                ))}
              </div>
              {/* Commercial tab buttons */}
              <div className="grid grid-cols-3 xl:gap-x-8 place-content-center commercial-controls absolute inset-0 w-fit mx-auto">
                {commercialImages.map((image, index) => (
                  <TabButton
                    key={image.id}
                    {...image}
                    index={index}
                    activeIndex={activeCommercialIndex}
                    onClick={handleCommercialTabClick}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile and Tablet layout with Swiper */}
          <div className="lg:hidden pt-4 sm:pt-6 md:pt-8 text-center container mx-auto">
            <MobileImageSection title="Passenger vehicles" images={passengerImages} />
            <MobileImageSection title="Commercial vehicles" images={commercialImages} />
          </div>
        </div>
      </section>
    </div>
  );
};

// Props interface for TabButton component
interface TabButtonProps extends ImageData {
  index: number;
  activeIndex: number;
  onClick: (index: number) => void;
}

// Tab button component for selecting images
const TabButton: React.FC<TabButtonProps> = ({ title, index, activeIndex, tabImage, onClick }) => (
  <button
    id={`control-${index}`}
    onClick={() => onClick(index)}
    aria-label={title}
    className={`flex flex-col font-light items-center justify-center transition-opacity duration-300 hover:opacity-100 cursor-pointer ${activeIndex === index ? 'opacity-100' : 'opacity-50'
      }`}
  >
    <img src={tabImage} alt={title} className="max-h-12 sm:max-h-14 md:max-h-16 pt-1 lg:max-h-16 2xl:max-h-20" />
    <span className="text-[12px] sm:text-[14px] md:text-sm lg:text-sm 2xl:text-base -mt-1 text-white">{title}</span>
  </button>
);

// Props interface for MobileImage component
interface MobileImageProps {
  title: string;
  image: string;
}

// Component for displaying individual images in mobile view
const MobileImage: React.FC<MobileImageProps> = ({ title, image }) => (
  <div className="text-white flex flex-col justify-between text-center">
    <img src={image} alt={title} className="object-cover mb-4 sm:mb-6 md:mb-8 mt-4 sm:mt-6 md:mt-8 w-full max-h-[150px] sm:max-h-[200px] md:max-h-[250px] lg:max-h-[360px]" />
    <span className="text-white text-[12px] sm:text-[14px] md:text-base lg:text-white pb-[20px]">{title}</span>
  </div>
);

// Props interface for MobileImageSection component
interface MobileImageSectionProps {
  title: string;
  images: ImageData[];
   
}



// Component for mobile and tablet image sections using Swiper
const MobileImageSection: React.FC<MobileImageSectionProps> = ({ title, images }) => (
  <div className="pt-4 sm:pt-6 md:pt-8">
    <h4 className="text-base sm:text-lg md:text-xl text-blue-500 mb-1 sm:mb-2 md:mb-2 font-semibold">{title}</h4>
    <p className="text-white text-[12px] sm:text-[14px] md:text-base">
      {title === 'Passenger vehicles' ? 'Revving up innovation' : 'Advancing engineering'}
      <br className="hidden sm:block md:block" />
      {title === 'Passenger vehicles' ? ' from interior to exterior.' : ' for heavy-duty vehicles.'}
    </p>
    <Swiper
      modules={[Pagination, Navigation]}
      pagination={{ clickable: true }}
      speed={600}
      spaceBetween={10}
      slidesPerView={1.2}
      className="cursor-grab my-2 sm:my-4 md:my-4"
    >
      {images.map((image) => (
        <SwiperSlide key={image.id} className="pb-4 sm:pb-8 md:pb-12 lg:pb-16 flex flex-col justify-end">
          <MobileImage title={image.title} image={image.image} />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default ImageSlider;
import React, { useState, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Make sure gsap is properly imported
import Logo from "../assets/logo.png";
import EandH from "../assets/EandH.png";

const Header: React.FC = () => {
    const [visible, setVisible] = useState<boolean>(true);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const isPinned: boolean = ScrollTrigger.getAll().some(trigger => trigger.isActive);

            if (!isPinned) {
                const currentScrollY = window.scrollY;
                setVisible(currentScrollY < lastScrollY || currentScrollY === 0);
                lastScrollY = currentScrollY;
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`z-50 bg-white shadow-md transition-transform duration-300 fixed top-0 left-0 w-full py-2 px-[10px] h-[80px] pt-[20px] 
                ${visible ? "translate-y-0" : "-translate-y-full"}`}
        >
            <div className="grid grid-cols-3 items-center ml-[8%] mr-[8%]">
                {/* Logo Section */}
                <div>
                    <img src={Logo} alt="Supreme Group" className="h-8 md:h-10" />
                </div>

                {/* Right Section */}
                <div className="col-span-2 flex justify-end items-center space-x-4">
                    <button className="bg-[#5CD6FF] text-black px-4 py-2 rounded-full text-sm hover:bg-blue-500 transition">
                        Contact Us
                    </button>
                    <span className="font-semibold">in</span>
                    <span className="flex items-center">
                        <img src={EandH} alt="Language" className="h-4 w-4 mr-1 w-full" />
                    </span>
                </div>
            </div>
        </header>
    );
};

export default Header;

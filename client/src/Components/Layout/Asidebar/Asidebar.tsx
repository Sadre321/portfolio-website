import { AiOutlineHome } from "react-icons/ai";
import { RiCloseLargeLine } from "react-icons/ri";
import { FaRegComment } from "react-icons/fa";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { PiCertificateBold } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineFolderCopy } from "react-icons/md";
import { useState } from "react";

// Define types for the navLinks array items
interface NavLink {
  id: string;
  icon: JSX.Element;
}

const Asidebar: React.FC = () => {
  // State types
  const [icon, setIcon] = useState<JSX.Element>(<AiOutlineHome />);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Toggle sidebar open/close
  const handleToggle = () => setIsOpen(!isOpen);

  // Smooth scroll and set active icon
  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    targetId: string,
    iconComponent: JSX.Element
  ) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    setIcon(iconComponent);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Navigation links data
  const navLinks: NavLink[] = [
    { id: "home", icon: <AiOutlineHome /> },
    { id: "about", icon: <FaRegUser /> },
    { id: "services", icon: <PiCertificateBold /> },
    { id: "projects", icon: <MdOutlineFolderCopy /> },
    { id: "contact", icon: <FaRegComment /> },
  ];

  return (
    <aside
      className={`w-32 min-h-screen flex-col justify-between items-center py-10 gap-10 rounded-r-lg fixed top-0 z-40 flex transition-all duration-300 md:left-0 ${
        isOpen ? "left-0" : "-left-32"
      }`}
    >
      {/* Hamburger / Close button */}
      <div
        className={`fixed transition-all duration-300 md:hidden top-10 border-2 border-gray-500 border-opacity-75 p-1 rounded-full ${
          isOpen ? "left-32" : "left-10"
        } z-40`}
      >
        <div
          className={`space-y-10 bg-white rounded-full p-3 w-12 h-12 flex justify-center items-center`}
        >
          {isOpen ? (
            <RiCloseLargeLine size={32} onClick={handleToggle} />
          ) : (
            <HiBars3BottomLeft size={32} onClick={handleToggle} />
          )}
        </div>
      </div>

      {/* Portfolio Link with current icon */}
      <div className="border-2 border-gray-500 border-opacity-75 p-1 rounded-full">
        <a
          href="#"
          className="w-12 h-12 bg-white rounded-full flex justify-center items-center text-gray-800 hover:bg-gray-200 transition-all duration-200"
        >
          {icon}
        </a>
      </div>

      {/* Navigation Links */}
      <ul className="space-y-10 flex flex-col items-center justify-center">
        {navLinks.map(({ id, icon }, index) => (
          <li
            key={index}
            className="text-2xl text-gray-500 opacity-75 hover:text-gray-200 duration-700 cursor-pointer"
          >
            <a href={`#${id}`} onClick={(e) => handleSmoothScroll(e, id, icon)}>
              {icon}
            </a>
          </li>
        ))}
      </ul>

      {/* Rotated Year */}
      <div className="w-full flex justify-center items-center pb-2">
        <p className="font-semibold text-gray-500 transform -rotate-90 whitespace-nowrap opacity-75 text-xs md:text-base">
          &copy; 2024 - 2025
        </p>
      </div>
    </aside>
  );
};

export default Asidebar;

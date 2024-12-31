import { IoHomeOutline,IoCloseCircleOutline } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { PiCertificateLight } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineFolderCopy } from "react-icons/md";
import { useState } from "react";

const Asidebar = () => {
  // Başlangıçta default bir ikon belirleyebilirsiniz
  const [icon, setIcon] = useState(<IoHomeOutline />); // Default icon olarak bir React Icon bileşeni
  const [isOpen,setIsOpen] =useState(false);

  const handleSmoothScroll = (e, targetId, iconComponent) => {
    e.preventDefault(); // Varsayılan bağlantı davranışını engelle
    const targetElement = document.getElementById(targetId);
    
    // Tıklanan ikonu güncelle
    setIcon(iconComponent);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth', // Yumuşak kaydırma
        block: 'start',     // Hedef öğe üst kısma hizalanacak
      });
    }
  };

  return (
    <>
      <aside className="w-32 min-h-screen flex-col justify-between items-center py-10 gap-10 rounded-r-lg fixed top-0 z-40 hidden md:flex">
      {/* Portfolio Link */}
      <a
        href="/"
        className="w-12 h-12 bg-white rounded-full flex justify-center items-center text-gray-800 hover:bg-gray-200 transition-all duration-200"
      >
        {icon}
      </a>

      {/* Navigation Links */}
      <ul className="space-y-10 flex flex-col items-center justify-center">
        <li className="text-white text-2xl hover:text-gray-400 duration-700 cursor-pointer">
          <a href="#home" onClick={(e) => handleSmoothScroll(e, 'home', <IoHomeOutline />)}>
            <IoHomeOutline />
          </a>
        </li>
        <li className="text-white text-2xl hover:text-gray-400 duration-700 cursor-pointer">
          <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about', <FaRegUser />)}>
            <FaRegUser />
          </a>
        </li>
        <li className="text-white text-2xl hover:text-gray-400 duration-700 cursor-pointer">
          <a href="#services" onClick={(e) => handleSmoothScroll(e, 'services', <PiCertificateLight />)}>
            <PiCertificateLight />
          </a>
        </li>
        <li className="text-white text-2xl hover:text-gray-400 duration-700 cursor-pointer">
          <a href="#projects" onClick={(e) => handleSmoothScroll(e, 'projects', <MdOutlineFolderCopy />)}>
            <MdOutlineFolderCopy />
          </a>
        </li>
        <li className="text-white text-2xl hover:text-gray-400 duration-700 cursor-pointer">
          <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact', <FaRegComment />)}>
            <FaRegComment />
          </a>
        </li>
      </ul>

      {/* Rotated Year */}
      <div className="w-full flex justify-center items-center pb-2">
        <p className="font-semibold text-white transform -rotate-90 whitespace-nowrap opacity-75 text-xs md:text-base">
          &copy; 2024 - 2025
        </p>
      </div>
    </aside>
    <div className="fixed top-0 z-40 space-y-10">
      {isOpen?<IoCloseCircleOutline/>:<HiBars3BottomLeft/>}
    </div>
    </>
  );
};

export default Asidebar;

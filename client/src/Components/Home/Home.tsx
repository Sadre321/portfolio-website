import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import ScrollDown from "./ScrollDown/ScrollDown";
import { useEffect, useState } from "react";

// GitHub kullanıcı verisini tiplemek için interface oluşturuluyor
interface UserData {
  avatar_url: string;
  login: string;
}

const Home = () => {
  // Text array için tip belirtildi
  const textArray: string[] = ["Fullstack Developer", "Backend Developer", "Frontend Developer", "Game Developer", "Developer"];

  const username = import.meta.env.VITE_GITHUB_USERNAME as string;
  const token = import.meta.env.VITE_GITHUB_TOKEN as string;
  const apiUri = import.meta.env.VITE_GITHUB_URI as string;

  // userData tipini UserData olarak belirliyoruz
  const [userData, setUserData] = useState<UserData | null>(null);

  // Sayfa yüklendiğinde verileri çek
  useEffect(() => {
    const fetchGithubData = async () => {
      const userUrl = `${apiUri}/${username}`;

      try {
        // Kullanıcı bilgilerini çek
        const userResponse = await fetch(userUrl, {
          method: "GET",
          headers: {
            Authorization: `token ${token}`, // Token ile kimlik doğrulama
          },
        });

        if (!userResponse.ok) {
          throw new Error("Kullanıcı verileri alınırken hata oluştu");
        }

        const users: UserData = await userResponse.json(); // Yanıt tipi belirliyoruz
        setUserData(users);
      } catch (error) {
        console.error("Hata:", error);
      }
    };

    fetchGithubData();
  }, [apiUri, username, token]);

  // userData null olduğu için kontrolleri ekliyoruz
  return (
    <div className="py-16 md:py-2 min-h-screen flex flex-col justify-center items-center relative" id="home">
      <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-center w-full px-4">
        {/* Circle */}
        {userData && (
          <div className="w-48 h-48 md:w-96 md:h-96 bg-white rounded-full shadow-lg mb-6 md:mb-0">
            <img src={userData.avatar_url} alt="User Avatar" className="rounded-full" />
          </div>
        )}

        {/* Text and Button */}
        <div className="flex flex-col items-center md:items-start space-y-4 text-center md:text-left w-full md:w-auto">
          <h1 className="font-semibold text-xl md:text-3xl text-gray-800">
            Haydar Ozgur Misirli
          </h1>

          <ScrollDown textArray={textArray} />

          {/* Social Media Icons */}
          <div className="flex gap-4 text-3xl text-gray-600 justify-center md:justify-start mb-4">
            <a
              href="https://www.instagram.com/misirli06/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="hover:text-pink-500 transition-all duration-200" />
            </a>
            <a
              href={`https://github.com/${userData?.login}`} // userData?.login kullanıyoruz
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="hover:text-[#24292F] transition-all duration-200" />
            </a>
          
          </div>

          {/* Hire me button */}
          <a href="#contact" className="bg-[#CCD5AE] text-white py-2 px-6 rounded-md hover:bg-[#E9EDC9] transition-colors duration-700">
            Hire me!
          </a>
        </div>
      </div>

      {/* Scroll Down Icon */}
      <div className="absolute bottom-5 z-10 md:w-28 w-20 opacity-55 flex flex-col items-center group">
        <p className="font-bold group-hover:mb-1 duration-700 md:text-base text-xs">Scroll Down</p>
        <DotLottieReact
          className="group-hover:scale-110 duration-700"
          src="https://lottie.host/a8352cb6-61ee-400c-a38c-e2d88136d559/IOJ3hGhvKn.lottie"
          loop
          autoplay
        />
      </div>
    </div>
  );
};

export default Home;

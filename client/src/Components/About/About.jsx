import "./About.css";
import ExperienceItems from "./ExperienceItems";
import { AiOutlineFire } from "react-icons/ai";
import { RiCupLine } from "react-icons/ri";
import { AiOutlineLike } from "react-icons/ai";
import Timeline from "./Timeline/Timeline";
import { useEffect, useState } from "react";

const About = () => {
  const experienceList = [
    {
      name: "Front-End",
      value: 75,
      color: "blue",
    },
    {
      name: "Back-End",
      value: 65,
      color: "green",
    },
    {
      name: "Game-Dev",
      value: 12,
      color: "red",
    },
  ];

  const username = import.meta.env.VITE_GITHUB_USERNAME;
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const apiUri = import.meta.env.VITE_GITHUB_URI;

  const [userData, setUserData] = useState([]);

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

        const users = await userResponse.json();
        setUserData(users);
      } catch (error) {
        console.error("Hata:", error);
      }
    };

    fetchGithubData();
  }, [apiUri, username, token]);

  return (
    <div
      className="py-20 {/*h-screen*/} flex flex-col items-center gap-16"
      id="about"
    >
      {/* Başlık */}
      <h1 className="font-bold md:text-3xl text-xl text-gray-800 md:mb-5 text-center md:text-left w-full">
        Benim Hakkımda
      </h1>

      {/* İçerik */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 p-6 rounded-3xl bg-white shadow-xl">
        {/* Profil Resmi ve Buton */}
        <div className="flex flex-col items-center justify-center md:items-start gap-6">
          <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg">
            <img
              src={userData.avatar_url} // Profil resmini buraya ekleyebilirsiniz
              alt={userData.name} // Profil adı buraya eklenebilir
              className="w-full h-full object-cover"
            />
          </div>

          <a
            href="/CV.jpg" // Correct file path
            download="CV.jpg" // This will make the file downloadable
            className="bg-[#CCD5AE] text-white py-2 px-6 rounded-md hover:bg-[#E9EDC9] transition-colors duration-700"
          >
            CV`yi İndir
          </a>
        </div>

        <div className="flex md:flex-row flex-col items-center justify-center gap-10">
          {/* Açıklama Metni */}
          <p className="text-center text-sm md:text-base md:text-left text-gray-600 max-w-xl leading-relaxed">
            Merhabalar! Ben Özgür, lise yıllarında oyun geliştirmeye olan
            merakım ile başlayan yazılım yolculuğum, üniversite yıllarında web
            teknolojilerine olan ilgimle devam etti. Şu anda web geliştirme,
            backend ve frontend teknolojileriyle projeler üretmeye devam
            ediyorum.
          </p>

          {/* Beceriler */}
          <div className="flex flex-col">
            {experienceList.map((experience, index) => (
              <ExperienceItems experience={experience} key={index} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex md:flex-row flex-col justify-center items-center gap-12">
        {/* İlk Proje Tamamlandı */}
        <div className="flex md:flex-row flex-col items-center">
          <AiOutlineFire className="md:mr-2 text-[48px] opacity-65" />
          <div className="flex flex-col text-center">
            <span className="text-4xl font-bold md:text-left text-center">
              4
            </span>
            <span className="text-sm font-semibold text-gray-500 opacity-75">
              Proje Tamamlandı
            </span>
          </div>
        </div>

        {/* Çay İçildi */}
        <div className="flex md:flex-row flex-col items-center">
          <RiCupLine className="md:mr-2 text-[48px] opacity-65" />
          <div className="flex flex-col text-center">
            <span className="text-4xl font-bold md:text-left text-center">
              129
            </span>
            <span className="text-sm font-semibold text-gray-500 opacity-75">
              Çay İçildi
            </span>
          </div>
        </div>

        {/* Dördüncü Proje Tamamlandı */}
        <div className="flex md:flex-row flex-col items-center">
          <AiOutlineLike className="md:mr-2 text-[48px] opacity-65" />
          <div className="flex flex-col text-center">
            <span className="text-4xl font-bold md:text-left text-center">
              4
            </span>
            <span className="text-sm font-semibold text-gray-500 opacity-75">
              Memnun Müşteri
            </span>
          </div>
        </div>
      </div>

      <Timeline />
    </div>
  );
};

export default About;

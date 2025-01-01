import { useEffect, useState } from "react";
import ProjectItems from "./ProjectItems";
import { RiArrowDownWideLine } from "react-icons/ri";

const Projects = () => {
  const username = import.meta.env.VITE_GITHUB_USERNAME;
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const apiUri = import.meta.env.VITE_GITHUB_URI;

  const [repoData, setRepoData] = useState([]);
  const [sliceValue, setSliceValue] = useState(6);

  const handleSlice = () => {
    setSliceValue(sliceValue + 3);
  };

  // Sayfa yüklendiğinde verileri çek
  useEffect(() => {
    const fetchGithubData = async () => {
      const reposUrl = `${apiUri}/${username}/repos`;

      try {
        // Depoları çek
        const reposResponse = await fetch(reposUrl, {
          method: "GET",
          headers: {
            Authorization: `token ${token}`,
          },
        });

        if (!reposResponse.ok) {
          throw new Error("Depolar alınırken hata oluştu");
        }

        const repos = await reposResponse.json();
        setRepoData(repos);
      } catch (error) {
        console.error("Hata:", error);
      }
    };

    fetchGithubData();
  }, [apiUri, username, token]);

  return (
    <div
      className="h-auto flex flex-col items-center gap-10 p-6 py-20 "
      id="projects"
    >
      <h2 className="font-bold md:text-3xl text-xl text-gray-800 md:mb-8 text-center w-full">
        Repom
      </h2>

      {/* Eğer repoData varsa, repo bilgilerini sırasıyla listele */}
      {repoData.length > 0 ? (
        <div className="w-1/2 flex flex-col gap-10 items-center justify-center">
          <ul className="md:space-y-4 flex flex-wrap justify-center items-center md:gap-10 gap-5">
            {repoData.slice(0, sliceValue).map((repo) => (
              <ProjectItems key={repo.id} repo={repo} />
            ))}
          </ul>

          {/* Butonun işlevi için işaretleme */}
          <button onClick={handleSlice}>
            <RiArrowDownWideLine size={48} />
          </button>
        </div>
      ) : (
        <p className="text-gray-500">Henüz hiç repo bulunmamaktadır.</p>
      )}
    </div>
  );
};

export default Projects;

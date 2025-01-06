import { useEffect, useState } from "react";
import ProjectItems from "./ProjectItems";
import { RiArrowDownWideLine } from "react-icons/ri";
import Loader from "../Spinner/Loader"; // Assuming you have a Loader component

interface Repo {
  id: number;
  name: string;
  updated_at: Date;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
}

const Projects = () => {
  const username = import.meta.env.VITE_GITHUB_USERNAME as string;
  const token = import.meta.env.VITE_GITHUB_TOKEN as string;
  const apiUri = import.meta.env.VITE_GITHUB_URI as string;

  const [repoData, setRepoData] = useState<Repo[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Initially set to true, indicating loading state
  const [sliceValue, setSliceValue] = useState<number>(6);

  const handleSlice = () => {
    setSliceValue(sliceValue + 3);
  };

  // Fetch GitHub data when the page loads
  useEffect(() => {
    const fetchGithubData = async () => {
      const reposUrl = `${apiUri}/${username}/repos`;

      try {
        const reposResponse = await fetch(reposUrl, {
          method: "GET",
          headers: {
            Authorization: `token ${token}`,
          },
        });

        if (!reposResponse.ok) {
          throw new Error("Error fetching repositories");
        }

        const repos = await reposResponse.json();
        setRepoData(repos);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false); // Set loading to false once the data is fetched or an error occurs
      }
    };

    fetchGithubData();
  }, [apiUri, username, token]);

  return (
    <div
      className="h-auto flex flex-col items-center gap-10 p-6 py-20"
      id="projects"
    >
      <h2 className="font-bold md:text-3xl text-xl text-gray-800 md:mb-8 text-center w-full">
        Repom
      </h2>

      {/* Show loader if data is still loading */}
      {loading ? (
        <Loader fullScreen={false} color="#6b7280" /> // Show loader while fetching data
      ) : repoData && repoData.length > 0 ? (
        <div className="flex flex-col gap-10 items-center justify-center">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
            {repoData.slice(0, sliceValue).map((repo,index) => (
              <ProjectItems key={index} repo={repo} />
            ))}
          </ul>

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

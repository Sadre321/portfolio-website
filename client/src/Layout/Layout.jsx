import PropTypes from "prop-types";
import Asidebar from "../Components/Layout/Asidebar/Asidebar";
import { useCallback, useEffect, useState } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import Loader from "../Components/Spinner/Loader";

const Layout = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "#FAEDCD",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 6,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 100,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
      <Asidebar />
      <div className="relative flex flex-col justify-center items-center gap-14 scroll-smooth">
        {children}
      </div>
    </>
  );
};

export default Layout;
Layout.propTypes = {
  children: PropTypes.node,
};

import PropTypes from "prop-types";

const Loader = ({
  height = 64,
  width = 64,
  fullScreen = true,
  color = "#FAEDCD",
}) => {
  return (
    <div
      className={`flex ${
        fullScreen ? "h-screen" : ""
      } items-center justify-center`}
    >
      <div
        style={{
          width: width + "px",
          height: height + `px`,
          borderTopColor: color, // Applying color to border-top to make the spin effect visible
        }}
        className={`animate-spin rounded-full border-4 border-solid border-t-transparent`}
      ></div>
    </div>
  );
};

Loader.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fullScreen: PropTypes.bool,
  color: PropTypes.string,
};

export default Loader;

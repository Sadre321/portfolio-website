interface LoaderProps {
  height?: number;    // Yükseklik tipi (örneğin, '100px')
  width?: number;     // Genişlik tipi (örneğin, '100px')
  fullScreen?: boolean; // Opsiyonel tam ekran modu
  color?: string;        // Opsiyonel renk
}

const Loader:React.FC<LoaderProps> = ({
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

export default Loader;

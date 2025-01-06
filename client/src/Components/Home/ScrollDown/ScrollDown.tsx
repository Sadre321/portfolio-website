import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ScrollDownProps  {
  textArray: string[];
}

const ScrollDown: React.FC<ScrollDownProps > = ({ textArray }) => {
  const [count, setCount] = useState<number>(0); // Başlangıç değeri 0

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => (prevCount + 1) % textArray.length); // Döngü sağlamak için modül kullanıyoruz
    }, 3000); // 3000 ms = 3 saniye

    // Cleanup function: Component unmount edildiğinde interval'ı temizle
    return () => clearInterval(intervalId);
  }, [textArray.length]); // textArray.length bağımlılığı, array uzunluğu değişirse interval yeniden başlar

  return (
    <div>
      <h3 className="text-base md:text-xl text-gray-600 px-4">
        I`m a{" "}
        <span>
          <motion.span
            key={textArray[count]} // Yeni bir key her değişimde bileşeni yeniden oluşturur
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.5,
              ease: "easeInOut",
            }}
            className="text-xl font-semibold"
          >
            {textArray[count]}
          </motion.span>
        </span>
      </h3>
    </div>
  );
};

export default ScrollDown;

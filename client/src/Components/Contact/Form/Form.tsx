import { useState, ChangeEvent, FormEvent } from "react";
import Loader from "../../Spinner/Loader";

// Form verilerinin tipi
interface FormData {
  username: string;
  email: string;
  title: string;
  comment: string;
}

const Form = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    title: "",
    comment: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Input değişikliklerini ele alma fonksiyonu
  const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // E-posta doğrulama fonksiyonu
  const validateEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  // Form validasyonu
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.username) newErrors.username = "İsim alanı boş olamaz";
    if (!formData.email) newErrors.email = "E-posta alanı boş olamaz";
    else if (!validateEmail(formData.email)) newErrors.email = "Geçersiz e-posta adresi";
    if (!formData.title) newErrors.title = "Metin başlığı boş olamaz";
    if (!formData.comment) newErrors.comment = "Yorum boş olamaz";

    setErrors(newErrors);

    // Eğer hata yoksa formu gönder
    return Object.keys(newErrors).length === 0;
  };

  // Form submit fonksiyonu
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validasyonu kontrol et
    if (!validateForm()) return;

    // Eğer loading true ise formu tekrar gönderme
    if (loading) return;

    const apiUri = import.meta.env.VITE_MAILER_URI as string;

    try {
      setLoading(true);

      const response = await fetch(`${apiUri}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      // Başarılıysa formu sıfırla
      setFormData({
        username: "",
        email: "",
        title: "",
        comment: "",
      });

      console.log("Email sent successfully!");
    } catch (error) {
      console.error("Mail gönderme hatası", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl p-5">
      {/* Name and Email Fields */}
      <div className="flex md:flex-row flex-col gap-5">
        {/* Name */}
        <div className="flex flex-col gap-2 w-full sm:w-1/2">
          <label htmlFor="username" className="font-semibold text-xl text-gray-700">
            İsim
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Adınızı girin"
            className="border py-4 px-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
            value={formData.username}
            onChange={handleInput}
          />
          {errors.username && <span className="px-3 text-red-500 text-sm">{errors.username}</span>}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2 w-full sm:w-1/2">
          <label htmlFor="email" className="font-semibold text-xl text-gray-700">
            E-posta
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="E-posta adresinizi girin"
            className="border py-4 px-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
            value={formData.email}
            onChange={handleInput}
          />
          {errors.email && <span className="px-3 text-red-500 text-sm">{errors.email}</span>}
        </div>
      </div>

      {/* Title Field */}
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="font-semibold text-xl text-gray-700">
          Metin Başlığı
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Metin Başlığı"
          className="border py-4 px-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
          value={formData.title}
          onChange={handleInput}
        />
        {errors.title && <span className="px-3 text-red-500 text-sm">{errors.title}</span>}
      </div>

      {/* Comment Field */}
      <div className="flex flex-col gap-2">
        <label htmlFor="comment" className="font-semibold text-xl text-gray-700">
          Yorum
        </label>
        <textarea
          id="comment"
          name="comment"
          placeholder="Yorumunuzu buraya yazın"
          rows={5}
          className="border py-4 px-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
          value={formData.comment}
          onChange={handleInput}
        ></textarea>
        {errors.comment && <span className="px-3 text-red-500 text-sm">{errors.comment}</span>}
      </div>

      {/* Submit Button */}
      <div className="flex justify-start mt-4">
        <button
          type="submit"
          className="px-6 py-2 bg-[#CCD5AE] text-white font-semibold rounded-2xl hover:bg-[#E9EDC9]"
          disabled={loading}
        >
          {loading ? <Loader width={22} height={22} fullScreen={false} /> : "Gönder"}
        </button>
      </div>
    </form>
  );
};

export default Form;

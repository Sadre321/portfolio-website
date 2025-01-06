// import { render, screen, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import Form from "./Form";  // Form bileşeninizi doğru yoldan import ettiğinizden emin olun

// describe("Form Component", () => {
//   it("should render the form with input fields and submit button", () => {
//     render(<Form />);

//     // Ekranda gerekli inputlar ve butonlar var mı kontrol et
//     expect(screen.getByLabelText(/İsim/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/E-posta/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Metin Başlığı/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Yorum/i)).toBeInTheDocument();
//     expect(screen.getByRole("button", { name: /Gönder/i })).toBeInTheDocument();
//   });

//   it("should show validation errors when form is submitted with empty fields", async () => {
//     render(<Form />);

//     // Submit butonuna tıklayın
//     userEvent.click(screen.getByRole("button", { name: /Gönder/i }));

//     // Hata mesajlarını kontrol et
//     await waitFor(() => {
//       expect(screen.getByText(/İsim alanı boş olamaz/i)).toBeInTheDocument();
//       expect(screen.getByText(/E-posta alanı boş olamaz/i)).toBeInTheDocument();
//       expect(screen.getByText(/Metin başlığı boş olamaz/i)).toBeInTheDocument();
//       expect(screen.getByText(/Yorum boş olamaz/i)).toBeInTheDocument();
//     });
//   });

//   it("should show an email format error when an invalid email is provided", async () => {
//     render(<Form />);

//     // Geçersiz bir e-posta girin
//     userEvent.type(screen.getByLabelText(/E-posta/i), "invalidemail");

//     // Submit butonuna tıklayın
//     userEvent.click(screen.getByRole("button", { name: /Gönder/i }));

//     // E-posta hatası mesajını kontrol et
//     await waitFor(() => {
//       expect(screen.getByText(/Geçersiz e-posta adresi/i)).toBeInTheDocument();
//     });
//   });

//   it("should submit the form when all fields are valid", async () => {
//     render(<Form />);

//     // Doğru veri girin
//     userEvent.type(screen.getByLabelText(/İsim/i), "John Doe");
//     userEvent.type(screen.getByLabelText(/E-posta/i), "john.doe@example.com");
//     userEvent.type(screen.getByLabelText(/Metin Başlığı/i), "Başlık");
//     userEvent.type(screen.getByLabelText(/Yorum/i), "Bu bir yorumdur.");

//     // Submit butonuna tıklayın
//     userEvent.click(screen.getByRole("button", { name: /Gönder/i }));

//     // Yükleniyor simgesini bekleyin (if the loader is displayed during loading)
//     expect(screen.getByRole("button", { name: /Gönder/i })).toHaveTextContent("Gönder");
    
//     // Eğer işlem başarılıysa, form verileri sıfırlanmış olur
//     await waitFor(() => {
//       expect(screen.getByLabelText(/İsim/i)).toHaveValue("");
//       expect(screen.getByLabelText(/E-posta/i)).toHaveValue("");
//       expect(screen.getByLabelText(/Metin Başlığı/i)).toHaveValue("");
//       expect(screen.getByLabelText(/Yorum/i)).toHaveValue("");
//     });
//   });
// });

const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const nodemailer = require("nodemailer"); // Nodemailer'ı dahil ediyoruz

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/comments", (req, res) => {
    const { email, username, title, comment } = req.body;
    
    // E-posta gönderme fonksiyonu
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: 'haydaremre31@gmail.com',
            pass: process.env.EXPRESS_GOOGLE_KEY,
        }
    });

    const mailOptions = {
        from: email,
        to: 'haydaremre31@gmail.com',
        subject: `Yeni Yorum: ${title}`,
        text: `
            Yeni bir yorum aldınız!

            Kullanıcı Adı: ${username}
            E-posta: ${email}
            Başlık: ${title}
            Yorum: ${comment}
        `
    };

    // E-posta gönderme işlemi asenkron yapılacak
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("E-posta gönderimi başarısız:", error);
            return res.status(500).send("E-posta gönderimi başarısız oldu.");
        }
        console.log('E-posta gönderildi:', info.response);
    });

    // Başarılı yanıt hemen gönderilebilir
    res.status(200).send("Yorum başarıyla gönderildi ve e-posta gönderiliyor!");
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});

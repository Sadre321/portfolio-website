import express, { Application, Request, Response } from "express";
import cors from "cors";
import nodemailer, { Transporter, SendMailOptions } from "nodemailer";
import logger from "morgan";

const app: Application = express();
const port: number = 3000;

app.use(logger("dev")); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// E-posta gönderme fonksiyonu
const sendEmail = async (mailOptions: SendMailOptions): Promise<void> => {
    const transporter: Transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'haydaremre31@gmail.com',
            pass: process.env.EXPRESS_GOOGLE_KEY || '', // .env dosyasındaki değer kullanılacak
        },
    });

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('E-posta gönderildi:', info.response);
    } catch (error) {
        console.error("E-posta gönderimi başarısız:", error);
        throw new Error("E-posta gönderimi başarısız oldu.");
    }
};

app.post("/comments", async (req: Request, res: Response): Promise<void> => {
    const { email, username, title, comment } = req.body;

    // Mail içeriği
    const mailOptions: SendMailOptions = {
        from: email,
        to: 'haydaremre31@gmail.com',
        subject: `Yeni Yorum: ${title}`,
        text: `
            Yeni bir yorum aldınız!
    
            Kullanıcı Adı: ${username}
            E-posta: ${email}
            Başlık: ${title}
            Yorum: ${comment}
        `,
    };

    try {
        // E-posta gönderme işlemi
        await sendEmail(mailOptions);
        // Başarılı yanıt
        res.status(200).send("Yorum başarıyla gönderildi ve e-posta gönderiliyor!");
    } catch (error) {
        res.status(500).send("E-posta gönderimi başarısız oldu.");
    }
});

app.listen(port, () => {
    console.log(`Server Running here 👉 http://localhost:${port}`);
});

import nodemailer  from'nodemailer';
import { emailService, emailPort, emailUser }  from'../environments/environment.js';

const transporter = nodemailer.createTransport({
    service: emailService,
    port: Number(emailPort),
    auth: {
        user: emailUser,
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendEmail = async (email) => {
    const infoEmail =  await transporter.sendMail({
        from: email.from,
        to: email.to,
        subject: email.subject,
        text: email.text,
        html: email.html
    });
    return infoEmail;
};

export default sendEmail;
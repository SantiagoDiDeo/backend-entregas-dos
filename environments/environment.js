import dotenv from 'dotenv';
dotenv.config();

export  const PORT = process.argv.slice(2)[0] ?? 8080;
export  const mongoUrl = process.env.MONGO_URI;
export  const persistence = process.env.PERSISTENCE;
export  const emailService = process.env.EMAIL_SERVICE;
export  const emailPort = process.env.EMAIL_PORT;
export  const emailUser = process.env.EMAIL_USER;
export  const emailPass = process.env.EMAIL_PASS;
export  const emailAdm = process.env.EMAIL_ADMIN;
export  const sidAccount = process.env.SID_ACCOUNT;
export  const authToken = process.env.AUTH_ACCOUNT;
export  const smsPhone = process.env.SMS_PHONE;
export  const wppNumber = process.env.WPP_NUMBER;


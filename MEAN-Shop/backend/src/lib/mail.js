import nodemailer from 'nodemailer';
import appConfig from '../config';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: appConfig.fromMail,
      pass: appConfig.passFromMail
    },
    from: appConfig.fromMail
});

export default transporter;
import nodemailer from 'nodemailer';
import appConfig from '../config';

/* const mail = (
    () => {
        const FROM_MAIL      = appConfig.fromMail;
        const PASS_FROM_MAIL = appConfig.passFromMail;

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: FROM_MAIL,
              pass: PASS_FROM_MAIL
            },
          })

        async function sendMail(options = undefined) {
            let success = false;
            if (options == undefined) return;
            success = await transporter.sendMail (
                {
                    from: options.from, // sender address
                    to: options.to, // list of receivers
                    subject: options.subject, // Subject line
                    html: options.html, // html body
                }
            );
            return success;
        }


        return {
            sendMail: sendMail
        }
    }
)();

export default mail; */

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
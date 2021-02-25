import nodemailer, { Transporter } from 'nodemailer'


class SendMailService {
    private client: Transporter
    constructor() {
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: account.user, // generated ethereal user
                    pass: account.pass, // generated ethereal password
                },
            });

            this.client = transporter
        })
    }

    async execute(to: string, subject: string, body:string) {
       const message= await this.client.sendMail({
            from: '"NPS" <noreplay@nps.com>',
            to,
            subject: "Hello ✔",
            html: body,
            
        })
        console.log('Message sent : %', message.messageId);
        console.log('Preview URL : %s', nodemailer.getTestMessageUrl(message))


    }


}

export  default new SendMailService ();
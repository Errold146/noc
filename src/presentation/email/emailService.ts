import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envsPlugins';
import { LogEntity, LogSeverityLevel } from '../../domain/models/logEntity';

interface SendEmailOptions {
    to: string | string[], 
    subject: string, 
    HTMLBody: string,
    attachment?: Attachment[]
}

interface Attachment {
    filename: string,
    path: string 
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMIAL,
            pass: envs.MAILER_SECRET_KEY
        }
    })

    constructor() {}

    async sendEmail( options: SendEmailOptions ): Promise<boolean> {

        const { to, subject, HTMLBody, attachment = [] } = options

        try {
            const sendInformation = await this.transporter.sendMail({
                from: envs.MAILER_EMIAL, 
                to,
                subject,
                html: HTMLBody,
                attachments: attachment
            })

            return true
            
        } catch (error) {

            return false
        }
    } 

    async sendEmailWithAttachment( to: string | string[] ) {
        const subject = 'Logs del sistema NOC'
        const htmlbody = `
            <h3>Logs del sistema - NOC</h3>
            <p>Commodo ad nulla labore duis ea. Voluptate ex irure elit mollit amet sint amet. Consectetur et deserunt nulla elit adipisicing duis consequat amet quis culpa minim qui. Fugiat est sint enim adipisicing ullamco nisi consequat cillum et tempor irure. Ipsum ex officia non ea ea ex ullamco non Lorem.</p>
            <p>Ver datos Adjuntos</p>
        `
        const attachment: Attachment[] = [
            {
                filename: 'logs-all.log',
                path: './logs/logs-all.log'
            },
            {
                filename: 'logs-high.log',
                path: './logs/logs-high.log'
            },
            {
                filename: 'logs-medium.log',
                path: './logs/logs-medium.log'
            },
        ]

        return this.sendEmail({ to, subject, HTMLBody: htmlbody, attachment })
    }
}
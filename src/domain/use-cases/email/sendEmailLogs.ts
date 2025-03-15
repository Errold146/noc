import type { EmailService } from "../../../presentation/email/emailService"
import { LogEntity, LogSeverityLevel } from "../../models/logEntity"
import type { LogRepository } from "../../repository/logRepository"

interface SendEmailLogsUseCases {
    execute: (to: string | string[]) => Promise<Boolean>
}

export class SendEmailLogs implements SendEmailLogsUseCases {
    
    constructor(
        private readonly emailServices: EmailService,
        private readonly logRepository: LogRepository,
    ) {}
    
    async execute(to: string | string[]) {
        
        try {
            const sent = await this.emailServices.sendEmailWithAttachment(to)
            if( !sent ) throw new Error('Email not sent')

            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: `Logs sent to ${ to }`, 
                origin: 'sendEmailLogs.ts',
            })
            this.logRepository.saveLog(log)
            return true

        } catch (error) {

            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: `${ error }`,
                origin: 'sendEmailLogs.ts',
            })
            this.logRepository.saveLog(log)
            return false    
        }
        
    }

}
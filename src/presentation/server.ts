//import { LogSeverityLevel } from "../domain/models/logEntity"
// import { CheckService } from "../domain/use-cases/checks/checkService"
//import { SendEmailLogs } from "../domain/use-cases/email/sendEmailLogs"
import { CronService } from "./cron/cronService"
import { EmailService } from "./email/emailService"
import { LogRepositoryImpl } from "../infrastructure/repositories/logRepositoryImpl"
import { MongoLogDataSource } from "../infrastructure/datasources/mongoLogDataSource"
import { CheckServiceMultiple } from "../domain/use-cases/checks/checkServiceMultiple"
import { FileSystemDatasource } from "../infrastructure/datasources/fileSystemDatasource"
import { PostpresLogDataSource } from "../infrastructure/datasources/postgresLogDataSource"

const fsLogRepository = new LogRepositoryImpl( 
    new FileSystemDatasource() 
)
const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDataSource()
)
const postgresLogRepository = new LogRepositoryImpl( 
    new PostpresLogDataSource()
)

const emailService = new EmailService()

export class Server {
    public static async start() {
        console.log('Server started')

        //? Mandar Email
        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLowRepository
        // ).execute(
        //     [ 'errold222@gamil.com', 'errold.n.s@hotmail.com' ]
        // )

        // const logs = await logRepository.getLogs(LogSeverityLevel.low)
        // console.log(logs)

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'http://google.com'
                new CheckServiceMultiple(
                    [ fsLogRepository, mongoLogRepository, postgresLogRepository ],
                    () => console.log( `Service ${ url } is OK` ),
                    error => console.log( error )
                ).execute( url )
            }
        )
    }
}
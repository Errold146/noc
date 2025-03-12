import { CheckService } from "../domain/use-cases/checks/checkService"
import { FileSystemDatasource } from "../infrastructure/datasources/fileSystemDatasource"
import { LogRepositoryImpl } from "../infrastructure/repositories/logRepositoryImpl"
import { CronService } from "./cron/cronService"

const fileSystemLowRepository = new LogRepositoryImpl( new FileSystemDatasource() )

export class Server {
    public static start() {
        console.log('Server started')

        CronService.createJob(
            '*/3 * * * * *',
            () => {
                const url = 'http://google.com'
                new CheckService(
                    fileSystemLowRepository,
                    () => console.log( `Service ${ url } is OK` ),
                    error => console.log( error )
                ).execute( url )
            }
        )
    }
}
import { CheckService } from "../domain/use-cases/checks/checkService"
import { CronService } from "./cron/cronService"

export class Server {
    public static start() {
        console.log('Server started')

        CronService.createJob(
            '*/3 * * * * *',
            () => {
                const url = 'http://google.com'
                new CheckService(
                    () => console.log( `Service ${ url } is OK` ),
                    ( error ) => console.log( error )
                ).execute( url )
            }
        )
    }
}
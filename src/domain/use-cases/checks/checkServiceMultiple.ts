import { LogEntity, LogSeverityLevel } from "../../models/logEntity"
import type { LogRepository } from "../../repository/logRepository"

interface CheckServiceMultipleUseCase {
    execute( url: string ): Promise<boolean>
}

type SuccesseCallback = ( () => void ) | undefined
type ErrorCallback = ( ( error: string ) => void ) | undefined

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

    constructor( 
        private readonly logRepository: LogRepository[],
        private readonly successCallback: SuccesseCallback, 
        private readonly errorCallback: ErrorCallback 
    ) {}

    private callLogs( log: LogEntity ) {
        this.logRepository.forEach( repository => {
            repository.saveLog(log)
        })
    }

    async execute( url: string ): Promise<boolean> {
        
        try {
            const req = await fetch( url )
            if( !req.ok ) throw new Error(`Error on check service: ${ url }`)
            
            const log = new LogEntity({ 
                level: LogSeverityLevel.low, 
                message: `Service ${ url } working`,
                origin: 'CheckService.ts'
            })
            this.callLogs(log)
            this.successCallback && this.successCallback()
            return true
            
        } catch ( error ) {
            const errorMessage = `${ url } is not ok ${ error }`
            const log = new LogEntity({ 
                level: LogSeverityLevel.high, 
                message: errorMessage,
                origin: 'CheckService.ts' 
            })
            this.callLogs(log)
            this.errorCallback && this.errorCallback( errorMessage )
            return false
        }
        
    }
}
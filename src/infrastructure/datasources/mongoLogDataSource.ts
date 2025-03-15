import { LogModel } from "../../data/mongo";
import type { LogDatasource } from "../../domain/datasources/logDatasource";
import { LogEntity, LogSeverityLevel } from "../../domain/models/logEntity";

export class MongoLogDataSource implements LogDatasource {

    async saveLog( log: LogEntity ): Promise<void> {
        const newLog = await LogModel.create( log )
        console.log( 'Mongo Log Created: ', newLog.id )
    }

    async getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]> {
        const logs = await LogModel.find({
            level: severityLevel,
        })

        return logs.map( LogEntity.fromObject )
    }

}
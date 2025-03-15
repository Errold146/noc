import { PrismaClient, SeverityLevel } from "@prisma/client";
import type { LogDatasource } from "../../domain/datasources/logDatasource";
import { LogEntity, LogSeverityLevel } from "../../domain/models/logEntity";

const prismaClient = new PrismaClient()

const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
}

export class PostpresLogDataSource implements LogDatasource {

    async saveLog(log: LogEntity): Promise<void> {
        
        const level = severityEnum[log.level]

        const newLog = await prismaClient.logModel.create({
            data: {
                ...log,
                level: level
            }
        })

        console.log('Postgres Save')
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    
        const level = severityEnum[severityLevel]
        const dbLogs = await prismaClient.logModel.findMany({
            where: { level }
        })

        return dbLogs.map(LogEntity.fromObject)
    }

}
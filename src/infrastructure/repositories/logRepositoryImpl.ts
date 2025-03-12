import type { LogDatasource } from "../../domain/datasources/logDatasource";
import type { LogEntity, LogSeverityLevel } from "../../domain/models/logEntity";
import type { LogRepository } from "../../domain/repository/logRepository";

export class LogRepositoryImpl implements LogRepository {

    constructor(
        private logDatasource: LogDatasource
    ) {}

    async saveLog(log: LogEntity): Promise<void> {
        return this.logDatasource.saveLog(log);
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDatasource.getLogs(severityLevel);
    }

}
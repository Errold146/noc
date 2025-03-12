import type { LogEntity, LogSeverityLevel } from "../models/logEntity";

export abstract class LogDatasource {
    abstract saveLog( log: LogEntity ): Promise<void>
    abstract getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]>
}
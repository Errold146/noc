import type { LogEntity, LogSeverityLevel } from "../models/logEntity";

export abstract class LogRepository {
    abstract saveLog( log: LogEntity ): Promise<void>
    abstract getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]>
}
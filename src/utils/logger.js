import { createLogger, transports, format } from 'winston';
import { AppError } from './errors/app.error.js';
import { Formatter } from './formatter.js';

export const Logger = createLogger({
    level: 'info',
    format: format.combine(
        format.json()
    ),
    defaultMeta: { service: 'product' },
    transports: [
        new transports.Console()
    ]
})

export class InfoLogger {
    static async log(message) {
        Logger.log({
            level: 'info',
            message: {
                timestamp: Formatter.formatDate2Timestamp(new Date()),
                message: message
            }
        });
    }
}

export class HttpLogger{
    static async log(req) {
        Logger.log({
            level: 'info',
            request: 'asdf'
        })
    }
}

export class ErrorLogger{
    constructor(){}

    async error(err){
        console.log("=================START ERROR LOGGER=================");
        Logger.log({
            level: 'error',
            message: {
                timestamp: new Date(),
                message: JSON.stringify(err),
                trace: JSON.stringify(err.stack)
            },
                
        });
        console.log("=================END ERROR LOGGER=================");
        return false;
    }

    async isOperational(error) {
        if(error instanceof AppError){
            return error.isOperational();
        }
        else{
            return false;
        }
    }
}
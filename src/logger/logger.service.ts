import { Injectable, Logger, Scope } from "@nestjs/common";

@Injectable({
    scope: Scope.TRANSIENT
})
export class LoggerService {
    private logger: Logger;
    private name: string;


    constructor() { 
        this.logger = new Logger(this.name);
    }

    setName(prefix: string){
        this.name = prefix;
        this.logger = new Logger(this.name);
    }

    log(message: string){
        this.logger.log(message);
    }

    error(message: string, trace?: string) {
        this.logger.error(message, trace);
    }

    warn(message: string) {
        this.logger.warn(message);
    }

    debug(message: string) {
        this.logger.debug(message);
    }

    verbose(message: string) {
        this.logger.verbose(message);
    }
}
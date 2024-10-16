import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { log } from "console";
import { Kafka, Producer } from "kafkajs";
import { LoggerService } from "src/logger/logger.service";

@Injectable()
export class ProducerService{
    
    private readonly kafka: Kafka;
    private readonly producer: Producer;
  
    constructor(
        private readonly loggerService: LoggerService
    ) {
        this.kafka = new Kafka({
            brokers: ['localhost:9092'],
        });
        this.producer = this.kafka.producer();
    }

    async sendMessage(topic: string, message: any) {
        // await this.producer.connect();
        await this.producer.send({
          topic,
          messages: [{ value: JSON.stringify(message) }],
        });

        this.loggerService.log(`Message sent to topic: ${topic}`);
    }
    
    async disconnect() {
        await this.producer.disconnect();
    }
    
    async start() {
        await this.producer.connect();
    }
}
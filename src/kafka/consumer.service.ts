import { Injectable, Logger, OnApplicationShutdown, OnModuleInit } from "@nestjs/common";
import { Consumer, ConsumerRunConfig, ConsumerSubscribeTopics, Kafka } from "kafkajs";
import * as SendGrid from '@sendgrid/mail';
import { ConfigService } from "src/config/config.service";
import { LoggerService } from "src/logger/logger.service";
@Injectable()
export class ConsumerService implements OnModuleInit, OnApplicationShutdown{
    private readonly loggerService: LoggerService
    private readonly sendgridApiKey: string;
    private readonly kafka = new Kafka({
        brokers: ['localhost:9092'],
    });
    private readonly consumers: Consumer[] = [];

    constructor() {
        this.sendgridApiKey = ConfigService.getValue('SENDGRID_API_KEY');
    }

    async onModuleInit() {
        const config: ConsumerRunConfig = {
            eachMessage: async ({ topic, partition, message }) => {
                const data = JSON.parse(message.value.toString());
                this.loggerService.log(`Received message: ${data}`);
                await this.sendEmail(data.recipientEmail, data.subject, data.body);
            },
        };
        await this.consume({topics: ['job-portal-topic'], fromBeginning: true}, config);
    }

    async consume(Topic: ConsumerSubscribeTopics, config: ConsumerRunConfig){
        const consumer = this.kafka.consumer({groupId: 'job-portal-consumer'});
        await consumer.connect();
        await consumer.subscribe({topic: Topic[0], fromBeginning: Topic[1]})
        await consumer.run(config)

        this.consumers.push(consumer);
    }

    async sendEmail(to: string, subject: string, body: string) {
        SendGrid.setApiKey(this.sendgridApiKey);
        const msg = {
          to,
          from: ConfigService.getValue('SENDGRID_FROM_EMAIL'),
          subject,
          text: body,
          html: body, // You can use HTML for formatting
        };
        await SendGrid.send(msg);
    }
    

    async onApplicationShutdown() {
        for (const consumer of this.consumers){
            await consumer.disconnect();
        }
    }
}



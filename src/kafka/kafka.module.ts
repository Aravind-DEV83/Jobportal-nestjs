import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ConsumerService } from './consumer.service';
import { LoggerService } from 'src/logger/logger.service';

@Module({
    providers: [ProducerService, ConsumerService, LoggerService],
    exports: [ProducerService, ConsumerService]
})
export class KafkaModule {}

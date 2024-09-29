/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Robot } from './robot.entity';
import { RobotService } from './robot.service';
import { RobotController } from './robot.controller';

@Module({imports: [TypeOrmModule.forFeature([Robot])],
    providers: [RobotService],
    controllers: [RobotController],
    exports: [TypeOrmModule]})
export class RobotModule {}

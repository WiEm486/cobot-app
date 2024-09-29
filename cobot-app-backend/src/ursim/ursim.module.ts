/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UrsimService } from './ursim.service';
import { UrsimController } from './ursim.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RobotModule } from "../robot/robot.module"
import { HttpModule } from '@nestjs/axios';
//import { UrsimGateway } from 'src/gateway/ursim.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([]), RobotModule, HttpModule],
  providers: [UrsimService],
  controllers: [UrsimController],


})
export class UrsimModule { }

/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Robot } from './robot.entity';
import { CreateRobotDto } from './dto/create-robot.dto';

@Injectable()
export class RobotService {
    constructor(
        @InjectRepository(Robot)
        private readonly robotRepository: Repository<Robot>,
    ) { }
    async create(createRobotDto: CreateRobotDto): Promise<Robot> {
        const robot = this.robotRepository.create(createRobotDto);
        return await this.robotRepository.save(robot);
      }
    
      async findAll(): Promise<Robot[]> {
        return this.robotRepository.find();
    }


}

/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { RobotService } from './robot.service';
import { CreateRobotDto } from './dto/create-robot.dto';
import { Robot } from './robot.entity';


@Controller('robot')
export class RobotController {
    constructor(private readonly robotService: RobotService) { }
    @Post('add')
    async create(@Body() createRobotDto: CreateRobotDto): Promise<Robot> {
        return this.robotService.create(createRobotDto);
    }
    @Get('all')
    async findAll(): Promise<Robot[]> {
        return this.robotService.findAll();
    }
}
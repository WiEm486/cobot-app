import { MulterFile } from './../interfaces/multer-file.interface';
/* eslint-disable prettier/prettier */
// import { Controller, Post, Body } from '@nestjs/common';
// import { UrsimService } from './ursim.service';

// @Controller('ursim')
// export class UrsimController {
//   constructor(private readonly ursimService: UrsimService) {}

//   @Post('move')
//   async moveRobot(@Body() body: { command: string }) {
//     console.log(`Received command: ${body.command}`);
//     await this.ursimService.sendCommand(body.command);
//     return { status: 'Command sent' };
//   }
// }
import {

  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs-extra';
import { UrsimService } from './ursim.service';
import { Controller, Get, Post, Body } from '@nestjs/common';


@Controller('ursim')
export class UrsimController {
  constructor(private readonly ursimService: UrsimService) { }
  @Post('connect')
  async connectToRobot(@Body('robotName') robotName: string) {

    return this.ursimService.connectToRobot(robotName);
  }

  // @Get('robot-status')
  // async getRobotStatus() {
  //   return this.ursimService.getRobotData();
  // }
  @Get('status')
  async getRobotStatus() {
    return this.ursimService.getRobotStatus();
  }
  @Post('send-command')
  async sendCommand(@Body() commandDto: { joints: number[] }) {
    return this.ursimService.sendCommand(commandDto);
  }


  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(urp)$/)) {
          return cb(
            new BadRequestException('Only .urp files are allowed!'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async uploadUrp(@UploadedFile() file: MulterFile) {
    if (!file) {
      throw new BadRequestException('File is not provided');
    }

    const fileContent = await fs.readFile(file.path, 'utf8');
    await this.ursimService.sendUrpContentToURSim(fileContent);
    return { message: 'File content sent and executed successfully!' };
  }


  @Post('send-params')
  async sendParams(@Body() body: any) {
    const { speed, acceleration, targetX, targetY, targetZ, targetRX, targetRY, targetRZ } = body;

    if (
      speed === undefined || acceleration === undefined ||
      targetX === undefined || targetY === undefined || targetZ === undefined ||
      targetRX === undefined || targetRY === undefined || targetRZ === undefined
    ) {
      throw new BadRequestException('Missing parameters');
    }

    const command = `
def move_to_position():
  target_position = p[${targetX}, ${targetY}, ${targetZ}, ${targetRX}, ${targetRY}, ${targetRZ}]
  speed = ${speed}
  acceleration = ${acceleration}
  movej(target_position, a=acceleration, v=speed)
end
move_to_position()
`;

    await this.ursimService.sendCommandToURSim(command);
    return { message: 'Command sent successfully' };
  }

}


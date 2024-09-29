//import { UrsimService } from './ursim/ursim.service';
/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  // @Post('connect')
  // async connectToRobot(@Body('robotName') robotName: string) {
  //     const robotData = await this.ursimService.connectToURSim(robotName);
  //     return { robotData };
  // }
}

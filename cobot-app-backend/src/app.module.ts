/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrsimModule } from './ursim/ursim.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RobotModule } from './robot/robot.module';
import { UserModule } from './user/user.module';
import { Robot } from './robot/robot.entity'; // Assurez-vous que l'import est correct
import { User } from './user/user.entity'; // Assurez-vous que l'import est correct
import { TcpService } from './tcp/tcp.service';
import { TcpModule } from './tcp/tcp.module';
import { KpiDataModule } from './kpi-data/kpi-data.module';
import { KpiData } from './kpi-data/kpi-data.entity';
import { KpiController } from './kpi-data/kpi.controller';
import { KpiDataService } from './kpi-data/kpi-data.server';



@Module({
  imports: [
    UrsimModule,
    UserModule,
    RobotModule,  KpiDataModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'bd_robots',
      entities: [Robot, User,KpiData],
      synchronize: true,
    }),
    TcpModule,
  



  ],
  controllers: [AppController,KpiController],
  providers: [AppService, TcpService,KpiDataService],
})
export class AppModule { }

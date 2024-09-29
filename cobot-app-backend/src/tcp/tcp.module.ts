/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TcpService } from './tcp.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { KpiDataModule } from 'src/kpi-data/kpi-data.module';

@Module({

    imports: [TypeOrmModule.forFeature([]), KpiDataModule],
    providers: [TcpService],
    controllers: [],
    exports: [TcpService], // Ajoutez cette ligne pour exporter TypeOrmModule

})
export class TcpModule { }

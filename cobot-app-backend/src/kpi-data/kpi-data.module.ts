/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KpiData } from './kpi-data.entity';

import { KpiController } from './kpi.controller';
import { KpiDataService } from './kpi-data.server';

@Module({
    imports: [TypeOrmModule.forFeature([KpiData]),],
    controllers: [KpiController],
    providers: [KpiDataService],
    exports: [TypeOrmModule, KpiDataService],
})
export class KpiDataModule { }
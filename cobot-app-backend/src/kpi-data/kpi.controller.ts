/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KpiData } from './kpi-data.entity';  // Assurez-vous que ce fichier est correctement configuré

@Controller('kpi')
export class KpiController {
    constructor(
        @InjectRepository(KpiData)
        private readonly kpiDataRepository: Repository<KpiData>,
    ) {}

    @Get()
    async getKpiData() {
        // Récupérer toutes les données KPI
        return this.kpiDataRepository.find();  
    }
}
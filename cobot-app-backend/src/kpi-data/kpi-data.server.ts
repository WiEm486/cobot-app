/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KpiData } from './kpi-data.entity';

@Injectable()
export class KpiDataService {
    constructor(
        @InjectRepository(KpiData)
        private readonly kpiDataRepository: Repository<KpiData>,
    ) {}

    async create(data: Partial<KpiData>): Promise<KpiData> {
        const kpiData = this.kpiDataRepository.create(data);
        return this.kpiDataRepository.save(kpiData);
    }

    // Autres méthodes pour récupérer ou mettre à jour les données
}
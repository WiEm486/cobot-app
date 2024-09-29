/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class KpiData {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('float') // Specify the column type as float
    piece_time: number;

    @Column('float') // Specify the column type as float
    total_pieces: number;

    @Column('float') // Specify the column type as float
    total_time: number;
}
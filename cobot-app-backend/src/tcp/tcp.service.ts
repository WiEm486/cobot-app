/* eslint-disable prettier/prettier */
// src/tcp/tcp.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as net from 'net';
import { KpiDataService } from '../kpi-data/kpi-data.server'; // Import your service

@Injectable()
export class TcpService implements OnModuleInit, OnModuleDestroy {
    private server: net.Server;

    constructor(private readonly kpiDataService: KpiDataService) { } // Inject your service

    onModuleInit() {
        this.checkPortAvailability(30002)
            .then(() => {
                this.startServer();
            })
            .catch((err) => {
                console.error(`Port 30002 is not available: ${err.message}`);
            });
    }

    onModuleDestroy() {
        this.stopServer();
    }

    private checkPortAvailability(port: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const tester = net.createServer()
                .once('error', (err: NodeJS.ErrnoException) => {
                    if (err.code === 'EADDRINUSE') {
                        reject(err);
                    }
                })
                .once('listening', () => {
                    tester
                        .once('close', () => {
                            resolve();
                        })
                        .close();
                })
                .listen(port);
        });
    }

    private startServer() {
        this.server = net.createServer((socket) => {
            console.log('Client connected');

            socket.on('data', async (data) => {
                // Convert data to string and trim whitespace
                const message = data.toString().trim();
                console.log('Received data:', message);

                // Extract key-value pairs from the message
                const keyValuePairs = message.split(' ').filter(pair => pair.includes('='));

                // Initialize variables with default float values
                let pieceTime = 0.0;
                let totalPieces = 0.0;

                // Process each key-value pair
                keyValuePairs.forEach(pair => {
                    const [key, value] = pair.split('=');
                    if (key === 'piece_time') {
                        const parsedValue = parseFloat(value);
                        if (!isNaN(parsedValue)) {
                            pieceTime = parsedValue;
                        }
                    } else if (key === 'total_piece') {
                        const parsedValue = parseFloat(value);
                        if (!isNaN(parsedValue)) {
                            totalPieces = parsedValue;
                        }
                    }
                });

                // Calculate total_time
                const totalTime = pieceTime * totalPieces;

                // Save data using KpiDataService
                try {
                    await this.kpiDataService.create({ piece_time: pieceTime, total_pieces: totalPieces, total_time: totalTime });
                    console.log('Data saved:', { piece_time: pieceTime, total_pieces: totalPieces, total_time: totalTime });
                } catch (error) {
                    console.error('Error saving KPI data:', error);
                }
            });

            socket.on('end', () => {
                console.log('Client disconnected');
            });
        });

        this.server.listen(30002, () => {
            console.log('TCP Server listening on port 30002');
        });
    }

    private stopServer() {
        if (this.server) {
            this.server.close(() => {
                console.log('TCP Server stopped');
            });
        }
    }
}

/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// import { Injectable } from '@nestjs/common';
// import * as net from 'net';

// @Injectable()
// export class UrsimService {
//     private readonly ursimHost: string = '192.168.8.182'; // Adresse IP de URSim
//     private readonly ursimPort: number = 30002; // Port par défaut pour les commandes URScript

//     async sendMoveCommand(command: string): Promise<void> {
//         return new Promise((resolve, reject) => {
//             const client = new net.Socket();
//             client.connect(this.ursimPort, this.ursimHost, () => {
//                 console.log('Connected to URSim');
//                 client.write(command + '\n');
//                 client.end();
//             });

//             client.on('close', () => {
//                 console.log('Connection closed');
//                 resolve();
//             });

//             client.on('error', (error) => {
//                 console.error(`Error: ${error.message}`);
//                 reject(error);
//             });
//         });
//     }
// }


import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import * as net from 'net';
import { Robot } from 'src/robot/robot.entity';
import { Repository } from 'typeorm';

//import { InjectRepository } from '@nestjs/typeorm';
//import { Robot } from 'src/robot/robot.entity';
//import { Repository } from 'typeorm';

@Injectable()
export class UrsimService {

    private ursimHost: string;
    private ursimPort: number;
    constructor(@InjectRepository(Robot)
    private readonly robotRepository: Repository<Robot>, private readonly httpService: HttpService
    ) { };


    async getRobotStatus(): Promise<any> {
        const response = await this.httpService.get('http://192.168.8.115:30002/api/robot-status').toPromise();
        return response.data;
    }
    async getRobotData(): Promise<string> {
        return new Promise((resolve, reject) => {
            const client = new net.Socket();
            client.connect(this.ursimPort, this.ursimHost, () => {
                console.log('Connected to URSim');
                // Exemple de commande pour obtenir des données du robot
                client.write('get_actual_joint_speeds()\n'); // Commande exemple
            });

            client.on('data', (data) => {
                console.log('Raw Buffer:', data);

                // Exemple de tentative de lecture de 6 positions de joints comme des floats
                const jointPositions = [];
                try {
                    for (let i = 0; i < 6; i++) {
                        jointPositions.push(data.readFloatLE(i * 4)); // Ajuste l'offset si nécessaire
                    }
                    console.log('Joint Positions:', jointPositions);
                } catch (error) {
                    console.error('Error reading joint positions:', error);
                }

                // Ajouter plus de logique ici pour lire d'autres parties des données si nécessaire
            });

            client.on('error', (err) => {
                reject('Error: ' + err.message);
            });

            client.on('close', () => {
                console.log('Connection closed');
            });
        });
    }

    async sendCommand(commandDto: { joints: number[] }): Promise<string> {
        return new Promise((resolve, reject) => {
            const client = new net.Socket();
            //console.log(this.ursimPort);

            client.connect(this.ursimPort, this.ursimHost, () => {
                console.log('Connected to URSim');
                console.log("hello" + this.ursimHost);
                const command = `movej([${commandDto.joints.join(',')}], a=1.2, v=0.25)\n`;

                client.write(command);
            });

            client.on('data', (data) => {
                console.log('Received: ' + data);
                resolve(data.toString());
                client.destroy();
            });

            client.on('error', (err) => {
                reject('Error: ' + err.message);
            });

            client.on('close', () => {
                console.log('Connection closed');
            });
        });
    }

    async connectToRobot(robotName: string): Promise<string> {
        const robot = await this.robotRepository.findOne({ where: { name: robotName } });

        if (!robot) {
            throw new Error('Robot not found');
        }

        const { ip_address, port } = robot;
        this.ursimHost = ip_address;
        this.ursimPort = port;

        return new Promise((resolve, reject) => {
            const client = new net.Socket();
            console.log(robot);
            console.log(robotName);
            client.connect(port, ip_address, () => {
                console.log(`Connected to URSim at ${ip_address}:${port}`);
                client.write('get_actual_joint_speeds()\n');
            });

            client.on('data', (data) => {
                console.log('Received: ' + data);
                resolve(data.toString());
                client.destroy();
            });

            client.on('error', (err) => {
                reject('Error: ' + err.message);
            });

            client.on('close', () => {
                console.log('Connection closed');
            });
        });
    }

    // async getRobotConnectionDetails(robotName: string): Promise<{ ipAddress: string; port: number }> {
    //     const robot = await this.robotRepository.findOne({ where: { name: robotName } });
    //     if (!robot) {
    //         throw new Error(`Robot with name ${robotName} not found`);
    //     }
    //     return { ipAddress: robot.ip_address, port: robot.port };
    // }

    // async connectToURSim(robotName: string): Promise<string[]> {
    //     const { ipAddress, port } = await this.getRobotConnectionDetails(robotName);

    //     return new Promise((resolve, reject) => {
    //         const client = new net.Socket();
    //         client.connect(port, ipAddress, () => {
    //             console.log(`Connected to URSim at ${ipAddress}:${port}`);
    //             client.write('get_actual_joint_speeds()\n');
    //         });

    //         client.on('data', (data) => {
    //             const jointSpeeds = [];
    //             for (let i = 0; i < 6; i++) {
    //                 jointSpeeds.push(data.readFloatBE(i * 4));
    //             }
    //             console.log('Received joint speeds:', jointSpeeds);
    //             resolve(jointSpeeds);
    //             client.destroy();
    //         });

    //         client.on('error', (err) => {
    //             reject('Error: ' + err.message);
    //         });

    //         client.on('close', () => {
    //             console.log('Connection closed');
    //         });
    //     });
    // }


    async sendUrpContentToURSim(content: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const client = new net.Socket();
            const ursimHost = '192.168.8.127'; // Replace with URSim host
            const ursimPort = 30002; // Replace with URSim port


            client.connect(ursimPort, ursimHost, () => {
                console.log('Connected to URSim');
                console.log(content + "hello")
                client.write(content);
                console.log(client.write(content))
            });

            client.on('data', (data) => {
                console.log('Received: fil ' + data);
                client.destroy(); // kill client after server's response
                resolve();
            });

            client.on('close', () => {
                console.log('Connection closed');
            });

            client.on('error', (err) => {
                console.error('Error: ' + err.message);
                reject(new Error('Failed to send file content to URSim'));
            });
        });
    }

    async sendCommandToURSim(command: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const client = new net.Socket();

            client.connect(this.ursimPort, this.ursimHost, () => {
                console.log('Connected to URSim');
                // Ensure the command ends with a newline
                client.write(command + '\n');
            });

            client.on('data', (data) => {
                console.log('Received data: ' + data.toString());
                client.destroy(); // Close the connection after receiving data
                resolve();
            });

            client.on('error', (err) => {
                console.error('Connection error:', err);
                reject(err);
            });

            client.on('close', () => {
                console.log('Connection closed');
            });
        });
    }

}





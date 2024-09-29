/* eslint-disable prettier/prettier */
// gateway/ursim.gateway.ts
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(3002) // Port WebSocket
export class UrsimGateway {
    @WebSocketServer()
    server: Server;
}
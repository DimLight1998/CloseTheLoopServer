// this file handles all WebSocket connections

import WebSocket from 'ws';
import { RemoteRoomManager } from './RemoteRoomManager';
import { RemoteClientSocket } from './RemoteClientSocket';

const wsServer: WebSocket.Server = new WebSocket.Server({ port: 12306 });
const roomMgr: RemoteRoomManager = new RemoteRoomManager();
const clientSockets: Map<number, RemoteClientSocket> = new Map<number, RemoteClientSocket>();
let nextNumber: number = 0;

wsServer.on('connection', conn => {
    console.log('New connection received.');

    conn.on('message', message => {
        let sections: string[] = message.toString().split('@');

        // first section of the message is message type
        switch (sections[0]) {
            case 'REG':
                // should be in format 'REG'
                let [playerId, roomId]: [number, number] = roomMgr.handleRegisterPlayer();
                clientSockets.set(nextNumber, new RemoteClientSocket(conn));
                let retString: string = ['REG_OK', playerId, roomId, nextNumber].join('@');
                nextNumber++;
                conn.send(retString);
                break;
            case 'EXIT':
                // should be in format 'EXIT@${playerID}@${roomID}@${socketId}'
                roomMgr.handlePlayerDisconnect(parseInt(sections[1], 10), parseInt(sections[2], 10));
                clientSockets.delete(parseInt(sections[3], 10));
                conn.close();
                break;
            default:
                conn.send('UNKNOWN');
        }
    });

    conn.send('');
});

// this file handles all WebSocket connections

import WebSocket from 'ws';
import { RemoteRoomManager } from './RemoteRoomManager';
import { RemoteClientSocket } from './RemoteClientSocket';
import * as https from 'https';
import * as fs from 'fs';

const keyPath: string = '/home/ubuntu/domain.key';
const certPath: string = '/home/ubuntu/chained.pem';
const options: any = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath)
};

let server: https.Server = https.createServer(options, (req, res) => {
    res.writeHead(403);
    res.end('Hello from server');
}).listen(12306);

const wsServer: WebSocket.Server = new WebSocket.Server({ server: server });
const roomMgr: RemoteRoomManager = new RemoteRoomManager();
const clientSockets: Map<number, RemoteClientSocket> = new Map<number, RemoteClientSocket>();
const socketMap: Map<WebSocket, () => void> = new Map();
let nextNumber: number = 0;

wsServer.on('connection', (conn: WebSocket) => {
    conn.binaryType = 'arraybuffer';

    conn.on('message', (message: WebSocket.Data) => {
        try {
            let sections: string[] = message.toString().split('@');

            // first section of the message is message type
            switch (sections[0]) {
                case 'REG': {
                    // should be in format 'REG'
                    let [playerId, roomId]: [number, number] = roomMgr.handleRegisterPlayer();
                    let socketId: number = nextNumber;

                    clientSockets.set(socketId, new RemoteClientSocket(conn));
                    socketMap.set(conn, () => {
                        roomMgr.handlePlayerDisconnect(playerId, roomId);
                        clientSockets.delete(socketId);
                        console.log(`player ${playerId} at room ${roomId} leaves`);
                    });

                    let retString: string = ['REG_OK', playerId, roomId, socketId].join('@');
                    console.log(`player ${playerId} at room ${roomId} enters`);
                    nextNumber++;
                    conn.send(retString);
                    break;
                }
                case 'EXIT': {
                    // should be in format 'EXIT@${playerID}@${roomID}@${socketId}'
                    roomMgr.handlePlayerDisconnect(parseInt(sections[1], 10), parseInt(sections[2], 10));
                    clientSockets.delete(parseInt(sections[3], 10));
                    conn.close();
                    break;
                }
                case 'CHDIR': {
                    // should be in format 'CHDIR@${playerID}@${roomID}@${socketId}@${direction}'
                    let [playerId, roomId, socketId, direction] = sections.slice(1, 5).map((x: string) => parseInt(x, 10));
                    roomMgr.serverList[roomId].handleChangeDirection(playerId, direction);
                    break;
                }
                case 'REG_VP': {
                    // should be in format 'REG_VP@${playerIdToTrack}@${roomID}@${nRows}@${nCols}'
                    let [playerId, roomId, nRows, nCols, socketId] = sections.slice(1, 6).map((x: string) => parseInt(x, 10));
                    roomMgr.serverList[roomId].addNewWorldListener(clientSockets.get(socketId), playerId, nRows, nCols);
                    break;
                }
                case 'REBORN': {
                    let [playerId, roomId] = sections.slice(1, 3).map(x => parseInt(x, 10));
                    roomMgr.serverList[roomId].handleRebornPlayer(playerId);
                    break;
                }
                default: {
                    conn.send('UNKNOWN');
                }
            }
        } catch (e) {
            // in some cases the server will crash
            // do nothing
        }
    });

    conn.on('error', (err: Error) => {
        try {
            console.log('error ocurred: ' + err);
            conn.close();
        } catch (e) {
            // do nothing
        }
    });

    conn.on('close', (code, reason) => {
        try {
            console.log(code, reason);
            const callback: () => void = socketMap.get(conn);
            if (socketMap.delete(conn)) {
                callback();
            }
        } catch (e) {
            // do nothing
        }
    });
});

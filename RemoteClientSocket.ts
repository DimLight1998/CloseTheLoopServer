import WebSocket from 'ws';
import { PayLoad } from './PayLoadProtobuf';

export class RemoteClientSocket {
    webSocket: WebSocket = null;

    constructor(webSocket: WebSocket) {
        this.webSocket = webSocket;
    }

    pushWorld(worldBuffer: Uint8Array): void {
        this.webSocket.send(worldBuffer);
    }
}
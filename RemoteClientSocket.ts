import WebSocket from 'ws';

export class RemoteClientSocket {
    webSocket: WebSocket = null;

    constructor(webSocket: WebSocket) {
        this.webSocket = webSocket;
    }

    pushWorld(worldBuffer: Uint8Array): void {
        this.webSocket.send(worldBuffer);
    }
}
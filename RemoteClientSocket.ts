import WebSocket from 'ws';

export class RemoteClientSocket {
    webSocket: WebSocket = null;

    constructor(webSocket: WebSocket) {
        this.webSocket = webSocket;
    }

    pushWorld(worldJson: string): void {
        let retObj: object = {
            type: 'WORLD',
            content: worldJson
        };
        this.webSocket.send(JSON.stringify(retObj));
    }
}
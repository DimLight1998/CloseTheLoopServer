import WebSocket from 'ws';

export class RemoteClientSocket {
    webSocket: WebSocket = null;

    constructor(webSocket: WebSocket) {
        this.webSocket = webSocket;
    }

    pushWorld(worldJson: string): void {
        let retStr: string = ['WORLD', worldJson].join('@');
        this.webSocket.send(retStr);
    }
}
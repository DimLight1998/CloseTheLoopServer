import * as ws from 'ws';
let WebSocketServer: typeof ws.Server = ws.Server;

let wss: ws.Server = new WebSocketServer({ port: 10000 });
wss.on('connection', ws => {
    ws.on('message', msg => {
        console.log('recv: ' + msg);
        ws.send('hello from server');
    });
});
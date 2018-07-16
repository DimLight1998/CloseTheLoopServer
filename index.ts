import WebSocket from 'ws';

const wss: WebSocket.Server = new WebSocket.Server({ port: 9990 });

wss.on('connection', ws => {
    ws.on('message', message => {
        console.log('received: %s', message);
    });

    ws.send('something');
});

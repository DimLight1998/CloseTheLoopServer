import WebSocket from 'ws';

const wss: WebSocket.Server = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
    ws.on('message', message => {
        console.log('received: %s', message);
    });

    ws.send('something');
});

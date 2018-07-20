import { IServerAdapter } from './IAdapter';
import { GameRoom } from './GameRoom';
import { PayLoadJson } from './PlayerInfo';
import { RemoteClientSocket } from './RemoteClientSocket';

export class RemoteListener {
    clientSocket: RemoteClientSocket;
    remotePlayerID: number;
    viewNRows: number;
    viewNCols: number;
}

export class RemoteServer implements IServerAdapter {
    room: GameRoom = null;
    listeners: RemoteListener[] = [];
    static NRows: number = 80;
    static NCols: number = 80;
    static NPlayers: number = 13;

    constructor() {
        this.room = new GameRoom(RemoteServer.NRows, RemoteServer.NCols, RemoteServer.NPlayers);
        this.room.setServerAdapter(this);
    }

    handleChangeDirection(playerID: number, direction: number): void {
        this.room.changeDirection(playerID, direction);
    }

    handleRegisterToThisRoom(): number {
        return this.room.replaceAIWithPlayer();
    }

    dispatchNewWorld(): void {
        for (let listener of this.listeners) {
            const worldObj: PayLoadJson =
                this.room.getListenerView(listener.remotePlayerID, listener.viewNRows, listener.viewNCols);
            listener.clientSocket.pushWorld(JSON.stringify(worldObj));
        }
    }

    addNewWorldListener(remoteClientSocket: RemoteClientSocket, playerId: number, nRows: number, nCols: number): void {
        this.listeners.push({
            clientSocket: remoteClientSocket,
            remotePlayerID: playerId,
            viewNRows: nRows,
            viewNCols: nCols
        });
    }
}
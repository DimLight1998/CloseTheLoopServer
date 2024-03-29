import { IServerAdapter } from './IAdapter';
import { GameRoom } from './GameRoom';
import { RemoteClientSocket } from './RemoteClientSocket';
import { PayLoad } from './PayLoadProtobuf';
import { Writer } from './node_modules/protobufjs';

export class RemoteListener {
    clientSocket: RemoteClientSocket;
    remotePlayerID: number;
    viewNRows: number;
    viewNCols: number;
}

export class RemoteServer implements IServerAdapter {
    static NRows: number = 80;
    static NCols: number = 80;
    static NPlayers: number = 13;
    room: GameRoom = null;
    listeners: RemoteListener[] = [];

    constructor() {
        this.room = new GameRoom(RemoteServer.NRows, RemoteServer.NCols, RemoteServer.NPlayers);
        this.room.setServerAdapter(this);
        this.room.startNewGame();
    }

    handleChangeDirection(playerID: number, direction: number): void {
        this.room.changeDirection(playerID, direction);
    }

    handleRegisterToThisRoom(): number {
        return this.room.replaceAIWithPlayer();
    }

    dispatchNewWorld(): void {
        this.room.initPlayerInfoProto();
        for (let listener of this.listeners) {
            const payload: PayLoad = this.room.getListenerViewProtobuf(
                listener.remotePlayerID, listener.viewNRows, listener.viewNCols);
            const result: Uint8Array = PayLoad.encode(payload).finish();

            try {
                listener.clientSocket.pushWorld(result);
            } catch (e) {
                // do nothing
            }
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

    removeNewWorldListener(playerId: number): void {
        this.listeners = this.listeners.filter(x => x.remotePlayerID !== playerId);
    }


    handleRebornPlayer(playerId: number): void {
        this.room.rebornHumanPlayer(playerId);
    }
}
import { IRoomMangerAdapter } from './IAdapter';
import { RemoteServer } from './RemoteServer';
import { ServerPlayerInfo } from './ServerPlayerInfo';
import { GameAI } from './GameAI';

export class RemoteRoomManager implements IRoomMangerAdapter {
    serverList: RemoteServer[] = [];

    handleRegisterPlayer(): [number, number] {
        for (let i: number = 0; i < this.serverList.length; i++) {
            for (let p of this.serverList[i].room.serverPlayerInfos) {
                if (p.isAI) {
                    p.aiInstance = null;
                    p.isAI = false;
                    p.state = 1;
                    return [p.playerID, i];
                }
            }
        }

        this.serverList.push(new RemoteServer());
        let playerId: number = this.serverList[this.serverList.length - 1].handleRegisterToThisRoom();
        return [playerId, this.serverList.length - 1];
    }

    handlePlayerDisconnect(playerID: number, roomID: number): void {
        let infoRef: ServerPlayerInfo = this.serverList[roomID].room.serverPlayerInfos[playerID - 1];
        infoRef.isAI = true;
        infoRef.aiInstance = new GameAI(this.serverList[roomID].room, playerID);
        infoRef.state = 1;
    }
}
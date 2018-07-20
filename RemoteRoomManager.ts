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
                    let playerId:number = this.serverList[i].room.replaceAIWithPlayer();
                    return [playerId, i];
                }
            }
        }

        this.serverList.push(new RemoteServer());
        let playerId: number = this.serverList[this.serverList.length - 1].handleRegisterToThisRoom();
        return [playerId, this.serverList.length - 1];
    }

    handlePlayerDisconnect(playerID: number, roomID: number): void {
        this.serverList[roomID].room.replacePlayerWithAI(playerID);
    }
}
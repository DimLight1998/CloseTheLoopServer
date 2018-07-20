import { IRoomMangerAdapter } from './IAdapter';
import { RemoteServer } from './RemoteServer';

export class RemoteRoomManager implements IRoomMangerAdapter {
    serverList: RemoteServer[] = [];

    handleRegisterPlayer(): [number, number] {
        for (let i: number = 0; i < this.serverList.length; i++) {
            for (let p of this.serverList[i].room.serverPlayerInfos) {
                if (p.isAI) {
                    let playerId: number = this.serverList[i].room.replaceAIWithPlayer();
                    return [playerId, i];
                }
            }
        }

        let playerId: number = null;

        while (true) {
            this.serverList.push(new RemoteServer());
            playerId = this.serverList[this.serverList.length - 1].handleRegisterToThisRoom();
            if (playerId !== null) {
                break;
            }
            this.serverList.pop();
        }

        return [playerId, this.serverList.length - 1];
    }

    handlePlayerDisconnect(playerID: number, roomID: number): void {
        this.serverList[roomID].room.replacePlayerWithAI(playerID);
    }
}
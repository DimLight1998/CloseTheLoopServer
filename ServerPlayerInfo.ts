// todo keep this file sync with local until ddl.

import { GameAI } from './GameAI';
import { PlayerInfo } from './PlayerInfo';

export class ServerPlayerInfo extends PlayerInfo {
    isAI: boolean;
    aiInstance: GameAI;
    nextDirection: number;
}
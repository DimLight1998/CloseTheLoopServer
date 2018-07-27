import os
path_prefix = ['',
               '../CloseTheLoop/Assets/Scripts']
filenames = ['GameAI.ts', 'GameRoom.ts', 'IAdapter.ts',
             'PlayerInfo.ts', 'ServerPlayerInfo.ts',
             'PayLoadProtobuf.d.ts', 'PayLoadProtobuf.js',
             'Uint16PairQueue.ts', 'Uint16TripleQueue.ts']

for filename in filenames:
    os.system('fc {} {}'.format(os.path.join(path_prefix[0], filename),
                                os.path.join(path_prefix[1], filename)))

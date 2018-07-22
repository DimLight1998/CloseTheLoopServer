import os
path_prefix = ['D:\Gerwa\Documents\git_task_ai9s\CloseTheLoopServer',
               'D:\Gerwa\Documents\git_task_ai9s\CloseTheLoop\Assets\Scripts']
filenames = ['GameAI.ts', 'GameRoom.ts', 'IAdapter.ts',
             'PlayerInfo.ts', 'ServerPlayerInfo.ts']

for filename in filenames:
    os.system('fc {} {}'.format(os.path.join(path_prefix[0], filename),
                                os.path.join(path_prefix[1], filename)))

import { IBoard, INestedBoard, ITask } from '../models';

export const mergeTasks = (
  boards: IBoard[],
  tasks: ITask[],
): INestedBoard[] => {
  const res = [];

  for (let i = 0; i < boards.length; i++) {
    const result = [];
    for (let j = 0; j < tasks.length; j++) {
      if (boards[i].id === tasks[j].boardId) {
        result.push(tasks[j]);
      }
    }
    const board = { ...boards[i], tasks: result };
    res.push(board);
  }

  return res;
};

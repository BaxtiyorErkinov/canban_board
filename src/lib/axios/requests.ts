import { IBoard, ITask } from '../../models';
import { ROUTES } from './constants';
import { mainApi } from './mainApi';

// ================= board =============

export const getBoards = async () => {
  const boards = await mainApi.get<IBoard[]>(ROUTES.boards);
  const tasks = await mainApi.get<ITask[]>(ROUTES.tasks);
  return {
    boards: boards.data,
    tasks: tasks.data,
  };
};

interface IMoveBoardTask {
  taskId: ITask['id'];
  data: ITask;
}

export const moveBoardTask = async ({ data, taskId }: IMoveBoardTask) => {
  const res = await mainApi.put(ROUTES.tasks + '/' + taskId, data);

  return res.data;
};

export const createBoard = async (data: IBoard) => {
  const res = await mainApi.post(ROUTES.boards, data);

  return res.data;
};

export const removeBoard = async (id: IBoard['id']) => {
  const res = await mainApi.delete(ROUTES.boards + '/' + id);

  return res.data;
};

// ========= task ===========

export const getTask = async (id: ITask['id']) => {
  const res = await mainApi.get(ROUTES.tasks + '/' + id);

  return res.data;
};

interface IUpdateTask {
  id: ITask['id'];
  d: ITask;
}

export const updateTask = async (param: IUpdateTask) => {
  const res = await mainApi.put(ROUTES.tasks + '/' + param.id, param.d);

  return res.data;
};

export const removeTask = async (id: ITask['id']) => {
  const res = await mainApi.delete(ROUTES.tasks + '/' + id);

  return res.data;
};

export const createTask = async (data: ITask) => {
  const res = await mainApi.post(ROUTES.tasks, data);

  return res.data;
};

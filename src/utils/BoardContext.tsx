import React from 'react';
import { IBoard, INestedBoard, ITask } from '../models';

import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQuery,
} from '@tanstack/react-query';

import { mergeTasks } from './mergeTasks';
import { getBoards } from '../lib/axios/requests';

export interface IContext {
  isLoading: boolean;
  boards: INestedBoard[];
  setBoards: (arg: INestedBoard[]) => void;
  refetch: (
    options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined,
  ) => Promise<QueryObserverResult<{ boards: IBoard[]; tasks: ITask[] }>>;
  currentBoard: INestedBoard | null;
  currentTask: ITask | null;
  updateCurrentBoard: (arg: INestedBoard) => void;
  updateCurrentTask: (arg: ITask) => void;
}

interface IBoardProvider {
  children: React.ReactNode;
}

export const BoardContext = React.createContext<IContext | null>(null);

const BoardProvider: React.FC<IBoardProvider> = ({ children }) => {
  const [boards, setBoards] = React.useState<INestedBoard[]>([]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['boards'],
    queryFn: getBoards,
    onSuccess: (d) => {
      setBoards(
        mergeTasks(
          d?.boards as IBoard[],
          d?.tasks as ITask[],
        ) as INestedBoard[],
      );
    },
  });

  const [currentBoard, setCurrentBoard] = React.useState<INestedBoard | null>(
    null,
  );
  const [currentTask, setCurrentTask] = React.useState<ITask | null>(null);

  const updateCurrentBoard = (board: INestedBoard) => {
    setCurrentBoard(board);
  };

  const updateCurrentTask = (task: ITask) => {
    setCurrentTask(task);
  };

  return (
    <BoardContext.Provider
      value={{
        isLoading,
        boards,
        setBoards,
        refetch,
        currentBoard,
        currentTask,
        updateCurrentBoard,
        updateCurrentTask,
      }}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;

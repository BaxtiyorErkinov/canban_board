import { useContext } from 'react';
import { BoardContext, IContext } from '../utils/BoardContext';

export const useBoardContext = () => {
  const boardContext = useContext(BoardContext) as IContext;

  return boardContext;
};

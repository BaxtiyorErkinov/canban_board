import React from 'react';

import { INestedBoard, ITask } from '../../models';
import { useBoardContext } from '../../hooks/useBoardContext';
import { useMutation } from '@tanstack/react-query';
import { moveBoardTask } from '../../lib/axios/requests';

import { ViewTask } from './ViewTask';

import styles from './board.module.css';

const LEVELS = {
  '1': 'Low',
  '2': 'Medium',
  '3': 'High',
};

interface IBoardItemProps {
  task: ITask;
  board: INestedBoard;
  boards: INestedBoard[];
  setBoards: (arg: INestedBoard[]) => void;
}

export const BoardItem: React.FC<IBoardItemProps> = ({
  task,
  board,
  boards,
  setBoards,
}) => {
  const [fullView, setFullView] = React.useState(false);
  const [taskState, setTask] = React.useState(task);
  const { currentBoard, currentTask, updateCurrentBoard, updateCurrentTask } =
    useBoardContext();
  const { mutate, isLoading } = useMutation(moveBoardTask, {
    onSuccess: (data) => {
      console.log(data);
      const message = 'success';
      alert(message);
    },
    onError: () => {
      alert('there was an error');
    },
  });

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {};

  const dragStartHandler = (
    e: React.DragEvent<HTMLDivElement>,
    board: INestedBoard,
    task: ITask,
  ) => {
    updateCurrentBoard(board);
    updateCurrentTask(task);
  };

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dropHandler = (
    e: React.DragEvent<HTMLDivElement>,
    board: INestedBoard,
    task: ITask,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const currentIndex = currentBoard?.tasks.indexOf(currentTask as ITask);
    currentBoard?.tasks.splice(currentIndex as number, 1);

    const dropIndex = board.tasks.indexOf(task);
    board.tasks.splice(dropIndex + 1, 0, currentTask as ITask);

    console.log('moved', dropIndex);

    mutate({
      taskId: currentTask?.id as number,
      data: {
        ...currentTask,
        boardId: board.id,
      } as ITask,
    });

    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }

        if (b.id === currentBoard?.id) {
          return currentBoard;
        }

        return b;
      }),
    );
  };

  const toggleView = () => setFullView((prev) => !prev);

  return (
    <>
      <div
        className={styles.board__item}
        draggable={true}
        onDragOver={(e) => dragOverHandler(e)}
        onDragLeave={(e) => dragLeaveHandler(e)}
        onDragStart={(e) => dragStartHandler(e, board, task)}
        onDragEnd={(e) => dragEndHandler(e)}
        onDrop={(e) => dropHandler(e, board, task)}
        onClick={toggleView}>
        <span className={`${styles.level} ${styles[LEVELS[taskState.level]]}`}>
          {LEVELS[taskState.level]}
        </span>
        <h3 className={styles.title}>{taskState.title}</h3>
        <span className={styles.createdAt}>{taskState.createdAt}</span>
      </div>
      {fullView ? (
        <ViewTask
          isVisible={fullView}
          close={toggleView}
          task={task}
          setTask={setTask}
        />
      ) : null}
    </>
  );
};

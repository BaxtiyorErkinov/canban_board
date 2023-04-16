import React from 'react';

import { BoardItem } from './BoardItem';

import { IBoard, INestedBoard, ITask } from '../../models';
import { useBoardContext } from '../../hooks/useBoardContext';
import { useMutation } from '@tanstack/react-query';
import { moveBoardTask, removeBoard } from '../../lib/axios/requests';

import { IoMdAdd } from 'react-icons/io';
import { BsTrash } from 'react-icons/bs';

import { Button } from '../../components';
import { CreateTask } from './CreateTask';

import styles from './board.module.css';

interface IBoardProps {
  board: INestedBoard;
  boards: INestedBoard[];
  setBoards: (arg: INestedBoard[]) => void;
}

export const Board: React.FC<IBoardProps> = ({ board, boards, setBoards }) => {
  const [isVisibleModal, setIsVisibleModal] = React.useState(false);
  const {
    currentBoard,
    currentTask,
    updateCurrentBoard,
    updateCurrentTask,
    refetch,
  } = useBoardContext();
  const { mutate, isLoading } = useMutation(moveBoardTask, {
    onSuccess: (data) => {
      console.log(data);
      const message = 'success';
      alert(message);
    },
    onError: () => {
      alert('there was an error');
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries('create');
    // }
  });

  const dragOverHandler = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };

  const dropHandler = (
    e: React.DragEvent<HTMLLIElement>,
    board: INestedBoard,
  ) => {
    e.stopPropagation();
    board.tasks.push(currentTask as ITask);

    const currentIndex = currentBoard?.tasks.indexOf(currentTask as ITask);
    currentBoard?.tasks.splice(currentIndex as number, 1);

    console.log('@moved', currentTask, 'to', board);

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

  const toggleModal = () => setIsVisibleModal((prev) => !prev);

  const handleRemoveBoard = (id: IBoard['id']) => {
    if (window.confirm('Are you sure?')) {
      removeBoard(id).then(() => refetch());
    }
  };

  return (
    <>
      <CreateTask
        isVisible={isVisibleModal}
        close={toggleModal}
        boardId={board.id}
      />
      <li
        className={styles.board}
        onDragOver={(e) => dragOverHandler(e)}
        onDrop={(e) => dropHandler(e, board)}>
        <div className={styles.board__title}>
          <h1>{board.title}</h1>
          <div className="flex items-center">
            <Button
              type="button"
              icon={<BsTrash />}
              onClick={() => handleRemoveBoard(board.id)}
            />
            <Button icon={<IoMdAdd />} onClick={toggleModal} />
          </div>
        </div>
        <div className={styles.board__items}>
          {board.tasks.length > 0 ? (
            <>
              {board.tasks.map((task) => (
                <BoardItem
                  key={task.id}
                  task={task}
                  board={board}
                  boards={boards}
                  setBoards={setBoards}
                />
              ))}
            </>
          ) : null}
        </div>
      </li>
    </>
  );
};

import { Board } from './Board';

import { CreateBoard } from './CreateBoard';
import { useBoardContext } from '../../hooks/useBoardContext';

import styles from './board.module.css';
import { Loader } from '../../components';

export const Container = () => {
  const { boards, isLoading, setBoards } = useBoardContext();

  if (isLoading) {
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.board__container}>
      <div className="flex justify-end my-2">
        <CreateBoard />
      </div>
      <ul className={styles.board__list}>
        {boards && boards?.length > 0 ? (
          <>
            {boards.map((board, i, b) => (
              <Board
                board={board}
                boards={boards}
                setBoards={setBoards}
                key={board.id}
              />
            ))}
          </>
        ) : null}
      </ul>
    </div>
  );
};

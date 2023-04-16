export interface IBoard {
  id: number;
  title: string;
  tasks: [];
}

export interface INestedBoard {
  id: number;
  title: string;
  tasks: ITask[];
}

export interface ITask {
  boardId: number;
  id: number;
  title: string;
  description: string;
  level: 1 | 2 | 3;
  createdAt: string;
  images: string;
}

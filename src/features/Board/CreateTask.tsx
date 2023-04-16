import React from 'react';

import { useMutation } from '@tanstack/react-query';
import { createTask } from '../../lib/axios/requests';
import { Controller, useForm } from 'react-hook-form';
import { ITask } from '../../models';

import Modal from '../../components/Modal/Modal';
import { Input, Select, FileInput, Textarea } from '../../components';

import { useBoardContext } from '../../hooks/useBoardContext';
import { getRandomNum } from '../../utils/getRandomNum';
import { getFormattedDate } from '../../utils/getFormattedDate';

interface ICreateTask {
  isVisible: boolean;
  close: () => void;
  boardId: number;
}

const options = [
  {
    title: 'Low',
    value: 1,
  },
  {
    title: 'Medium',
    value: 2,
  },
  {
    title: 'High',
    value: 3,
  },
];

export const CreateTask: React.FC<ICreateTask> = ({
  close,
  isVisible,
  boardId,
}) => {
  const { refetch } = useBoardContext();
  const { mutate, isLoading } = useMutation(createTask, {
    onSuccess: (data) => {
      console.log(data);
      const message = 'success';
      alert(message);
    },
    onError: () => {
      alert('there was an error');
    },
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ITask>({
    defaultValues: {
      level: 1,
    },
  });

  const onSubmit = async (data: ITask) => {
    if (isValid) {
      const file =
        typeof data.images === 'string' ? data.images : data.images[0];
      const base64File =
        typeof file === 'object'
          ? await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => resolve(reader.result);
              reader.onerror = (error) => reject(error);
            })
          : '';
      const res = {
        ...data,
        images: base64File,
        boardId,
        id: getRandomNum(100, 10000),
        createdAt: getFormattedDate(),
      };
      mutate(res as ITask);
      refetch().then(() => close());
    }
  };

  return (
    <Modal
      isShowing={isVisible}
      handleSubmit={handleSubmit(onSubmit)}
      disabled={!isValid}
      hide={close}
      title="TASK VIEW">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
        <Controller
          name="title"
          control={control}
          rules={{ required: true, minLength: 6 }}
          render={({ field }) => (
            <Input
              {...field}
              error={Boolean(errors.title)}
              helperText={
                errors.title?.type === 'required'
                  ? 'Password is required'
                  : 'Password must be at least 6 characters long'
              }
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          rules={{ required: true, minLength: 6 }}
          render={({ field }) => (
            <Textarea
              {...field}
              error={Boolean(errors.description)}
              helperText={
                errors.description?.type === 'required'
                  ? 'Password is required'
                  : 'Password must be at least 6 characters long'
              }
            />
          )}
        />
        <Controller
          name="level"
          control={control}
          rules={{
            required: true,
            onChange: (e: React.ChangeEvent<HTMLSelectElement>) =>
              +e.target.value,
          }}
          render={({ field: { onChange, value, ...restProps } }) => (
            <Select
              {...restProps}
              value={value}
              onChange={(e) => onChange(+e.target.value)}
              options={options}
            />
          )}
        />

        <FileInput
          {...register('images', {
            required: false,
          })}
        />
      </form>
    </Modal>
  );
};

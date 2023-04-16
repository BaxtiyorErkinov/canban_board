import React from 'react';

import { useMutation } from '@tanstack/react-query';
import { removeTask, updateTask } from '../../lib/axios/requests';
import { Controller, useForm } from 'react-hook-form';
import { ITask } from '../../models';

import Modal from '../../components/Modal/Modal';
import { Button, Input, Textarea, Select, FileInput } from '../../components';

import { BsTrash } from 'react-icons/bs';
import { useBoardContext } from '../../hooks/useBoardContext';

interface IViewTask {
  isVisible: boolean;
  close: () => void;
  task: ITask;
  setTask: (arg: ITask) => void;
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

export const ViewTask: React.FC<IViewTask> = ({
  close,
  isVisible,
  task,
  setTask,
}) => {
  const { refetch } = useBoardContext();
  const { mutate, isLoading } = useMutation(updateTask, {
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
    formState: { errors, isValid, isDirty },
  } = useForm<ITask>({ defaultValues: task });

  const valid = isValid === true && isDirty === true;

  const onSubmit = async (data: ITask) => {
    if (valid) {
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
          : task.images;
      const res = { ...data, images: base64File };
      mutate({ id: task.id, d: res as ITask });
      setTask(res as ITask);
      close();
    }
  };

  const handleRemovePost = () => {
    if (window.confirm('Are you sure?')) {
      removeTask(task.id).then(() => {
        refetch().then(() => {
          close();
        });
      });
    }
  };

  return (
    <Modal
      isShowing={isVisible}
      handleSubmit={handleSubmit(onSubmit)}
      disabled={!valid}
      hide={close}
      title="TASK VIEW"
      submitBtnText="UPDATE">
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
        {task.images.length ? (
          <div className="">
            <img src={task.images} alt="task" className="h-[100px]" />
          </div>
        ) : null}

        <FileInput
          {...register('images', {
            required: false,
          })}
        />

        <Button type="button" icon={<BsTrash />} onClick={handleRemovePost}>
          REMOVE
        </Button>
      </form>
    </Modal>
  );
};

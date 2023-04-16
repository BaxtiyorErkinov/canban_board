import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { createBoard } from '../../lib/axios/requests';
import { useBoardContext } from '../../hooks/useBoardContext';

import { useForm, Controller } from 'react-hook-form';
import { getRandomNum } from '../../utils/getRandomNum';

import { IoMdAdd } from 'react-icons/io';
import { Button, Input } from '../../components';
import Modal from '../../components/Modal/Modal';

type FormValues = {
  title: string;
};

export const CreateBoard = () => {
  const { refetch } = useBoardContext();
  const { mutate, isLoading } = useMutation(createBoard, {
    onSuccess: (data) => {
      console.log(data);
      const message = 'success';
      refetch();
      alert(message);
    },
    onError: () => {
      alert('there was an error');
    },
  });

  const [isModalShowing, setModalShowing] = useState(false);

  const toggleModal = () => setModalShowing(!isModalShowing);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormValues>();
  const onSubmit = (data: FormValues) => {
    if (isValid) {
      mutate({ ...data, id: getRandomNum(20, 1000000), tasks: [] });
      setValue('title', '');
      toggleModal();
    }
  };
  return (
    <div>
      <Button icon={<IoMdAdd />} onClick={toggleModal}>
        CREATE BOARD
      </Button>
      <Modal
        isShowing={isModalShowing}
        hide={toggleModal}
        title="CREATE BOARD"
        disabled={!isValid}
        handleSubmit={handleSubmit(onSubmit)}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
        </form>
      </Modal>
    </div>
  );
};

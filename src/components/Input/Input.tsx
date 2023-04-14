import React from 'react';

type IInputProps = React.ComponentPropsWithRef<'input'>;

export const Input: React.FC<IInputProps> = (props) => {
  return <input {...props} />;
};

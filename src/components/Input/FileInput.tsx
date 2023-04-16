import React from 'react';

type FileInputProps = React.ComponentPropsWithRef<'input'>;
type Ref = HTMLInputElement;

export const FileInput = React.forwardRef<Ref, FileInputProps>((props, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className="block w-full text-sm text-white border border-dark-300 rounded-lg cursor-pointer bg-dark-400 "
      type="file"
      accept="image/png, image/gif, image/jpeg"
    />
  );
});

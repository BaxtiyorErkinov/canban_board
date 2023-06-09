import React from 'react';

type IInputProps = React.ComponentPropsWithRef<'input'> & {
  error: boolean;
  helperText: string;
};

export const Input: React.FC<IInputProps> = React.forwardRef(
  ({ error, helperText, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-y-1">
        <input
          ref={ref}
          {...props}
          className={`outline-none p-2 border border-dark-400 rounded-md bg-dark-300 ${
            error && 'ring-1 ring-red-600'
          }`}
        />
        {error && <span className="text-sm text-red-600">{helperText}</span>}
      </div>
    );
  },
);
